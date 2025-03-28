import request from '../../../util/request'
import config from '../../../config'
import axios from 'axios'
import { stringify } from 'qs'
import { sdkInstance } from '../../../grpc/sdk'
import { logger } from '../../../ins'
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
export const codeToAccessToken = async (code: string): Promise<any> => {
  // @ts-ignore
  const url = `${config.third.tim.domain}/idp/oauth2/getToken` // https://auth.cctv.com/idp/oauth2/getToken
  const data = {
    client_id: config.third.tim.clientId,
    client_secret: config.third.tim.clientSecret,
    code: code,
    grant_type: 'authorization_code'
  }
  const formData = stringify(data)
  console.log('qs数据', formData)
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  const result = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    httpsAgent: agent
  })
  logger.info({
    type: '获取到的三方token',
    data: result.data
  })

  logger.info({
    type: '请求头信息',
    data: result.headers
  })
  return result.data
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
    url: `${config.third.tim.domain}/idp/oauth2/getUserInfo?client_id=${config.third.tim.clientId}&access_token=${token}`,
    method: 'get',
    rejectUnauthorized: false,
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
  // @ts-ignore
  return request({
    url: `${config.third.wechat.domain}/cgi-bin/gettoken?corpid=${config.third.wechat.corpid}&corpsecret=${config.third.wechat.corpsecret}`,
    method: 'get',
    // rejectUnauthorized: false,
    httpsAgent: agent,
    header: {
      delWpsSign: true
    }
  })
}

/**
 * @name 企业微信-获取用户信息
 * @param code
 * @param access_token
 * @returns
 */

export const getUserIdFromWechat = async (
  code: string,
  // eslint-disable-next-line camelcase
  access_token: string
) => {
  // 从企业微信平台获取用户wechatid
  // @ts-ignore
  const wechatUserInfo: any = await request({
    // eslint-disable-next-line camelcase
    url: `${config.third.wechat.domain}/cgi-bin/user/getuserinfo?access_token=${access_token}&code=${code}`,
    method: 'get',
    httpsAgent: agent,
    header: {
      delWpsSign: true
    }
  })
  logger.info({
    type: '企业微信用户数据',
    data: wechatUserInfo
  })
  const { userid, errcode } = wechatUserInfo || {}
  if (errcode !== 0) {
    return { errcode }
  }
  return wechatUserInfo
}

/**
 * @name 企业微信-获取用户权限接口
 * @param code
 * @param access_token
 * @returns
 */

// eslint-disable-next-line camelcase
export const getUserAuth = async (userid: string, access_token: any) => {
  // 从企业微信平台获取用户wechatid
  // @ts-ignore
  const wechatUserInfo: any = await request({
    // eslint-disable-next-line camelcase
    url: `${config.third.wechat.domain}/cgi-bin/user/get?access_token=${access_token}&userid=${userid}`,
    method: 'get',
    httpsAgent: agent,
    header: {
      delWpsSign: true
    }
  })
  logger.info({
    type: '企业微信获取用户权限接口',
    data: wechatUserInfo
  })

  return wechatUserInfo
}
