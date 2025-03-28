import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { handleUserSync } from './user'
import { userMap } from '../../util/index'
import { logger } from '../../server'
import { getSQLSelResult } from '../common'
import { getCurUsersByOrgIdApi } from '../../model/openApi/fjdlAPI'

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
    const deptIdList = await getMiddleDeptOrgId()
    if (!Array.isArray(deptIdList) || deptIdList.length <= 1) throw Error('获取部门id列表失败, 需先同步部门')
    /* 全部用户数据 */
    const userList: any = []
    for (const deptId of deptIdList) {
      if (deptId.ori_dept_id) {
        /* 通过部门id获取用户 */
        let deptIdUsers: any = await getCurUsersByOrgIdApi(deptId.ori_dept_id)
        logger.info(`部门${deptId.ori_dept_id}下，用户${JSON.stringify(deptIdUsers)}`)
        if (deptIdUsers) {
          deptIdUsers.map((item: any) => {
            item.orgId = deptId.ori_dept_id
            item.namecode = item.resExt.namecode
            if (!item.namecode) {
              logger.error('当前用户，sso登陆id，namecode为空！！')
            }
            return item
          })
          deptIdUsers = deptIdUsers.filter((item: any) => (item && item.namecode))
          /* 整理到所有用户list里 */
          userList.push(...deptIdUsers)
        }
      }
    }
    logger.info(`用户所有数据，用户${JSON.stringify(userList)}`)
    const users = await getUserFormat(userList)
    logger.info(`userFormat后的用户所有数据，用户${JSON.stringify(users)}`)
    await handleUserSync(users)
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

async function getMiddleDeptOrgId() {
  const SQLDeptResult: any = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT t.ori_dept_id FROM middle_dept t WHERE t.is_delete=0 ',
    []
  )

  const deptOrgIds =
    SQLDeptResult.data &&
      SQLDeptResult.data.rows &&
      Array.isArray(SQLDeptResult.data.rows)
      ? SQLDeptResult.data.rows
      : []

  logger.info(`查询出的ori_dept_id集合：${JSON.stringify(deptOrgIds)}`)
  return deptOrgIds
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
        (sqlDept: any) => user.orgId === sqlDept.ori_dept_id
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
    status: 'state', // 是否删除
    order: 'dispOrder',
    dept: 'dept'
  })
  return userData
}
