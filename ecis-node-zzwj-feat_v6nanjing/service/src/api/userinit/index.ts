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
import { getUsersFlag, getUsersTotal } from '../../model/openApi/third'

const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function userSyncTotal(ctx: Context) {
  let res
  try {
    // 沈阳需要开启
    const param = { softwareFlag: config.softwareFlag }
    // const param = {}
    logger.info({ msg: `人员入参:${JSON.stringify(param)}` })
    const getTotalData: any = await getUsersFlag(param)
    // const getTotalData: any = await axios.get('http://172.21.131.52:3000/mock/11/WPS/WPS/zzwj/userInit')

    logger.info({ msg: `获取部门所以数据:${JSON.stringify(getTotalData.data)}` })
    if (!getTotalData || !getTotalData.data || !getTotalData.data.data || !getTotalData.data.data.list) {
      throw resErrJson({ msg: '获取三方用户数据失败。' })
    }
    const userTotal: any[] = getTotalData.data.data.list
    // const userDataAll = userTotal.filter(iem => item.useFlag)
    const userList = await getUserFormat(userTotal)
    logger.info({ msg: `转换完的用户数据:${JSON.stringify(userList)}` })
    await totalUserSync(userList)
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
    if (user.orgId) {
      const dept = []
      const deptTemp = sqlDeptList.filter(
        // eslint-disable-next-line eqeqeq
        (sqlDept: any) => user.orgId == sqlDept.ori_dept_id
      )
      if (deptTemp.length !== 0) {
        dept.push({
          ...deptTemp,
          departmentId: user.orgId
        })
        user.dept = dept
      } else {
        user.dept = []
      }
    }
  }
  const userData = await userMap(userList, {
    id: 'userId',
    loginName: 'userName',
    name: 'chineseName',
    password: 'userName',
    status: 'useFlag', // 是否删除
    dept: 'orgId'
  })
  return userData
}
