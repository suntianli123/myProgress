import request from '../../../util/request'
import config from '../../../config'
import { logger } from '../../../server'
import axios from 'axios'
import { sdkInstance } from '../../../grpc/sdk'
import { encrypt, sm3UtilEncrypto } from '../../../util/smCrypto'
const https = require('https')

const agent = new https.Agent({
  rejectUnauthorized: false
})

/**
 * @name 通过code获取AccessToken
 * @param {string} code
 * @param {string} uri
 * @returns {Promise}
 */
export const codeToAccessToken = (code: string, uri: string): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.third.domain}/cas/oauth2.0/accessToken?grant_type=authorization_code&client_id=${config.third.clientId}&client_secret=${config.third.clientSecret}&code=${code}&redirect_uri=${uri}`,
    method: 'get',
    // rejectUnauthorized: false,
    httpsAgent: agent,
    header: {
      delWpsSign: true
    }
  })
}

/**
 * @name 通过AccessToken获取用户信息
 * @param {string} code
 * @param {string} uri
 * @returns {Promise}
 */
export const accessTokenToUser = (token: string): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.third.domain}/cas/oauth2.0/profile?access_token=${token}`,
    method: 'get',
    // rejectUnauthorized: false,
    httpsAgent: agent,
    header: {
      delWpsSign: true
    }
  })
}

/**
 * @name 通过企业微信平台获取AccessToken
 */
export const getAccessTokenFromWechat = () => {
  return axios({
    url: `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${config.wechat.corpid}&corpsecret=${config.wechat.corpsecret}`,
    method: 'get'
  })
}

export const getUserIdFromPC = async (iscUserSourceId: any) => {
  const curWhiteSQLResult: any = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_white_users WHERE is_delete=0 and user_id=?',
    [iscUserSourceId]
  )
  const curSQLWhiteList =
  curWhiteSQLResult.data &&
  curWhiteSQLResult.data.rows &&
    Array.isArray(curWhiteSQLResult.data.rows)
    ? curWhiteSQLResult.data.rows
    : []
  if (!curSQLWhiteList || curSQLWhiteList.length === 0) {
    logger.info({ msg: `白名单中不存在此用户, iscUserSourceId: ${iscUserSourceId}` })
    throw Error('白名单获取成员信息失败')
  } else {
    if (curSQLWhiteList.length !== 1) {
      logger.info({
        type: '通过白名单用户id获取到三方用户数据不唯一',
        data: curSQLWhiteList
      })
      throw Error('白名单中id获取到三方用户数据不唯一')
    } else {
      return curSQLWhiteList[0]
    }
  }
}

/**
 * @name 二级ISC级联code换用户
 * @returns {Promise}
 */
export const getUsersByCode = (params: any, accessToken: any): Promise<any> => {
  const dataSign = encrypt(JSON.stringify(params), config.wechat.sm2PriKey)
  logger.info({ msg: `获取i国网用户入参sm3入参: ${JSON.stringify(params)}` })
  logger.info({ msg: `获取i国网用户入参sm3加密结果: ${dataSign}` })
  // @ts-ignore
  return request({
    url: `${config.wechat.thirdDomin}/sgid-provider-province-identity/identity/getUsersByCode`,
    method: 'post',
    httpsAgent: agent,
    headers: {
      delWpsSign: true,
      'Content-Type': 'application/json;charset=utf-8',
      'X-Clientid': config.wechat.iscAppId,
      'X-ISC-AccessToken': 'Client ' + accessToken,
      'X-Acloud-Data-Sign': dataSign
    },
    data: params
  })
}

/**
 * @name 获取ICS access_token
 * @returns {Promise}
 */
export const getISCAccessToken = (params: any): Promise<any> => {
  const smParams = params
  const sm3Utils = sm3UtilEncrypto()
  const sm3EncryStr = sm3Utils.encryptFromText(JSON.stringify(smParams))
  logger.info({ msg: `i国网获取tiken的sm3加密值: ${sm3EncryStr}` })
  // @ts-ignore
  return request({
    url: `${config.wechat.thirdDomin}/zuul/sgid-provider-console/res/iscMincroService/getAccessToken`,
    method: 'post',
    // httpsAgent: agent,
    headers: {
      delWpsSign: true,
      'Content-Type': 'application/json;charset=utf-8',
      'X-Acloud-Data-Sign': sm3EncryStr,
      Accept: '*/*',
      'X-Clientid': config.wechat.iscAppId
    },
    data: params
  })
}
