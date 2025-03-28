import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { handleUserSync } from './user'
import { userMap } from '../../util/index'
import { logger } from '../../server'
import { getOnce32, getSQLSelResult } from '../common'
import { currentTime } from '../../util/momentTime'
import { getThirdUsers } from '../../model/openApi/third'
import { sha256 } from 'js-sha256'

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
    const paramSync = ctx?.query?.syncNum
    logger.info({ msg: '进入订阅用户增量同步' })
    /* 查询用户序列列表 */
    const SQLSyncResult = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_users WHERE is_delete !=1',
      []
    )
    // logger.info({ msg: `查询用户序列列表${JSON.stringify(SQLSyncResult)}` })
    const syncList =
    SQLSyncResult.data && SQLSyncResult.data.rows && Array.isArray(SQLSyncResult.data.rows)
      ? SQLSyncResult.data.rows
      : []
    logger.info({ msg: `查询用户序列列表长度${syncList.length}` })
    let syncNum:any = '0'

    // eslint-disable-next-line eqeqeq
    if (paramSync) {
      logger.info({ msg: '进入paramSync' })
      syncNum = paramSync
    } else if (syncList.length > 0) {
      logger.info({ msg: '进入syncList' })
      syncNum = syncList[0].maxsyncsequence // 假设第一个元素为最大值
      logger.info({ msg: `syncList第一条数据:${JSON.stringify(syncList[0])}` })
      for (const item of syncList) {
        if (item.maxsyncsequence && (item.maxsyncsequence > syncNum || item.maxsyncsequence.length > syncNum.length)) {
          logger.info({ msg: `syncList循环每条数据,item: ${JSON.stringify(item)}` })
          syncNum = item.maxsyncsequence
        }
      }
    } else {
      syncNum = '0'
    }
    logger.info({ msg: `三方用户入参--${syncNum}` })
    const listArr: any[] = []
    await getUserListFun(syncNum, listArr)
    if (!listArr || listArr.length === 0) {
      throw resErrJson({ msg: `获取增量用户数据:${JSON.stringify(listArr)}` })
    }
    logger.info({ msg: `三方增量用户响应结果--listArr: ${JSON.stringify(listArr)}` })
    listArr.forEach((item: any) => {
      item.maxSyncSequence = listArr[listArr.length - 1]?.syncSequence
    })
    const userTotal: any[] = await getDeptOrgan(listArr)
    const userList = await getUserFormat(userTotal)
    await handleUserSync(userList)
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
// 处理用户结构
export async function getDeptOrgan(userList: any) {
  let deptList: any
  for (const userIt of userList) {
    deptList = []
    for (const jobIt of userIt.userJobInfo) {
      for (const deptIt of jobIt.depJobInfo) {
        deptList.push(deptIt)
      }
    }
    userIt.jobList = deptList
  }
  return userList
}
async function getUserFormat(userList: any) {
  const sqlDeptList = await getAllDeptFromDB()
  for (const user of userList) {
    if (user.jobList.length) {
      const dept = []
      for (const group of user.jobList) {
        const deptTemp = sqlDeptList.filter(
          (sqlDept: any) => '' + group.depId === sqlDept.ori_dept_id
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
    id: 'workNo',
    loginName: 'workNo',
    name: 'displayName',
    password: 'displayName',
    status: 'status', // 是否删除
    syncSequence: 'syncSequence',
    maxSyncSequence: 'maxSyncSequence',
    order: 'showOrder',
    dept: 'dept'
  })
  return userData
}

// 获取三方数据
export async function getUserListFun(syncNum: any, orgArr: any) {
  const pwd = config.third.clientSecret
  const appKey = config.third.clientId
  const once = await getOnce32()
  const signMethod = 'SHA-256'
  const ts = moment().format('x')
  const signInfo = '' + pwd + ':' + 'appKey=' + appKey + '&once=' + once + '&signMethod=' + signMethod + '&syncSequence=' + syncNum + '&ts=' + ts + ':' + pwd
  logger.info({ msg: `增量用户signInfo参数拼接:${signInfo}` })
  const signData = sha256(signInfo)
  logger.info({ msg: `增量用户sha256:${signData}` })
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
      msg: `三方接口增量用户为空,signInfo: ${signInfo}, 增量用户sha256: ${signData}}`
    })
  } else {
    logger.warn({
      msg: `三方接口增量用户异常,signInfo: ${signInfo}, 增量用户sha256: ${signData}}`
    })
  }
}
