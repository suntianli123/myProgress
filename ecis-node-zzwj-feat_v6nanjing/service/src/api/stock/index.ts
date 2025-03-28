import { Context } from 'koa'
import * as fs from 'fs'
import * as path from 'path'
import {
  arrToTreeWPS,
  deptMapping,
  stringifyLoop,
  userMap
} from './../../util/index'
import config from '../../config'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { arrToTree } from '../../util/index'
import { logger } from '../../server'
import { fileWriteStream } from '../excel'
import { OpenGetIdConfuseParams } from '../../../ecissdk/model/data'
import { getAllDeptWPS } from './../common/index'
import { deptsList, deptsThirdBind } from '../../model/openApi/company'
import { getCompanyToken } from '../authToken/func'
import { currentTime } from '../../util/momentTime'
import { getAllDeptFromDB } from '../userinit'
import { getCompanyRootDepts } from '../dept/dept'

/**
 * @path
 * @param {Context} ctx
 * @returns {Promise<void>}
 */
export async function deptStock(ctx: Context): Promise<any> {
  let res: any
  try {
    /* 当前接口输入数据 */
    const data: any = ctx.request.body
    /* 三方接口拉取数据 */
    // const data: any = await request.get('/api/org/v1/tree')
    if (data.code !== 0 || !Array.isArray(data.data) || !data.data.length) {
      throw resErrJson({ msg: '获取三方数据失败。' })
    }
    const dataFlat: any[] = []
    /* 树形结构数据需展开成一维数组 */
    arrayFlat(data.data, 'subOrgList', dataFlat)
    /* 部门信息 */
    logger.info('处理存量部门')
    /* 映射字段 */
    let deptList = await deptMapping(dataFlat, {
      departmentId: 'orgCode',
      parentId: 'parentOrgCode',
      department: 'simpleName'
    })
    /* 基于一维数组转tree方法拼接路径 */
    const depts = await arrToTreeWPS(deptList)
    deptList = []
    /* 再将tree展开成一维数组 */
    flatArrWPS(depts, deptList)
    await syncDeptMiddle(deptList)
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
    // const dataPath = await fileWriteStream(ctx)
    // const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    // fs.unlinkSync(dataPath)
    logger.info('处理存量用户')
    // const data = JSON.parse(fs.readFileSync(path.join(__dirname, './stockData.json'), 'utf8'))
    /* 用户信息 */
    const userDataOri = ctx.request.body
    if (
      !userDataOri ||
      !Array.isArray(userDataOri.users) ||
      userDataOri.users.length === 0
    ) {
      throw new Error('用户数据输入有误')
    }
    userDataOri.users = userDataOri.users.map((user: any) => ({
      ...user,
      dept: user.depts
    }))
    const userList = await userMap(userDataOri.users, {
      id: 'comp_uid',
      name: 'name',
      loginName: 'account',
      password: 'password',
      unionId: 'third_union_id',
      dept: 'depts'
    })
    await userUnionAndMiddle(
      userList.filter(
        user => user.loginName !== 'wpsadmin' && user.loginName !== 'sysadmin'
      )
    )
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

/**
 * 同步部门信息到中间表
 * @param deptList 三方部门数据
 */
const syncDeptMiddle = async (deptList: any[]) => {
  logger.info(`三方部门数据: ${deptList.length}条`)
  /* 获取所有wps部门 */
  const allDeptWPSOri = await getAllDeptWPS([])
  logger.info(`wps部门数据: ${allDeptWPSOri.length}条`)
  const allDeptWPS = await deptMapping(allDeptWPSOri, {
    departmentId: 'dept_id',
    department: 'name',
    parentId: 'dept_pid'
  })
  /* 整理成tree */
  let deptWPSTree = await arrToTree(allDeptWPS)
  let deptWPS: any = []
  // 按层级顺序取出
  flatArrWPS(deptWPSTree, deptWPS)
  // 拼接部门路径
  deptWPSTree = await arrToTreeWPS(deptWPS)
  deptWPS = []
  // 从tree数据中取出拼接好部门路径的数据组成数组
  flatArrWPS(deptWPSTree, deptWPS)
  // 去掉路径中的wps根部门
  deptWPS.forEach((dept: any) => {
    if (dept.deptPath.indexOf('/') !== -1) {
      dept.deptPath = dept.deptPath.slice(
        dept.deptPath.indexOf('/') + 1,
        dept.deptPath.length
      )
    } else {
      // wps根部门
      dept.deptPath = ''
    }
  })

  const time = currentTime()
  // 插入中间表失败的数据
  const syncFaildList = []
  // 插入中间表
  for (const dept of deptWPS) {
    // 跳过wps根部门
    if (!dept.deptPath) continue
    const deptTarget = deptList.find(
      origin => origin.deptPath === dept.deptPath
    )
    if (deptTarget) {
      const {
        department: ori_dept_name,
        departmentId: ori_dept_id,
        parentId: ori_dept_pid
      } = deptTarget
      let { departmentId: dept_id, parentId: dept_id_pid, ctime } = dept
      ctime = currentTime(ctime)
      /* 存中间表 */
      /* 存入中间表的是接口返回的数据 */
      const insertData = await sdkInstance.middleware.mysql.insert(
        config.dbName,
        /* 根据项目具体需求同步order排序字段 */
        'INSERT INTO middle_dept (ori_dept_id, ori_dept_name, ori_dept_pid, dept_id, dept_id_pid, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          ori_dept_id,
          ori_dept_name,
          ori_dept_pid,
          dept_id,
          dept_id_pid,
          ctime,
          time,
          'system',
          'system',
          0
        ]
      )
      logger.info({
        msg: `创建部门-中间表:${dept.departmentId}`
      })
      /* 返回结果判断 */
      if (insertData.result !== 'ok') throw Error('插入部门中间表失败。')
    } else {
      syncFaildList.push(dept)
    }
  }
  if (syncFaildList.length > 0) {
    logger.error(`同步中间表失败的数据: ${JSON.stringify(syncFaildList)}`)
    throw Error(`同步中间表失败${syncFaildList.length}条`)
  }
}

/**
 * 关联用户三方id并同步中间表
 * 关于 sdkInstance.service.wpsopen.getIdConfuse
 * 1. 更新ecissdk和src/api/grpc/index.ts
 * 2. 在服务器上运行以下命令
 *
 * kubectl describe deployments.apps encs-pri-account-sync-third | grep OPEN_COMMON_PARAM
 *
 * kubectl set env deployment/encs-pri-ecis OPEN_COMMON_PARAM='comp_id=AK20221102SCZOQG:scope=corp_contacts_mgr:ak=AK20221102SCZOQG:sk=f1550f44ef571f3b94341be01e0aae18'
 *
 * comp_id,ak,sk 替换对应应用的appID, appKey
 * 加密用户的comp_uid获得company_uid
 * 加密部门id得到部门的wpsid
 * @param userList
 */
const userUnionAndMiddle = async (userList: any[]) => {
  const time = currentTime()
  const companyToken = await getCompanyToken()
  const sqlDeptList = await getAllDeptFromDB()
  for (const user of userList) {
    let companyUid: string
    const params: OpenGetIdConfuseParams = {
      queryStr: `raw_text=${user.id}`
    }
    // 加密comp_uid获得company_uid
    const result = await sdkInstance.service.wpsopen.getIdConfuse(params)
    if (
      result &&
      result.result === 'ok' &&
      result.data &&
      result.data.confuse_result
    ) {
      companyUid = result.data.confuse_result
    } else {
      logger.error(`加密用户ID失败! ${user.id} errMsg: ${result.msg}`)
      continue
    }
    if (user.unionId) {
      logger.info(
        `用户已同步: company_uid: ${companyUid} unionId: ${user.unionId}`
      )
    } else {
      // 关联三方id
      const thirdBindResult = await deptsThirdBind(companyToken, companyUid, {
        third_union_id: user.loginName
      })
      if (thirdBindResult.result !== 0) {
        logger.info(
          `同步企业成员union_id失败! company_uid: ${companyUid} unionId: ${
            user.unionId
          } result: ${stringifyLoop(thirdBindResult)}`
        )
        continue
      }
    }
    // 同步中间表
    const insertMiddleUser = await sdkInstance.middleware.mysql.insert(
      config.dbName,
      'INSERT INTO middle_users (user_id, nick_name, company_uid, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [user.loginName, user.name, companyUid, time, time, 'admin', 'admin', 0]
    )
    logger.info({ msg: `同步存量用户-中间表:${user.loginName} ${companyUid}` })
    /* 返回结果判断 */
    if (insertMiddleUser.result !== 'ok') {
      throw resErrJson({ msg: '新增存量用户中间表失败。' })
    }
    // 同步部门用户关联表
    for (const dept of user.dept) {
      const params: OpenGetIdConfuseParams = {
        queryStr: `raw_text=${dept.id}`
      }
      // 加密depts.id获得dept_id
      const result = await sdkInstance.service.wpsopen.getIdConfuse(params)
      if (
        result &&
        result.result === 'ok' &&
        result.data &&
        result.data.confuse_result
      ) {
        const deptId = result.data.confuse_result
        const sqlDept = sqlDeptList.find(
          (itemSql: any) => itemSql.dept_id === deptId
        )
        if (!sqlDept) {
          logger.error(`部门数据不存在${dept.abs_path}`)
        } else {
          /* 新增用户、部门关联表 */
          const insertMiddleUserDept =
            await sdkInstance.middleware.mysql.insert(
              config.dbName,
              'INSERT INTO middle_user_dept (user_id, company_uid, ori_dept_id, dept_id, user_order, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [
                user.loginName,
                companyUid,
                sqlDept.ori_dept_id,
                sqlDept.dept_id,
                0,
                time,
                time,
                'admin',
                'admin',
                0
              ]
            )
          logger.info({
            msg: `新增用户、部门关联表－中间表:${user.company_uid}`
          })
          /* 返回结果判断 */
          if (insertMiddleUserDept.result !== 'ok') {
            throw resErrJson({ msg: '新增用户关联表失败。' })
          }
        }
      } else {
        // 加密失败
        throw Error(`加密部门ID失败! ${dept.id} errMsg: ${result.msg}`)
      }
    }
  }
}

// const flatArr = (data: any, target: any[]) => {
//   const _data = JSON.parse(JSON.stringify(data))
//   delete _data.DATA
//   target.push(_data)
//   if (Array.isArray(data.DATA) && data.DATA.length > 0) {
//     data.DATA.forEach((item: any) => flatArr(item, target))
//   }
// }

const flatArrWPS = (data: any[], target: any[]) => {
  // const _data = JSON.parse(JSON.stringify(data))
  data.forEach((_d: any) => {
    target.push(_d)
    if (Array.isArray(_d.children) && _d.children.length > 0) {
      flatArrWPS(_d.children, target)
    }
    delete _d.children
  })
}

export function arrayFlat(data: any[], childrenKey: string, flat: any[]) {
  data.forEach(el => {
    if (Array.isArray(el[childrenKey])) {
      const elCp = JSON.parse(JSON.stringify(el))
      delete elCp[childrenKey]
      flat.push(elCp)
      arrayFlat(el[childrenKey], childrenKey, flat)
    }
  })
}
