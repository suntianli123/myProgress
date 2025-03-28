import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { totalUserSync } from './totalUser'
import { userMap } from '../../util/index'
import { logger } from '../../server'
import { getSQLSelResult } from '../common'
import rdsQuery from '../../util/rdsmysql'
import { getAllUsers } from '../../model/openApi/fjdlAPI'

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function userSyncTotal(ctx: Context) {
  let res
  try {
    const thirdUserList: any = []
    await getAllUserInfoList(1, thirdUserList)
    logger.info(`获取到三方数据：${thirdUserList.length}`)
    if (!thirdUserList || thirdUserList.length < 1) {
      logger.warn({ msg: '获取用户信息失败！' })
      ctx.status = 200
      ctx.body = resJson()
      return ctx
    }
    // const mockUser: any = await axios.get('https://api.jczxw.cn/mock/11/wps/api/gwzj/userInit')
    // const userList = mockUser.data.data

    // eslint-disable-next-line eqeqeq
    const userDataAll = thirdUserList.filter((item: any) => item.state == '1')
    const users = await getUserFormat(userDataAll)
    logger.info(`userFormat后的用户所有数据，数量：${users.length}`)
    await totalUserSync(users)
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
  // ctx.body = aesEncryption(res)
  return ctx
}

// 获取所有用户
export async function getAllUserInfoList(pageNo: any, thirdUserList: any[]) {
  const deptsResult = await getAllUsers(pageNo, 1000)
  logger.info({ deptsResult: `三方表部门信息-json：${JSON.stringify(deptsResult)}` })
  if (deptsResult.length > 0) {
    thirdUserList.push(...deptsResult)
    // eslint-disable-next-line eqeqeq
    if (deptsResult.length == 1000) {
      pageNo++
      getAllUserInfoList(pageNo, thirdUserList)
    }
  }
}

/**
 *
 * @returns 中间表的全量部门数据
 */
export async function getAllDeptFromDB(): Promise<any[]> {
  const deptCount: any = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT count(0) FROM middle_dept WHERE is_delete=0',
    []
  )
  logger.info({ deptCount: `中间表部门数量：${JSON.stringify(deptCount)}` })
  let count: any = await getSQLSelResult(deptCount)
  count = count[0] && count[0]['count(0)']
  let SQLDeptList = []
  const size = 9000
  if (count < size) {
    const SQLResult: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_dept WHERE is_delete=0',
      []
    )
    SQLDeptList = await getSQLSelResult(SQLResult)
  } else {
    let temp: any[] = []
    for (let page = 0; page < count / size; page++) {
      const SQLResult = await sdkInstance.middleware.mysql.select(
        config.dbName,
        'SELECT * FROM middle_dept WHERE is_delete=0 LIMIT ?,?',
        [page * size, size]
      )
      temp = await getSQLSelResult(SQLResult)
      SQLDeptList.push(...temp)
      temp = []
    }
  }
  return SQLDeptList
}
/**
 *
 * @returns 中间表的全量部门数据
 */
export async function getAllUserFromDB(): Promise<any[]> {
  const deptCount: any = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT count(0) FROM middle_users WHERE is_delete !=1',
    []
  )
  logger.info({ deptCount: `中间表部门数量：${JSON.stringify(deptCount)}` })
  let count: any = await getSQLSelResult(deptCount)
  count = count[0] && count[0]['count(0)']
  let SQLDeptList = []
  const size = 9000
  if (count < size) {
    const SQLResult: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_users WHERE is_delete !=1',
      []
    )
    SQLDeptList = await getSQLSelResult(SQLResult)
  } else {
    let temp: any[] = []
    for (let page = 0; page < count / size; page++) {
      const SQLResult = await sdkInstance.middleware.mysql.select(
        config.dbName,
        'SELECT * FROM middle_users WHERE is_delete !=1 LIMIT ?,?',
        [page * size, size]
      )
      temp = await getSQLSelResult(SQLResult)
      SQLDeptList.push(...temp)
      temp = []
    }
  }
  return SQLDeptList
}

/**
 *
 * @returns 中间表的全量用户部门关系
 */
export async function getAllUserDeptFromDB(): Promise<any[]> {
  const deptCount: any = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT count(0) FROM middle_user_dept WHERE is_delete=0',
    []
  )
  logger.info({ deptCount: `中间表部门数量：${JSON.stringify(deptCount)}` })
  let count: any = await getSQLSelResult(deptCount)
  count = count[0] && count[0]['count(0)']
  let SQLDeptList = []
  if (count < 8000) {
    const SQLResult: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_user_dept WHERE is_delete=0',
      []
    )
    SQLDeptList = await getSQLSelResult(SQLResult)
  } else {
    let temp: any[] = []
    const size = 8000
    for (let page = 0; page < count / size; page++) {
      const SQLResult = await sdkInstance.middleware.mysql.select(
        config.dbName,
        'SELECT * FROM middle_user_dept WHERE is_delete=0 LIMIT ?,?',
        [page * size, size]
      )
      temp = await getSQLSelResult(SQLResult)
      SQLDeptList.push(...temp)
      temp = []
    }
  }
  return SQLDeptList
}

async function getUserFormat(userList: any) {
  const sqlDeptList = await getAllDeptFromDB()
  for (const user of userList) {
    if (user.baseOrgId) {
      const dept = []
      const deptTemp = sqlDeptList.filter(
        (sqlDept: any) => user.baseOrgId === sqlDept.ori_dept_id
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
  const userData = await userMap(userList, {
    id: 'namecode',
    loginName: 'namecode',
    name: 'name',
    password: 'password',
    status: 'state', // 是否禁用
    order: 'dispOrde',
    dept: 'dept'
  })
  return userData
}
