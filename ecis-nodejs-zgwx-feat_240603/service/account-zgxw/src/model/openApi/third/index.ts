import request from '../../../util/request'
import config from '../../../config'
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
 * @name 组织信息增量同步接口
 * @param {string} code
 * @param {string} uri
 * @returns {Promise}
 */
export const getThirdOrgs = (syncSequence: any, appKey: any, once: any, signMethod: any, ts: any, signData: any): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.third.domain}/id-sync/v5/pull/orgs?syncSequence=${syncSequence}`,
    method: 'get',
    httpsAgent: agent,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      appKey: appKey,
      once: once,
      signMethod: signMethod,
      ts: ts,
      signData: signData,
      delWpsSign: true
    }
  })
}

/**
 * @name 组织信息增量同步接口
 * @returns {Promise}
 */
export const getThirdUsers = (syncSequence: any, appKey: any, once: any, signMethod: any, ts: any, signData: any): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.third.domain}/id-sync/v5/pull/users?syncSequence=${syncSequence}`,
    method: 'get',
    // rejectUnauthorized: false,
    httpsAgent: agent,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      appKey: appKey,
      once: once,
      signMethod: signMethod,
      ts: ts,
      signData: signData,
      delWpsSign: true
    }
  })
}

/**
 * @name 登录接口
 * @returns {Promise}
 */
export const thirdLogin = (appId: any, service: any): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.third.domain}/authn-api/v5/cas/${appId}/login?
    service=${service}`,
    method: 'get',
    // rejectUnauthorized: false,
    httpsAgent: agent,
    headers: {
      delWpsSign: true
    }
  })
}

/**
 * @name 登录接口
 * @returns {Promise}
 */
export const ticketVerify = (param: any): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.third.domain}authn-api/v5/cas/${param?.appId}/p3/serviceValidate?service=${param?.service}&ticket=${param?.ticket}&format=${param?.format}`,
    method: 'get',
    // rejectUnauthorized: false,
    httpsAgent: agent,
    headers: {
      delWpsSign: true
    }
  })
}

/**
 * @name 使用 code 换取 token
 * @returns {Promise}
 */
export const codeGetToken = (param: any): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.third.loginDomain}/authn-api/v5/oauth/token?client_id=${config.third.loginId}&client_secret=${config.third.loginSecret}&redirect_uri=${param.redirectUri}&grant_type=authorization_code&code=${param.code}`,
    method: 'get',
    // rejectUnauthorized: false,
    httpsAgent: agent,
    headers: {
      delWpsSign: true
    }
  })
}
/**
 * @name 获取用户信息
 * @returns {Promise}
 */
export const thirdGetUser = (token: any): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.third.loginDomain}/authn-api/v5/oauth/user-info?Authorization=${token}`,
    method: 'get',
    // rejectUnauthorized: false,
    httpsAgent: agent,
    headers: {
      Authorization: token,
      delWpsSign: true
    }
  })
}
/**
 * @name 主数据获取部门
 * @returns {Promise}
 */
export const mastGetDept = (params: any): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.mastedata.maDomain}/iuapmdm/cxf/mdmrs/newcenter/newCenterService/queryListMdByConditions`,
    method: 'post',
    // rejectUnauthorized: false,
    httpsAgent: agent,
    headers: {
      'Content-Type': 'application/json',
      mdmtoken: config.mastedata.orgToken,
      tenantid: 'tenant',
      delWpsSign: true
    },
    data: params
  })
}
/**
 * @name 主数据获取用户
 * @returns {Promise}
 */
export const mastGetUser = (params: any): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.mastedata.maDomain}/iuapmdm/cxf/mdmrs/newcenter/newCenterService/queryListMdByConditions`,
    method: 'post',
    // rejectUnauthorized: false,
    httpsAgent: agent,
    headers: {
      mdmtoken: config.mastedata.userToken,
      tenantid: 'tenant',
      delWpsSign: true
    },
    data: params
  })
}
