import { Context } from 'koa'
import config from '../../config'
import { pgSdkInstance } from '../../util/sdk/middleware/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { logger } from '../../server'
import { getOnce32 } from './../common/index'
import { batchDisableCompanyUsers, batchGetDepts, batchThirdBindDepts, delCompanyUsers, delDepts, deptsList, deptsThirdBind, getCompanyUsers, getDeptsCompanyUsers } from '../../model/openApi/company'
import { getCompanyToken } from '../authToken/func'
import { currentTime } from '../../util/momentTime'
import { getAllDeptFromDB } from '../userinit'
import { sdkInstance } from '../../grpc/sdk'
import moment = require('moment')
import { sha256 } from 'js-sha256'
import { getThirdOrgs, getThirdUsers } from '../../model/openApi/third'
import axios from 'axios'

interface IUserItem {
  company_uid: string
  name: string
  avatar: string
  third_union_id: string
  role_id: number
  status: string
  email: string
  phone: string
  ctime: number
}

interface ICompanyUser {
  company_uid: string // 企业成员id
  name: string // 成员名
  // 成员所属部门列表
  depts?: Array<{ id: string; name: string }>
  third_union_id: string // 第三方unionid (仅第三方同步到WPS的场景需要关注)
  role_id: number // 成员角色id。1：超管，2：管理员，3：普通成员
  status: string // 成员状态。active(正常),notactive(未激活), disabled(禁用)
  email: string // 成员邮箱
  phone: string // 成员手机号
  ctime: number // 成员创建时间，秒为单位的时间戳
  city: string // 办公城市
  country: string // 办公国家
  telephone: string // 固定电话
  employer: string // 就职单位
  employment_status: string // 员工状态:[active;notactive;dimission;disabled]
  employment_type: string // 员工类型：[permanent;intern]
  gender: string // 性别：[male;female;secrecy]
  leader: string // 直属主管的company_uid
  work_place: string // 办公地点
  order: number | string // 排序字段
  deptId: string
  deptName: string
}

export async function thirdDeptList(ctx: Context) {
  const listArr: any[] = []
  await getOrgListFun(0, listArr)
  if (!listArr || listArr?.length === 0) {
    throw resErrJson({ msg: '获取三方全量部门数据失败' })
  }
}

/**
 * @path
 * @param {Context} ctx
 * @returns {Promise<void>}
 */
const { parentId } = config.department
export async function deptStock(ctx: Context): Promise<any> {
  let res: any
  try {
    logger.info('处理存量部门')
    // 获取存量spl表中全部数据
    const sqlDeptData: any = await pgSdkInstance.middleware.mysql.select(
      config.rdjcDbName,
      `SELECT * FROM ${config.wpsDbName}.tb_was_department_extra`,
      []
    )
    logger.info({ msg: `存量部门数据:${JSON.stringify(sqlDeptData)}` })
    const extraList =
    sqlDeptData.data && sqlDeptData.data.rows && Array.isArray(sqlDeptData.data.rows)
      ? sqlDeptData.data.rows
      : []
    if (!extraList || extraList.length === 0) {
      throw resErrJson({ msg: '获取存量部门数据失败。' })
    }
    const listArr: any[] = []
    await getOrgListFun(0, listArr)
    if (!listArr || listArr?.length === 0) {
      throw resErrJson({ msg: '获取三方全量部门数据失败' })
    }
    const expList: any[] = []
    extraList.forEach((item: any) => {
      // 三方部门数据
      const needData = listArr.filter(
        // eslint-disable-next-line eqeqeq
        (totalItem: any) => item.third_dept_id == totalItem.orgNo
      )
      if (needData.length > 1) {
        logger.warn({ msg: `存量数据对比出现多条数据： 三方needData: ${JSON.stringify(needData)}, 存量item:${JSON.stringify(item)}` })
        // eslint-disable-next-line eqeqeq
        const hasAddList = needData.filter((hasAddItem: any) => hasAddItem.status == '2000')
        if (hasAddList.length === 1) {
          expList.push({ ...hasAddList[0], dept_id: item.dept_id })
        }
      // eslint-disable-next-line eqeqeq
      } else if (needData.length == 1) {
        expList.push({ ...needData[0], dept_id: item.dept_id })
      } else {
        logger.warn({ msg: `存量数据对比不存在此数据： extraList: ${JSON.stringify(item)}` })
      }
    })
    logger.info({ msg: `与中间表对比后获得三方的数据 expList: ${JSON.stringify(expList)}` })
    // 组织补全部门信息
    const deptslist = await editDeptFun(expList)
    logger.info({ msg: `组织部门信息结果:${deptslist}` })
    /* 获取当前时间 */
    const time = await currentTime()
    /* 存入中间表的是接口返回的数据 */
    for (const item of deptslist) {
      const insertData = await sdkInstance.middleware.mysql.insert(
        config.dbName,
        'INSERT INTO middle_dept (ori_dept_id, ori_dept_name, ori_dept_pid, dept_id, dept_id_pid, dept_order, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          item.orgId,
          item.name,
          item.third_id_pid,
          item.dept_id,
          item.dept_id_pid,
          item.order,
          time,
          time,
          'system',
          'system',
          0
        ]
      )
      logger.info({
        msg: `创建部门-中间表:${JSON.stringify(item)}`
      })
      /* 返回结果判断 */
      if (insertData.result !== 'ok') {
        logger.error({
          msg: '插入部门中间表失败'
        })
      }
    }
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  /* 加密返回数据 */
  ctx.body = res
}
// 组织补全部门信息
async function editDeptFun(sqlDeptOrg: any) {
  const companyToken = await getCompanyToken()
  const rootDeptInfo: any = await deptsList(companyToken)
  logger.info({ msg: `获取根部门： ${JSON.stringify(rootDeptInfo)}` })
  for (const item of sqlDeptOrg) {
    // 获取部门信息，补充父部门和部门名称
    const batchDepts: any = await batchGetDepts(companyToken, item.dept_id)
    // eslint-disable-next-line eqeqeq
    if (batchDepts.result != '0' || batchDepts.length === 0) {
      logger.warn({
        msg: `wps内部门不存在： ${JSON.stringify(item)}`
      })
      continue
    }
    logger.info({ msg: `wps侧部门信息,wpsDept:${JSON.stringify(batchDepts)}` })
    item.dept_id_pid = batchDepts.depts[0].dept_pid
    item.name = batchDepts.depts[0].name
    item.order = batchDepts.depts[0].order
    // 补充三方父部门id
    const deptPidInfo: any = await batchGetDepts(companyToken, batchDepts.depts[0].dept_pid)
    logger.info({ msg: `当前父部门信息,item:${JSON.stringify(item)},deptPidInfo:${JSON.stringify(deptPidInfo)}` })
    if (!deptPidInfo || !deptPidInfo.depts || deptPidInfo.depts.length === 0) {
      logger.warn({ msg: `当前父部门不存在,item:${JSON.stringify(item)}` })
    } else {
      // 获取三方父部门id,验证不是tree结构最上层，
      if (deptPidInfo.depts[0].name === rootDeptInfo.depts[0].name) {
        item.third_id_pid = config.department.parentId
      } else {
        const deptPidSql: any = await pgSdkInstance.middleware.mysql.select(
          config.rdjcDbName,
          `SELECT * FROM ${config.wpsDbName}.tb_was_department_extra WHERE dept_id=$1`,
          [batchDepts.depts[0].dept_pid]
        )
        const sqlDeptPidOrg =
        deptPidSql.data && deptPidSql.data.rows && Array.isArray(deptPidSql.data.rows)
          ? deptPidSql.data.rows
          : []
        if (!sqlDeptPidOrg || sqlDeptPidOrg.length === 0) {
          logger.warn({ msg: `父部门不存在 ${JSON.stringify(batchDepts.depts)}` })
        } else {
          // eslint-disable-next-line eqeqeq
          const hasAddList = sqlDeptOrg.filter((thirdItem: any) => thirdItem.orgNo == sqlDeptPidOrg[0].third_dept_id)
          if (hasAddList.length > 0) {
            item.third_id_pid = hasAddList[0].orgId
          }
          logger.info({ msg: `查询父部门后的item: ${JSON.stringify(item)},hasAddList: ${JSON.stringify(hasAddList)}` })
        }
      }
    }
  }
  return sqlDeptOrg
}
// 获取三方数据
export async function getOrgListFun(syncNum: any, orgArr: any) {
  const pwd = config.third.clientSecret
  const appKey = config.third.clientId
  const once = await getOnce32()
  const signMethod = 'SHA-256'
  const ts = moment().format('x')
  const signInfo = '' + pwd + ':' + 'appKey=' + appKey + '&once=' + once + '&signMethod=' + signMethod + '&syncSequence=' + syncNum + '&ts=' + ts + ':' + pwd
  logger.info({ msg: `全量部门signInfo参数拼接:${signInfo}` })
  const signData = sha256(signInfo)
  logger.info({ msg: `全量部门sha256:${signData}` })
  const getTotalData: any = await getThirdOrgs(syncNum, appKey, once, signMethod, ts, signData)
  if (getTotalData && getTotalData?.result && getTotalData?.result?.length > 0) {
    syncNum = getTotalData?.result[getTotalData?.result.length - 1]?.syncSequence
    orgArr.push(...getTotalData?.result)
    // eslint-disable-next-line eqeqeq
    if (getTotalData?.result?.length == 500) {
      await getOrgListFun(syncNum, orgArr)
    }
  } else if (getTotalData && getTotalData?.result && getTotalData?.result.length === 0) {
    logger.warn({
      msg: `三方接口全量部门为空,signInfo: ${signInfo}, 全量部门sha256: ${signData}}`
    })
  } else {
    logger.warn({
      msg: `三方接口全量部门异常,signInfo: ${signInfo}, 全量部门sha256: ${signData}}`
    })
  }
}

/**
 * 需要从企业管理后台页面上获取用户数据，适用于存量数据少(<1w)、且存量数据没有做过账号对接，可处理手动添加的账号
 * 获取用户数据步骤：
 * 1. wpsadmin登录；
 * 2. 在浏览器中调用接口http://172.21.131.94/plussvr/svr/v1/adm/companies/645082272/depts/651470581400985600/users
 * 3. 调整参数offset和limit，将所得结果输入当前接口
 * @path
 * @param {object} Context
 * @returns {object}
 */
export async function userStock(ctx: Context) {
  let res: any
  try {
    logger.info('处理存量用户')
    const companyToken = await getCompanyToken()
    const offset = 0
    const userOrg: any = []
    await getAllUsersFun(companyToken, offset, userOrg)
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  /* 加密返回数据 */
  ctx.body = res
}

async function getAllUsersFun(companyToken: any, offset: any, userOrg: any[]) {
  const userOffset = offset === 0 ? 0 : offset * 1000
  // 获取企业下全部成员
  const companyData: any = await getCompanyUsers(companyToken, userOffset, 1000, 'active,notactive,disabled')
  userOrg.push(...companyData.company_users)
  if (companyData.company_users.length === 1000) {
    offset++
    getAllUsersFun(companyToken, offset, userOrg)
    return
  }
  const userTotal = userOrg.filter(item => item.name !== 'admin' && item.name !== 'sysadmin' && item.name !== 'wpstest')
  // 进行部门拼接
  const userList = await getUserFormat(userTotal)
  logger.info({
    msg: `增量用户补全部门数据--:${JSON.stringify(userTotal)}`
  })
  const time = currentTime()
  // 同步用户表
  for (const item of userList) {
    if (!item.third_union_id) {
      logger.warn({ msg: `用户不存在third_union_id,item: ${JSON.stringify(item)}` })
      continue
    }
    const userStatus = item.status === 'active' || item.status === 'notactive' ? 0 : 2
    const insertMiddleUser = await sdkInstance.middleware.mysql.insert(
      config.dbName,
      'INSERT INTO middle_users (user_id, nick_name, company_uid, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [item.third_union_id, item.name, item.company_uid, time, time, 'admin', 'admin', userStatus]
    )
    logger.info({ msg: `同步存量用户-中间表:${item.name}` })
    /* 返回结果判断 */
    if (insertMiddleUser.result !== 'ok') {
      logger.warn({ msg: `新增存量用户中间表失败：${JSON.stringify(item)}` })
      continue
    }
    if (!item.dept || item.dept.length === 0) {
      logger.warn({ msg: `用户关联的部门不存在${JSON.stringify(item)}` })
      continue
    }
    for (const deptItem of item.dept) {
      const insertMiddleUserDept =
      await sdkInstance.middleware.mysql.insert(
        config.dbName,
        'INSERT INTO middle_user_dept (user_id, company_uid, ori_dept_id, dept_id, user_order, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          item.third_union_id,
          item.company_uid,
          deptItem.ori_dept_id,
          deptItem.dept_id,
          item.order,
          time,
          time,
          'admin',
          'admin',
          userStatus
        ]
      )
      logger.info({
        msg: `新增用户、部门关联表－中间表:${item.third_union_id}`
      })
      /* 返回结果判断 */
      if (insertMiddleUserDept.result !== 'ok') {
        logger.warn({ msg: `新增用户关联表失败。${JSON.stringify(deptItem)}` })
      }
    }
  }
}
// 进行部门拼接
async function getUserFormat(userList: any) {
  // 中间表的全量部门数据
  const sqlDeptList = await getAllDeptFromDB()
  for (const user of userList) {
    if (user.depts.length) {
      const dept = []
      for (const group of user.depts) {
        const deptTemp = sqlDeptList.filter(
          (sqlDept: any) => group.id === sqlDept.dept_id
        )
        if (deptTemp.length !== 0) {
          for (const deptItem of deptTemp) {
            dept.push({
              ...deptItem,
              departmentId: deptItem.ori_dept_id
            })
          }
          user.dept = dept
        }
      }
    }
  }
  return userList
}

export async function wpsDeptInfo(ctx: Context) {
  let res
  try {
    const { deptId } = ctx.query
    if (!deptId) {
      logger.warn(`部门id为空,deptId: ${deptId}`)
      throw resErrJson({ message: '部门id为空' })
    }
    const dept:any = deptId
    const companyToken = await getCompanyToken()
    const batchDepts: any = await batchGetDepts(companyToken, dept)
    logger.info(`获取部门信息,deptId: ${JSON.stringify(deptId)},batchDepts: ${JSON.stringify(batchDepts)}`)
    res = batchDepts
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}
export async function removeWpsDept(ctx: Context) {
  let res
  try {
    const { deptId } = ctx.query
    const dept:any = deptId
    const companyToken = await getCompanyToken()
    const delDeptsInfo: any = await delDepts(companyToken, dept)
    logger.info(`删除部门,dept: ${JSON.stringify(dept)},delDeptsInfo: ${JSON.stringify(delDeptsInfo)}`)
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}

// 获取没有三方id的用户
export async function notThirdUnionId(ctx: Context) {
  let res: any
  try {
    logger.info('处理存量用户')
    const companyToken = await getCompanyToken()
    const offset = 0
    const userOrg: any = []
    // 获取wps侧全部用户数据
    await getNotUsersInfo(companyToken, offset, userOrg)
    const userTotal = userOrg.filter((item: any) => item.name !== 'admin' && item.name !== 'sysadmin' && item.name !== 'wpstest')
    if (userTotal.length === 0) {
      throw resErrJson({ message: 'wps侧用户数据为空' })
    }
    const sqlUserList = []
    for (const item of userTotal) {
      if (!item.third_union_id) {
        sqlUserList.push(item)
      }
    }
    if (!sqlUserList || sqlUserList.length === 0) {
      throw resErrJson({ msg: `wps缺少third_union_id的用户为空,sqlUserList: ${JSON.stringify(sqlUserList)}` })
    }
    const sqlOriginal = JSON.parse(JSON.stringify(sqlUserList))
    // 三方数据
    const listArr: any[] = []
    await getUserListFun(0, listArr)
    if (!listArr || listArr.length === 0) {
      throw resErrJson({ msg: `获取增量用户数据为空:${JSON.stringify(listArr)}` })
    }
    // 拼接third_union_id的用户列表
    const userLists: any = []
    // 三方数据中对应sql中没有third_union_id的数据
    const thirdDataList: any = []
    for (const item of sqlUserList) {
      // 根据名字找到数据
      const noItem = listArr.filter(fItem => fItem.displayName === item.name)
      if (noItem.length === 0) {
        logger.warn(`三方用户数据中没有此用户,item: ${JSON.stringify(item)}`)
        continue
      }
      // 过滤存在用户
      if (noItem.length === 1) {
        item.third_union_id = noItem[0].workNo
        userLists.push(item)
        thirdDataList.push(...noItem)
      } else {
        logger.warn(`三方用户数据中异常,item: ${JSON.stringify(item)},noItem: ${JSON.stringify(noItem)}`)
        continue
      }
    }
    // 进行部门拼接
    const userDeptList = await getUserFormat(userLists)
    const resultArr = {
      sqlResult: sqlOriginal,
      thirdResult: thirdDataList,
      disposeRes: userDeptList
    }
    res = resultArr
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  /* 加密返回数据 */
  ctx.body = res
}

async function getNotUsersInfo(companyToken: any, offset: any, userOrg: any[]) {
  const userOffset = offset === 0 ? 0 : offset * 1000
  // 获取企业下全部成员
  const companyData: any = await getCompanyUsers(companyToken, userOffset, 1000, 'active,notactive,disabled')
  userOrg.push(...companyData.company_users)
  if (companyData.company_users.length === 1000) {
    offset++
    await getNotUsersInfo(companyToken, offset, userOrg)
  }
}

// 添加没有三方id的用户
export async function addNotThirdIdUser(ctx: Context) {
  let res: any
  try {
    // 获取三方用户数据
    const notThirdData: any = []
    const time = currentTime()
    for (const uItem of notThirdData) {
      const userStatus = uItem.status === 'active' || uItem.status === 'notactive' ? 0 : 2
      const insertMiddleUser = await sdkInstance.middleware.mysql.insert(
        config.dbName,
        'INSERT INTO middle_users (user_id, nick_name, company_uid, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [uItem.third_union_id, uItem.name, uItem.company_uid, time, time, 'admin', 'admin', userStatus]
      )
      logger.info({ msg: `同步存量用户-中间表:${uItem.name}` })
      /* 返回结果判断 */
      if (insertMiddleUser.result !== 'ok') {
        logger.warn({ msg: `新增存量用户中间表失败：${JSON.stringify(uItem)}` })
        continue
      }
      if (!uItem.dept || uItem.dept.length === 0) {
        logger.warn({ msg: `用户关联的部门不存在${JSON.stringify(uItem)}` })
        continue
      }
      for (const deptItem of uItem.dept) {
        const insertMiddleUserDept = await sdkInstance.middleware.mysql.insert(
          config.dbName,
          'INSERT INTO middle_user_dept (user_id, company_uid, ori_dept_id, dept_id, user_order, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            uItem.third_union_id,
            uItem.company_uid,
            deptItem.ori_dept_id,
            deptItem.dept_id,
            uItem.order,
            time,
            time,
            'admin',
            'admin',
            userStatus
          ]
        )
        logger.info({
          msg: `新增用户、部门关联表－中间表:${uItem.third_union_id}`
        })
        /* 返回结果判断 */
        if (insertMiddleUserDept.result !== 'ok') {
          logger.warn({ msg: `新增用户、部门关联表失败,deptItem:${JSON.stringify(deptItem)},uItem:${JSON.stringify(uItem)},insertMiddleUserDept:${JSON.stringify(insertMiddleUserDept)}` })
        }
      }
    }
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  /* 加密返回数据 */
  ctx.body = res
}
// 获取三方数据
export async function getUserListFun(syncNum: any, orgArr: any[]) {
  const pwd = config.third.clientSecret
  const appKey = config.third.clientId
  const once = await getOnce32()
  const signMethod = 'SHA-256'
  const ts = moment().format('x')
  const signInfo = '' + pwd + ':' + 'appKey=' + appKey + '&once=' + once + '&signMethod=' + signMethod + '&syncSequence=' + syncNum + '&ts=' + ts + ':' + pwd
  logger.info({ msg: `全量用户signInfo参数拼接:${signInfo}` })
  const signData = sha256(signInfo)
  logger.info({ msg: `全量用户sha256:${signData}` })
  // const getTotalData: any = await axios.get('http://121.4.212.226:3000/mock/11/wps/nr/xhs/deptInit')
  const getTotalData: any = await getThirdUsers(syncNum, appKey, once, signMethod, ts, signData)
  if (getTotalData && getTotalData?.result && getTotalData?.result?.length > 0) {
    syncNum = getTotalData?.result[getTotalData?.result.length - 1]?.syncSequence
    orgArr.push(...getTotalData?.result)
    // eslint-disable-next-line eqeqeq
    if (getTotalData?.result?.length == 500) {
      await getUserListFun(syncNum, orgArr)
    }
  } else if (getTotalData && getTotalData?.result && getTotalData?.result.length === 0) {
    logger.warn({
      msg: `三方接口全量用户为空,signInfo: ${signInfo}, 全量部门sha256: ${signData}}`
    })
  } else {
    logger.warn({
      msg: `三方接口全量用户异常,signInfo: ${signInfo}, 全量部门sha256: ${signData}}`
    })
  }
}

/* 根据status = 'active' and atime = 0判断的话，只能找到禁用启用前没有登录过用户，如果用户在禁用启用操作后登录atime依然为0，故将查询到的用户去log_login_2023_05表查询5.29之后登录的日志，如果没有则代表用户未登录过，可进行禁用 */
const sqlUserNeverLogin = "select * from wps_plus_core.user where status = 'active' and atime = 0 and userid not in (select distinct operator_id from wps_plus_core.log_login_2023_05 where operation_time>1685376000 and operation_type='login_success' and operator_id in ( select userid from wps_plus_core.user where status='active' and atime=0 and third_union_id!='')) and userid not in (select distinct operator_id from wps_plus_core.log_login_2023_06 where operation_type = 'login_success' and operator_id in (select userid from wps_plus_core.user where status = 'active' and atime = 0 and third_union_id != '')) and userid not in (select distinct operator_id from wps_plus_core.log_login_2023_07 where operation_type = 'login_success' and operator_id in (select userid from wps_plus_core.user where status = 'active' and atime = 0 and third_union_id != ''));"

export const checkUserByAtime = async (ctx: Context) => {
  let res: any
  try {
    // 获取存量user表中禁用再启用处理的用户（atime = 0）
    const sqlUserDataRes: any = await pgSdkInstance.middleware.mysql.select(
      config.rdjcDbName,
      sqlUserNeverLogin,
      []
    )
    const sqlUserData: any[] =
      sqlUserDataRes.data &&
      sqlUserDataRes.data.rows &&
      Array.isArray(sqlUserDataRes.data.rows)
        ? sqlUserDataRes.data.rows
        : []
    res = {
      result: sqlUserDataRes,
      mapData: sqlUserData.map(user => ({
        comp_uid: user.comp_uid,
        user_name: user.user_name,
        atime: user.atime,
        third_union_id: user.third_union_id
      }))
    }
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
}

export const disableUserByAtime = async (ctx: Context) => {
  let res: any
  try {
    const disableUsers = ctx.query.disable as string
    const disableIdList = disableUsers.split(',')
    // 获取存量user表中禁用再启用处理的用户（atime = 0）
    const sqlUserDataRes: any = await pgSdkInstance.middleware.mysql.select(
      config.rdjcDbName,
      sqlUserNeverLogin,
      []
    )
    const token = await getCompanyToken(true)
    const sqlUserData =
      sqlUserDataRes.data &&
      sqlUserDataRes.data.rows &&
      Array.isArray(sqlUserDataRes.data.rows)
        ? sqlUserDataRes.data.rows
        : []
    const companyUserList: IUserItem[] = []
    for (const user of sqlUserData) {
      const { third_union_id: thirdUnionId } = user
      if (!thirdUnionId) {
        logger.info(`该用户无thirdUnionId: ${JSON.stringify(user)}`)
        continue
      }
      logger.info(`通过三方ID查询用户: ${thirdUnionId}`)
      const userData = await batchThirdBindDepts(token, {
        third_union_ids: thirdUnionId,
        status: 'active'
      })
      logger.info(`三方ID查询用户结果: ${JSON.stringify(userData)}`)
      if (
        userData &&
        userData.data &&
        userData.data.company_users &&
        userData.data.company_users.length
      ) {
        const companyUser = userData.data.company_users[0]
        companyUserList.push(companyUser)
      } else {
        logger.warn(
          `通过三方ID查询用户失败, reason: ${JSON.stringify(userData)}`
        )
      }
    }
    let needDisable: IUserItem[] = []
    if (disableUsers && disableIdList.length > 0) {
      needDisable = companyUserList.filter(user =>
        disableIdList.includes(user.third_union_id)
      )
    } else {
      needDisable = companyUserList
    }
    const disabledList: IUserItem[] = []
    for (const user of needDisable) {
      const { company_uid: companyUid } = user
      logger.info(`禁用用户前, userInfo: ${JSON.stringify(user)}`)
      const disableResult = await batchDisableCompanyUsers(token, companyUid)
      if (disableResult.result !== 0) {
        logger.warn(`禁用用户失败, reason: ${JSON.stringify(disableResult)}`)
        continue
      }
      disabledList.push(user)
    }
    res = {
      disabledList
    }
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
}

export const clearDisabledUser = async (ctx: Context) => {
  let res: any
  try {
    const userList: ICompanyUser[] = []
    // 获取已禁用的用户
    await getAllDisabledUser(userList, 0)
    const companyToken = await getCompanyToken(true)
    for (const user of userList) {
      const { company_uid: companyUid } = user
      const deleteResult = await delCompanyUsers(companyToken, companyUid)
      if (deleteResult.result !== 0) {
        logger.warn(`移除用户失败, reason: ${JSON.stringify(deleteResult)}`)
      }
    }
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
}

const getAllDisabledUser = async (userList: ICompanyUser[], offset: number) => {
  const companyToken = await getCompanyToken()
  const res = await getCompanyUsers(
    companyToken,
    offset * 1000,
    1000,
    'disabled'
  )
  const { result, company_users } = res
  if (result !== 0) {
    throw Error('获取wps用户列表失败')
  }
  userList.push(...company_users)
  if (company_users.length === 1000) {
    offset++
    await getAllDisabledUser(userList, offset)
  }
}
