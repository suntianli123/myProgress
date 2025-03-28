import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { totalUserSync } from './totalUser'
import { userMap } from '../../util/index'
import { logger } from '../../server'
import { getOnce32, getSQLSelResult } from '../common'
import { getThirdUsers } from '../../model/openApi/third'
import { currentTime } from '../../util/momentTime'
import { sha256 } from 'js-sha256'

const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function userSyncTotal(ctx: Context) {
  let res
  try {
    // 获取三方用户数据
    const listArr: any[] = []
    await getUserListFun(0, listArr)
    if (!listArr || listArr.length === 0) {
      logger.warn({ msg: `获取三方用户全量数据失败。${JSON.stringify(listArr)}` })
      return
    }
    // const getDataTotal: any = await axios.get('http://172.21.131.102:3000/mock/11/WPS/WPS/zgxw/userInit')
    // const listArr = getDataTotal.data.result
    listArr.forEach((item: any) => {
      item.maxSyncSequence = listArr[listArr.length - 1]?.syncSequence
    })
    const userTotal: any[] = await getDeptOrgan(listArr)
    const userList = await getUserFormat(userTotal)
    logger.info({ msg: `获取全量用户数据JSON-userList:${JSON.stringify(userList)}` })
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

/**
 * 存入查询序列
 */
export async function setSyncseInsert(syncList: any) {
  /* 获取当前时间 */
  const time = await currentTime()
  const lastSync = syncList[syncList.length - 1]
  logger.info({
    msg: `获取全量用户序列信息:${JSON.stringify(lastSync)}`
  })
  /* 存入中间表的是接口返回的数据 */
  const insertSync = await sdkInstance.middleware.mysql.insert(
    config.dbName,
    'INSERT INTO middle_user_sync (sync_user_id, create_time) VALUES (?,?)',
    [
      lastSync.syncSequence,
      time
    ]
  )
  /* 返回结果判断 */
  if (insertSync && insertSync.result !== 'ok') throw Error('存入全量用户序列中间表失败。')
}

// 获取三方数据
export async function getUserListFun(syncNum: any, orgArr: any[]) {
  const pwd = config.third.clientSecret
  const appKey = config.third.clientId
  const once = await getOnce32()
  const signMethod = 'SHA-256'
  const ts = moment().format('x')
  const signInfo = '' + pwd + ':' + 'appKey=' + appKey + '&once=' + once + '&signMethod=' + signMethod + '&syncSequence=' + syncNum + '&ts=' + ts + ':' + pwd
  logger.info({ msg: `全量用户signInfo参数拼接:${signInfo}` })
  const signData = sha256(signInfo)
  logger.info({ msg: `全量用户sha256:${signData}` })
  // const getTotalData: any = await axios.get('http://121.4.212.226:3000/mock/11/wps/nr/xhs/deptInit')
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
      msg: `三方接口全量用户为空,signInfo: ${signInfo}, 全量用户sha256: ${signData}}`
    })
  } else {
    logger.warn({
      msg: `三方接口全量用户异常,signInfo: ${signInfo}, 全量部门sha256: ${signData}}`
    })
  }
}
