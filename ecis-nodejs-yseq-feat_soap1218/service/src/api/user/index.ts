import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { handleUserSync } from './user'
import { userMap } from '../../util/index'
import { getSQLSelResult } from '../common'

const moment = require('moment')

/* 查询请求 */
interface ResquestParams {
  pageSize?: number | 2000
  currentPage?: number | 1
  updateDateFrom?: Date
  updateDateTo?: Date
  canView?: boolean
}

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function userSync(ctx: Context) {
  let res
  try {
    // const users = await getUserFormat(data)
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
