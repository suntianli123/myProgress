import { Context } from 'koa'
import config from '../../config'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { logger } from '../../server'
import { getThirdUsers } from '../../model/openApi/third'
import { currentTime } from '../../util/momentTime'
import { getOnce32 } from '../common'
import { sha256 } from 'js-sha256'
import axios from 'axios'
const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function reviseUserSync(ctx: Context) {
  let res
  try {
    // 获取三方部门数据
    logger.info({ msg: '进行校正部门id' })
    const thirdUserList: any[] = []
    await getUserListFun(0, thirdUserList)
    if (!thirdUserList || thirdUserList?.length === 0) {
      throw resErrJson({ msg: '获取三方全量部门数据失败' })
    }

    // const getDataTotal: any = await axios.get('http://172.21.131.102:3000/mock/11/WPS/WPS/zgxw/userRevise')
    // const thirdUserList = getDataTotal.data.result
    const notReviseUser: any[] = []
    // 校正三方id
    await checkUserId(thirdUserList, notReviseUser)
    // 表中没有校正三方id的数据
    const resultArr = {
      notReviseUser: notReviseUser,
    }
    res = resultArr
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

// 校正三方id
export async function checkUserId(thirdList: any, notReviseUser: any): Promise<any> {
  /* 查询中间表所有用户 */
  const SQLResult = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_users WHERE is_delete !=1',
    []
  )
  const SQLUserList =
        SQLResult.data && SQLResult.data.rows && Array.isArray(SQLResult.data.rows)
          ? SQLResult.data.rows
          : []
  if (!SQLUserList || SQLUserList.length === 0) {
    logger.warn({ msg: '查询用户中间表失败' })
    return
  }
  for (const sqlItem of SQLUserList) {
    // 找到三方数据中的用户信息
    // eslint-disable-next-line eqeqeq
    const thirdUser = thirdList.filter((thirdItem: any) => thirdItem.workNo == sqlItem.user_id)
    if (!thirdUser.length) {
      notReviseUser.push(sqlItem)
      continue
    }
    const time = await currentTime()
    /* 更新中间表，更新中间表中用户id */
    const changeData = await sdkInstance.middleware.mysql.update(
      config.dbName,
      'UPDATE middle_users SET master_user_id=?, update_time=? WHERE is_delete=0 AND user_id=?',
      [thirdUser[0].mdm_code, time, thirdUser[0].workNo]
    )
    logger.info({ msg: `修改部门-中间表:${thirdUser[0].workNo}` })
    /* 如果错误，抛出错误 */
    if (changeData.result !== 'ok') {
      logger.warn(`替换用户id-中间表失败,thirdUser: ${JSON.stringify(thirdUser)},changeData: ${JSON.stringify(changeData)}`)
    }
  }
}
