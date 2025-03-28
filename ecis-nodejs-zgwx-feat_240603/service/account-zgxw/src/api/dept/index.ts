import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { arrToTree, deptMapping, treeToArr } from '../../util/index'
import { handleDeptSync } from './dept'
import { logger } from '../../server'
import { currentTime } from '../../util/momentTime'
import { getThirdOrgs } from '../../model/openApi/third'
import { getOnce32 } from '../common'
import { sha256 } from 'js-sha256'
const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function deptSync(ctx: Context) {
  let res
  try {
    const paramSync = ctx?.query?.syncNum
    logger.info({ msg: '进入订阅部门增量同步' })
    /* 查询部门序列列表 */
    const SQLSyncResult = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_dept WHERE is_delete !=1',
      []
    )
    // logger.info({ msg: `查询部门序列列表${JSON.stringify(SQLSyncResult)}` })
    const syncList =
    SQLSyncResult.data && SQLSyncResult.data.rows && Array.isArray(SQLSyncResult.data.rows)
      ? SQLSyncResult.data.rows
      : []
    let syncNum:any = 0
    logger.info({ msg: `查询部门序列列表长度${syncList.length}` })
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
          syncNum = item.maxsyncsequence
        }
      }
    } else {
      syncNum = '0'
    }
    logger.info({ msg: `三方增量入参--syncNum: ${syncNum}` })
    const listArr: any[] = []
    await getOrgListFun(syncNum, listArr)
    if (!listArr || listArr.length === 0) {
      throw resErrJson({ msg: `获取三方增量部门数据失败。${JSON.stringify(listArr)}` })
    }
    logger.info({ msg: `三方增量部门响应结果--listArr: ${JSON.stringify(listArr)}` })
    listArr.forEach((item: any) => {
      item.maxSyncSequence = listArr[listArr.length - 1]?.syncSequence
    })
    const proDeptData = await deptMapping(listArr, {
      departmentId: 'orgId',
      parentId: 'parentId',
      department: 'orgName',
      status: 'status',
      order: 'showOrder',
      syncSequence: 'syncSequence',
      maxSyncSequence: 'maxSyncSequence'
    })
    // eslint-disable-next-line eqeqeq
    const deptList = proDeptData.filter(item => item.departmentId != 'null')
    // 部门数据排序
    const treeList = await arrToTree(deptList)
    const arrList = await treeToArr(treeList, [])
    logger.info({
      msg: `树状结构组织长度,treeList: ${treeList.length}, 一维数组长度arrList: ${arrList.length}, arrList: ${JSON.stringify(arrList)}`
    })
    await handleDeptSync(arrList)
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    await sdkInstance.middleware.cache.set('task_dept_status', 'finied')
    const errJson = resErrJson(e)
    // 错误返回值11
    res = errJson
  }
  ctx.status = 200
  /* 加密返回数据 */
  ctx.body = res
  // ctx.body = aesEncryption(res)
  return ctx
}

/**
 * 存入查询序列
 */
export async function setSyncseInsert(syncList: any) {
  /* 获取当前时间 */
  const time = await currentTime()
  const lastSync = syncList[syncList.length - 1]
  logger.info({
    msg: `增量部门获取序列信息:${JSON.stringify(lastSync)}`
  })
  /* 存入中间表的是接口返回的数据 */
  const insertSync = await sdkInstance.middleware.mysql.insert(
    config.dbName,
    'INSERT INTO middle_dept_sync (sync_dept_id, create_time) VALUES (?,?)',
    [
      lastSync.syncSequence,
      time
    ]
  )
  /* 返回结果判断 */
  if (insertSync && insertSync.result !== 'ok') throw Error('存入增量部门序列中间表失败。')
}

// 获取三方数据
export async function getOrgListFun(syncNum: any, orgArr: any) {
  const pwd = config.third.clientSecret
  const appKey = config.third.clientId
  const once = await getOnce32()
  const signMethod = 'SHA-256'
  const ts = moment().format('x')
  const signInfo = '' + pwd + ':' + 'appKey=' + appKey + '&once=' + once + '&signMethod=' + signMethod + '&syncSequence=' + syncNum + '&ts=' + ts + ':' + pwd
  logger.info({ msg: `增量部门signInfo参数拼接:${signInfo}` })
  const signData = sha256(signInfo)
  logger.info({ msg: `增量部门sha256:${signData}` })
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
      msg: `三方接口增量部门为空,signInfo: ${signInfo}, 增量部门sha256: ${signData}}`
    })
  } else {
    logger.warn({
      msg: `三方接口增量部门异常,signInfo: ${signInfo}, 增量部门sha256: ${signData}}`
    })
  }
}
