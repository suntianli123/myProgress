import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { arrToTree, deptMapping, treeToArr } from '../../util/index'
import { totalDeptSync } from './totalDept'
import { logger } from '../../server'
import { getThirdOrgs } from '../../model/openApi/third'
import { currentTime } from '../../util/momentTime'
import { getOnce32 } from '../common'
import { sha256 } from 'js-sha256'
const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function deptSyncTotal(ctx: Context) {
  let res
  try {
    // 获取三方部门数据
    logger.info({ msg: '进行部门全量同步' })
    const listArr: any[] = []
    await getOrgListFun(0, listArr)
    if (!listArr || listArr?.length === 0) {
      throw resErrJson({ msg: '获取三方全量部门数据失败' })
    }
    // const getDataTotal: any = await axios.get('http://172.21.131.102:3000/mock/11/WPS/WPS/zgxw/deptInit')
    // const listArr = getDataTotal.data.result

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
    await totalDeptSync(arrList)
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志1 */
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
 * 存入查询序列
 */
export async function setSyncseInsert(syncList: any) {
  /* 获取当前时间 */
  const time = await currentTime()
  const lastSync = syncList[syncList.length - 1]
  logger.info({
    msg: `全量部门获取序列信息:${lastSync}`
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
  if (insertSync && insertSync.result !== 'ok') throw Error('存入全量部门序列中间表失败。')
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
