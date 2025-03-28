import { Context } from 'koa'
import { resErrJson, sdkCheck, resJson } from '../../util/msgCode'
import { getCompanyRootDepts } from '../dept/dept'
import { getCompanyToken } from '../authToken/func'
import {
  deptsList,
  delDepts,
  getDeptsCompanyUsers,
  batchDeleteCompanyUsers,
  getCompanyUsers,
  companyUsers,
  deptsThirdBind,
  batchActiveDepts,
  batchThirdBindDepts,
  delCompanyUsers,
  putDepts
} from '../../model/openApi/company'
import config from '../../config'
import { logger } from '../../server'
import { getAllDeptUser, getUserAll } from './func'
import { MysqlSelResp } from '../../../ecissdk/model/data'

// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import { deptSync } from '../dept'
import { getAllDeptFromDB, getDeptOrgan, userSync } from '../user'
import { currentTime } from '../../util/momentTime'
import { mastGetDept, mastGetUser } from '../../model/openApi/third'
import { arrToTree, deptMapping, treeToArr, userMap } from '../../util'
import { totalDeptSync } from '../deptinit/totalDept'
import { handleUserSync } from '../user/user'
const moment = require('moment')

const fs = require('fs')

export async function getCompanyRoot(ctx: Context) {
  const rootId = await getCompanyRootDepts()
  ctx.body = { rootId }
}

export async function addUser(ctx: Context) {
  const rootId = await getCompanyRootDepts()
  /** 获取企业token */
  const companyToken = await getCompanyToken()

  // eslint-disable-next-line camelcase
  const { login_name, password, name, third_union_id, role_id } = ctx.query

  // const userParams = {
  //   login_name: 'CD11111111',
  //   password: 'password',
  //   name: 'kevin.Feng',
  //   third_union_id: 'CD11111111',
  //   role_id: 3
  // }

  const userParams: any = {
    login_name,
    password,
    name,
    third_union_id,
    role_id: Number(role_id)
  }

  // 添加用户
  const result = await companyUsers(companyToken, userParams)

  // 激活账号
  // const result = await batchActiveDepts(companyToken, '1YLMDE')

  // const result = await batchThirdBindDepts(companyToken, {
  //   third_union_ids: 'CD11111111'
  // })

  console.log(result)
  ctx.body = { result }
}

/**
 * @path /api/v1/removeAll 测试-删除部门和数据
 * @param {object} Context
 * @returns {object}
 */
export async function removeAll(ctx: Context) {
  let res
  try {
    const rootDeptId = await getCompanyRootDepts()
    /** 递归删除部门-异步 */
    // ctx.query.name 传入根节点下子级部门名称，以删除其所有子部门，且不影响其他部门
    if (ctx.query.name) {
      const deptName = ctx.query.name as string
      const companyToken = await getCompanyToken()
      const { result, depts } = await deptsList(companyToken, rootDeptId, 0, 1000)
      if (result !== 0) throw new Error('获取wps部门列表失败')
      const target = depts.find(item => item.name === deptName)
      if (!target) throw new Error('目标部门不存在')
      res = resJson({ msg: `开始删除${deptName}及子级部门和成员` })
      setTimeout(async () => {
        await removeDeptUserAllByDept(target.dept_id)
        await removeMiddle()
      }, 0)
    } else {
      await removeDeptUserAll(0, rootDeptId)
      res = resJson()
    }
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

/**
 * @name 递归删除所有 部门 用户 部门用户关联
 * @param { string } deptId 部门id
 * @param { string } rootDeptId 根部门id 判断根部门阻止删除
 */
async function removeDeptUserAll(deptId: any, rootDeptId: any) {
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  /** 获取wps部门列表 */
  // @ts-ignore
  const res = await deptsList(companyToken, `${deptId}`, 0, 1000)
  const { result, depts } = res
  if (result !== 0) {
    throw Error('获取wps部门列表失败')
  }
  /* 没有子级 可以删除 */
  if (!depts.length) {
    /* 根部门不可以删除 */
    if (deptId !== rootDeptId) {
      const companyToken = await getCompanyToken()
      /* 获取当前部门下所有用户 */
      const reslut: any[] = []
      await getDeptUserAll(deptId, -1, reslut)
      const ids = reslut.map(el => el.company_uid)
      let offset = 0
      while (offset * 50 < ids.length) {
        await batchDeleteCompanyUsers(
          companyToken,
          ids.slice(offset * 50, (offset + 1) * 50).join()
        )
        logger.info(`删除部门下的用户=${deptId} = ${JSON.stringify(ids)}`)
        offset++
      }
      /** 删除部门 */
      const dept = await delDepts(companyToken, deptId)
      logger.info(`删除部门=${deptId}`)

      /* 递归从顶部开始删除 */
      await removeDeptUserAll(0, rootDeptId)
    } else {
      /** 删除中间表 */
      const delDept = await sdkInstance.middleware.mysql.delete(
        config.dbName,
        'DELETE FROM middle_dept',
        []
      )
      sdkCheck(delDept)
      const delDeptUser = await sdkInstance.middleware.mysql.delete(
        config.dbName,
        'DELETE FROM middle_user_dept',
        []
      )
      sdkCheck(delDeptUser)
      const delUser = await sdkInstance.middleware.mysql.delete(
        config.dbName,
        'DELETE FROM middle_users',
        []
      )
      sdkCheck(delUser)
      logger.info('删除中间表数据')
    }
  } else {
    // 递归查找子级
    for (const itemDep of depts) {
      await removeDeptUserAll(itemDep.dept_id, rootDeptId)
    }
  }
}

async function removeDeptUserAllByDept(deptId: string) {
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  /** 获取wps部门列表 */
  // @ts-ignore
  const res = await deptsList(companyToken, `${deptId}`, 0, 1000)
  const { result, depts } = res
  if (result !== 0) {
    throw Error('获取wps部门列表失败')
  }
  /* 没有子级 可以删除 */
  if (!depts.length) {
    /* 根部门不可以删除 */
    const companyToken = await getCompanyToken()
    /* 获取当前部门下所有用户 */
    const reslut: any[] = []
    await getDeptUserAll(deptId, -1, reslut)
    const ids = reslut.map(el => el.company_uid)
    let offset = 0
    while (offset * 50 < ids.length) {
      await batchDeleteCompanyUsers(
        companyToken,
        ids.slice(offset * 50, (offset + 1) * 50).join()
      )
      logger.info(`删除部门下的用户=${deptId} = ${JSON.stringify(ids)}`)
      offset++
    }
    /** 获取企业token */
    const dept = await delDepts(companyToken, deptId)
    logger.info(`删除部门=${deptId}`)
  } else {
    // 递归查找子级
    for (const itemDep of depts) {
      await removeDeptUserAllByDept(itemDep.dept_id)
    }
    await removeDeptUserAllByDept(deptId)
  }
}
/**
 * @name 获取部门下成员
 */
async function getDeptUserAll(deptId: any, offset: number, reslut: any[]) {
  offset = offset + 1
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  const pageDeptUser = await getDeptsCompanyUsers(
    companyToken,
    deptId,
    offset * 1000,
    1000,
    'active,notactive,disabled'
  )
  if (pageDeptUser.result === 0 && pageDeptUser.company_users.length) {
    reslut.push(...pageDeptUser.company_users)
    await getDeptUserAll(deptId, offset, reslut)
  }
}

/**
 * @name 获取全量部门
 */
export async function getAllDept(ctx: Context) {
  let res = {}
  try {
    // setTimeout(async () => {
    const rootDeptId = await getCompanyRootDepts()
    const deptList: any = []
    await getAllDeptUser(deptList, rootDeptId)
    const temp = { deptList }
    const data = JSON.stringify(temp)
    res = data
    // fs.writeFile('./dataDept.json', data, (err: any) => {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     console.log('写入成功')
    //   }
    // })
    // }, 0)
    // res = resJson()
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

/**
 * @name 获取全部成员
 */
export async function getAllUser(ctx: Context) {
  let res = {}
  try {
    res = resJson()
    setTimeout(async () => {
      const userList: any = []
      await getUserAll(userList, 0)
      const temp = { userList }
      const data = JSON.stringify(temp)
      fs.writeFile('./dataUser.json', data, (err: any) => {
        if (err) {
          console.log(err)
        } else {
          console.log('写入成功')
        }
      })
    }, 0)
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

/**
 * @sqlResult sql查询接口返回信息
 * @return {result} sql结果list
 */

export async function getSQLSelResult(
  sqlResult: MysqlSelResp
): Promise<Array<any>> {
  return sqlResult.data &&
    sqlResult.data.rows &&
    Array.isArray(sqlResult.data.rows)
    ? sqlResult.data.rows
    : []
}

// 移除中间表数据
async function removeMiddle() {
  /** 删除中间表 */
  const delDept = await sdkInstance.middleware.mysql.delete(
    config.dbName,
    'DELETE FROM middle_dept',
    []
  )
  sdkCheck(delDept)
  const delUser = await sdkInstance.middleware.mysql.delete(
    config.dbName,
    'DELETE FROM middle_users',
    []
  )
  sdkCheck(delUser)
  const delDeptUser = await sdkInstance.middleware.mysql.delete(
    config.dbName,
    'DELETE FROM middle_user_dept',
    []
  )
  sdkCheck(delDeptUser)
  logger.info('删除中间表数据')
}

// 获取wps中所有部门信息
export const getAllDeptWPS = async (depts: Array<{
  dept_pid: string // 父部门id
  dept_id: string // 部门id
  name: string // 部门名
  ctime: number // 部门创建时间，秒为单位的时间戳
  order: number | string // 部门排序字段，值越大排序优先级越高
}>, offset = -1) => {
  offset++
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  const deptResult = await deptsList(companyToken, 0, offset * 1000, 1000, true)
  if (Array.isArray(deptResult.depts) && deptResult.depts.length > 0) {
    depts.push(...deptResult.depts)
    await getAllDeptWPS(depts, offset)
  }
  return depts
}

export async function removeuUserAll(ctx: Context) {
  let res
  try {
    const paramSize = ctx.query.size || '900'
    const companyToken = await getCompanyToken()
    const userResult = await getCompanyUsers(companyToken, 0, Number(paramSize), 'notactive')
    if (userResult.result !== 0) {
      throw Error('获取wps用户列表失败')
    }
    if (Array.isArray(userResult.company_users) && userResult.company_users.length > 0) {
      userResult.company_users.forEach((item) => {
        if (item.name !== 'admin' && item.name !== 'wpsadmin') {
          delCompanyUsers(companyToken, item.company_uid)
        }
      })
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
  return ctx
}

// 移动部门
export async function moveDebtWps(ctx: Context) {
  let res
  try {
    /* 获取表里当前部门数据 */
    const deptSQLResult: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_dept WHERE is_delete=0 and ori_dept_id=?',
      [ctx.query.deptId]
    )
    const movedeptSQL =
    deptSQLResult.data && deptSQLResult.data.rows && Array.isArray(deptSQLResult.data.rows)
      ? deptSQLResult.data.rows
      : []
    /* 获取表里父部门数据 */
    const pIdSQLResult: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_dept WHERE is_delete=0 and ori_dept_id=?',
      [ctx.query.pId]
    )
    const movePidSQL =
    pIdSQLResult.data && pIdSQLResult.data.rows && Array.isArray(pIdSQLResult.data.rows)
      ? pIdSQLResult.data.rows
      : []
    const companyToken = await getCompanyToken()
    if (!movedeptSQL || movedeptSQL.length === 0 || !movePidSQL || movePidSQL.length === 0) {
      throw Error('移动部门失败')
    }
    const userResult = await putDepts(companyToken, movedeptSQL[0].dept_id, {
      dept_pid: movePidSQL[0].dept_id,
      order: 0
    })
    if (userResult.result !== 0) {
      throw Error('移动部门失败')
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
  return ctx
}

// 一人多岗位删除
export async function hasmoreDebtWps(ctx: Context) {
  let res
  try {
    const paramName = ctx.query.name
    const paramSize = ctx.query.size || 200
    const companyToken = await getCompanyToken()
    //   nz7B14nPv9d0MDE  金山
    const deptData: any = await deptsList(companyToken, 'nz7B14nPv9d0MDE', 0, 1000, false)
    // 01rX9r8aJPn5MDE   中国星网
    // 2XGVWbLarVbmMDE   星网部门
    console.log(`部门的数据--：${JSON.stringify(deptData)}`)
    // eslint-disable-next-line eqeqeq
    if (deptData.result !== 0 && deptData.depts.length == '0') {
      throw Error('获取wps用户列表失败')
    }
    const deptInfo = deptData.depts.filter((item: any) => item.name === paramName)
    console.log(deptInfo)

    const userResult: any = await getDeptsCompanyUsers(companyToken, deptInfo[0].dept_id, 0, 1000, 'active,notactive,disabled')
    console.log(userResult)
    if (userResult.result && userResult.company_users.length > 0) {
      await delateMoreUser(userResult)
    }

    const moreDept: any = await deptsList(companyToken, deptInfo[0].dept_id, 0, 1000, true)
    console.log(moreDept)
    // eslint-disable-next-line eqeqeq
    if (moreDept.result == '0' && moreDept.depts.length > 0) {
      await delateMoreDept(moreDept)
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
  return ctx
}

export async function delateMoreUser(userResult: any) {
  const companyToken = await getCompanyToken()
  if (Array.isArray(userResult.company_users) && userResult.company_users.length > 0) {
    userResult.company_users.forEach((item: any) => {
      if (item.name !== 'admin' && item.name !== 'wpsadmin') {
        delCompanyUsers(companyToken, item.company_uid)
      }
    })
  }
}

export async function delateMoreDept(moreDept: any) {
  const companyToken = await getCompanyToken()
  const ast = moreDept.depts[0].dept_id
  console.log(ast)
  const dept = await delDepts(companyToken, moreDept.depts[0].dept_id)
  console.log(dept)
}

// 更新订阅接收接口
export async function updataSubThird(ctx: Context) {
  let res
  try {
    logger.info({ message: `订阅参数,query: ${JSON.stringify(ctx?.request?.body)}` })
    const { resType } = ctx.request.body
    if (!resType) {
      throw Error('未获取更新方式，更新失败')
    }
    logger.info({ msg: `订阅方式:${JSON.stringify(resType)}` })
    // eslint-disable-next-line eqeqeq
    if (resType === 'user') {
      await userSync(ctx)
    // eslint-disable-next-line eqeqeq
    } else if (resType === 'org') {
      await deptSync(ctx)
    }
    res = {
      resultCode: 200,
      resultMessage: '操作成功'
    }
    ctx.status = 200
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = {
      resultCode: errJson.result,
      resultMessage: errJson.msg
    }
    ctx.status = 9999
  }
  ctx.body = res
  return ctx
}

export async function getOnce32() {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < 32; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
export async function getOnce13() {
  const chars = '0123456789'
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < 13; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

// 手动添加部门到中间表
export async function addDeptList(ctx: Context) {
  let res
  try {
    const deptList = [
      { dept_id: 'vRKQveW3EJA3MDE', dept_pid: 'pxoXQALJRRQdMDE', name: '星网外协', ctime: '1658909755', order: '3000', orgId: '46744203784306688', parentId: '0' },
      { dept_id: 'xx16ReDNK4ENMDE', dept_pid: 'vRKQveW3EJA3MDE', name: '系统账号', ctime: '1663063608', order: 19, orgId: '233394234045984768', parentId: '46744203784306688' },
      { dept_id: 'QNdARRl95qovMDE', dept_pid: 'vRKQveW3EJA3MDE', name: '创新院外协人员', ctime: '1663063605', order: 18, orgId: '192499022132412416', parentId: '46744203784306688' },
      { dept_id: 'AzvoXVgA9wkkMDE', dept_pid: 'vRKQveW3EJA3MDE', name: '系统院外协人员', ctime: '1663063601', order: 0, orgId: '236670637088665600', parentId: '46744203784306688' },
      { dept_id: 'MNQ3kox6z6wxMDE', dept_pid: 'vRKQveW3EJA3MDE', name: '集团总部外协', ctime: '1663063602', order: 0, orgId: '258661148436750336', parentId: '46744203784306688' },
      { dept_id: 'yx9215qd2NrNMDE', dept_pid: 'vRKQveW3EJA3MDE', name: '星网共享外协人员', ctime: '1663063602', order: 0, orgId: '240521021108482048', parentId: '46744203784306688' },
      { dept_id: 'MNQ3kq7yorE1MDE', dept_pid: 'vRKQveW3EJA3MDE', name: '上海研究院外协', ctime: '1663063604', order: 0, orgId: '258784580977582080', parentId: '46744203784306688' },
      { dept_id: 'APqoNj3nVGYQMDE', dept_pid: 'vRKQveW3EJA3MDE', name: '应用院外协', ctime: '1667188922', order: 0, orgId: '278591549334196224', parentId: '46744203784306688' }
    ]
    /* 获取当前时间 */
    const time = await currentTime()
    for (const item of deptList) {
      const insertData = await sdkInstance.middleware.mysql.insert(
        config.dbName,
        'INSERT INTO middle_dept (ori_dept_id, ori_dept_name, ori_dept_pid, dept_id, dept_id_pid, dept_order, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          item.orgId,
          item.name,
          item.parentId,
          item.dept_id,
          item.dept_pid,
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
          msg: `插入部门中间表失败,item: ${JSON.stringify(item)}`
        })
      }
    }
    // eslint-disable-next-line eqeqeq
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}

// 获取主数据部门
export async function getMastDepts(ctx: Context) {
  let res
  try {
    //
    // eslint-disable-next-line eqeqeq
    const time: any = moment().add('8', 'hours').format('YYYY-MM-DD HH:mm:ss')
    const params: any = {
      systemCode: config.mastedata.orgSysCode,
      gdCode: config.mastedata.orgGdBode,
      pageable: false,
      pageIndex: 1,
      pageSize: 30000,
      conditions: {
        modifytime: [
          'and',
          '<',
          time
        ]
      }
    }
    logger.info({
      msg: `获取主数据全量部门入参，params：${JSON.stringify(params)}`
    })
    const mastDept: any = await mastGetDept(params)
    logger.info({
      msg: `获取主数据全量部门响应结果，mastDept：${JSON.stringify(mastDept)}`
    })
    if (!mastDept || !mastDept.data || mastDept.data.length === 0) {
      throw resErrJson({ msg: '获取主数据全量部门为空。' })
    }
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}

// 获取主数据用户
export async function getMastUsers(ctx: Context) {
  let res
  try {
    // eslint-disable-next-line eqeqeq
    const time: any = moment().add('8', 'hours').format('YYYY-MM-DD HH:mm:ss')
    const params: any = {
      systemCode: config.mastedata.userSysCode,
      gdCode: config.mastedata.userGdCode,
      pageable: false,
      pageIndex: 1,
      pageSize: 30000,
      conditions: {
        modifytime: [
          'and',
          '<',
          time
        ]
      }
    }
    logger.info({
      msg: `获取主数据全量用户入参，params：${JSON.stringify(params)}`
    })
    const mastUser: any = await mastGetUser(params)
    logger.info({
      msg: `获取主数据全量用户响应结果，mastDept：${JSON.stringify(mastUser)}`
    })
    if (!mastUser || !mastUser.data || mastUser.data.length === 0) {
      throw resErrJson({ msg: '获取主数据全量用户为空。' })
    }
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}
