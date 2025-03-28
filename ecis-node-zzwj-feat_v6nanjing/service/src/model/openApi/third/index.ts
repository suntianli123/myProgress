import request from '../../../util/request'
import config from '../../../config'
import axios, { AxiosInstance } from 'axios'
const https = require('https')
const FormData = require('form-data')
const sha256 = require('sha256')

const agent = new https.Agent({
  rejectUnauthorized: false
})

/** 用户权限系统request对象 */
export const thirdAuthRequest: AxiosInstance = axios.create({
  baseURL: config.third.thirdAuth.domain,
  timeout: 30000,
  httpsAgent: agent
})

/** 大蚂蚁IM系统request对象 */
export const thirdDmyRequest: AxiosInstance = axios.create({
  baseURL: config.third.dmyAuth.domain,
  timeout: 30000,
  httpsAgent: agent
})

/** 同步request对象 */
export const thirdDeptRequest: AxiosInstance = axios.create({
  baseURL: config.third.domain,
  timeout: 30000,
  httpsAgent: agent
})

/**
 * @name 获取组织机构列表
 * @param {string} code
 * @param {string} uri
 * @returns {Promise}
 */
export const getDeptTotal = (data: any): Promise<any> => {
  // @ts-ignore
  return thirdDeptRequest({
    url: '/rest/public/v2.0/org/list',
    method: 'post',
    data: data,
    headers: {
      delWpsSign: true,
      Authorization: config.third.authorization
    }
  })
}
/**
 * @name 获取用户列表
 * @param {string} code
 * @param {string} uri
 * @returns {Promise}
 */
export const getUsersTotal = (data: any): Promise<any> => {
  // @ts-ignore
  return thirdDeptRequest({
    url: '/rest/public/v2.0/user/list',
    method: 'post',
    data: data,
    headers: {
      delWpsSign: true,
      Authorization: config.third.authorization
    }
  })
}

/**
 * @name 获取用户列表
 * @param {string} code
 * @param {string} uri
 * @returns {Promise}
 */
export const getUsersFlag = (data: any): Promise<any> => {
  // @ts-ignore
  return thirdDeptRequest({
    url: '/rest/public/v2.0/auth/funcFlag/user/list',
    method: 'post',
    data: data,
    headers: {
      delWpsSign: true,
      Authorization: config.third.authorization
    }
  })
}

/**
 * 用户权限系统-账号密码登录获取token
 * @param username
 * @param password
 */
export const getThirdAuthToken = (username: string, password: string): Promise<any> => {
  return thirdAuthRequest({
    url: '/rest/public/v2.0/auth/token',
    method: 'post',
    data: {
      username: username,
      password: password
    }
  })
}

/**
 * 用户权限系统-校验token获取用户信息
 * @param token
 */
export const verifyThirdAuthToken = (token: string): Promise<any> => {
  return thirdAuthRequest({
    url: '/rest/public/v2.0/auth/token',
    method: 'put',
    headers: {
      Authorization: token
    }
  })
}

/**
 * 大蚂蚁IM-校验token
 * @param ssid 企业ID
 * @param uid 用户ID
 * @param token
 */
export const verifyDmyAuthToken = (ssid: string, uid: string, token: string): Promise<any> => {
  const authen = sha256(config.third.dmyAuth.appId + config.third.dmyAuth.appSecret + ssid + uid)
  const myData = new FormData()
  myData.append('ssid', ssid)
  myData.append('uid', uid)
  myData.append('app_id', config.third.dmyAuth.appId)
  myData.append('authen', authen)
  myData.append('data_type', 'json')
  myData.append('token', token)
  return thirdDmyRequest({
    url: '/api/oauth/get_token_info.html',
    method: 'post',
    headers: myData.getHeaders(),
    data: myData
  })
}

/**
 * @name 三方客户端通过token获得用户信息
 * @param {string} code
 * @param {string} uri
 * @returns {Promise}
 */
export const tokenGetUser = (token: any): Promise<any> => {
  // @ts-ignore
  return thirdDeptRequest({
    url: '/rest/public/v2.0/auth/token/user',
    method: 'get',
    headers: {
      Authorization: token
    }
  })
}
