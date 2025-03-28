import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { totalUserSync } from './totalUser'
import { userMap, userMapping } from '../../util/index'
import { getAccessToken, getSQLSelResult } from '../common'
import { logger } from '../../ins'
import { getTotalData } from '../deptinit'
// import { users } from './userMock'

const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function userSyncTotal(ctx?: Context) {
  let res
  try {
    // 获取三方用户数据
    const userList = await getThirdUsers()
    const keys = {
      id: 'userid',
      loginName: 'userid',
      name: 'name',
      status: 'status', // 是否需要禁用 1=已激活，2=已禁用，4=未激活
      order: 'order',
      dept: 'department'
    }
    const deptKey = {
      departmentId: 'department'
    }
    const userData = await userMapping(userList, keys, deptKey)
    logger.info({
      type: '字段转换后的用户数据量',
      data: userData?.length
    })
    await totalUserSync(userData)
    res = resJson()
    res.data = `三方用户数量： ${userList?.length}`
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  if (ctx) {
    ctx.status = 200
    /* 加密返回数据 */
    ctx.body = res
    // ctx.body = aesEncryption(res)
    return ctx
  }
}

/**
 *
 * @returns 中间表的全量部门数据
 */
export async function getAllDeptFromDB(): Promise<any[]> {
  const SQLResult = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_dept',
    []
  )
  return await getSQLSelResult(SQLResult)
}

async function getUserFormat(userList: any) {
  const sqlDeptList = await getAllDeptFromDB()
  for (const user of userList) {
    if (
      user.groups.length
    ) {
      const dept = []
      for (const group of user.groups) {
        const deptTemp = sqlDeptList.filter(
          (sqlDept: any) => group === sqlDept.ori_dept_id
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
  const userData = await userMap(userList, {
    id: 'userName',
    loginName: 'userName',
    name: 'displayName',
    password: 'password',
    disable: 'enabled', // 是否禁用
    status: 'deleted', // 是否删除
    dept: 'dept'
  })
  return userData
}

export async function getThirdUsers() {
  logger.info({
    msg: '获取三方数据接口',
  })
  const accessToken = await getAccessToken()
  logger.info({
    msg: '获取到的access_token',
    data: accessToken
  })
  const deptList = await getTotalData()
  const rootDeptList = deptList.filter((item : any) => {
    return `${item?.parentid}` === '1'
  })
  logger.info({
    type: '根部门列表',
    data: rootDeptList
  })
  let result: any[] = []
  for (const item of rootDeptList) {
    const id = item?.id
    const url = `${config.third.wechat.domain}/cgi-bin/user/list?access_token=${accessToken}&department_id=${id}&fetch_child=1`
    const usersRes = await axios.get(url)
    // const usersRes = users
    const { errcode, userlist } = usersRes?.data || {}
    logger.info({
      msg: '三方数据量',
      data: userlist?.length
    })
    if (errcode !== 0) {
      logger.warn({
        type: `获取【部门】：${item?.name}---${item?.id}下用户失败`
      })
    }
    result = [...result, ...userlist]
  }
  // const url = `${config.third.wechat.domain}/cgi-bin/user/list?access_token=${accessToken}&department_id=${config.department.departmentId}&fetch_child=1`
  // const usersRes = await axios.get(url)
  // // const usersRes = users
  // const { errcode, userlist } = usersRes?.data || {}
  // logger.info({
  //   msg: '三方数据量',
  //   data: userlist?.length
  // })
  // // const { errcode, userlist } = usersRes
  // let res: any[] = []
  // if (errcode === 0) {
  //   res = userlist
  // } else {
  //   logger.error('获取三方用户数据失败')
  // }
  return result
}
