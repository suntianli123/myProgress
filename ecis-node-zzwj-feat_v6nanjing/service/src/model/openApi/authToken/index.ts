/*
 * @Author: lz-ui@jczxw.cn
 * @Date: 2022-04-24 09:26:27
 * @LastEditors: lz-ui
 * @LastEditTime: 2022-04-26 09:43:24
 * @Description: file content
 */
import request from '../../../util/request'
import config from '../../../config'
import { API } from './typings'

/**
 * @name 企业内部应用获取company_token
 * @param app_id
 * @param scope
 * @returns {Promise}
 */
export function companyToken(): Promise<API.ResponseCompanyToken> {
  // @ts-ignore
  return request({
    url: `/open/auth/v1/company/inner/token?app_id=${config.appid}&scope=${config.scope}`,
    method: 'get'
  })
}

/**
 * @name 1. 用户授权，获取code
 * @param {string} app_id 应用唯一标识
 * @param {string} response_type 固定为：code
 * @param {string} redirect_uri 授权后重定向的回调链接地址
 * @param {string} scope 用户授权的权限(user_info,…)，多个值以逗号分割
 * @param {string} state 由用户自定义，授权成功后会通过重定向接口带回
 * @param {string} autologin 是否自动跳转,如果已经授权且autologin为true则不跳转到授权界面
 * @param {string} login_type 登录形式，可选值： 0: 账号登录 1: 手机验证码登录， 默认为0
 * @param {string} switch_account 是否要开放切换账号, disabled：禁用 不传或传其他值则为开放
 * @param {string} style 授权页面背景色，可选值： light：亮色 dark：暗色 默认为light
 * @returns {Promise}
 */
export const authUserAuthorization = (
  responseType: string,
  redirectUri: string,
  state?: string,
  autologin?: boolean,
  loginType?: number | string,
  switchAccount?: string,
  style?: string
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/auth/v1/user/authorization?app_id=${config.appID}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${config.scope}&state=${state}&autologin=${autologin}&login_type=${loginType}&switch_account=${switchAccount}&style=${style}`,
    method: 'get'
  })
}

/**
 * @name 2. 通过code换取网页授权access_token
 * @param app_id
 * @param scope
 * @returns {Promise}
 */
export function authUserToken(
  code: string | string[]
): Promise<API.ResponseAuthUserToken> {
  // @ts-ignore
  return request({
    url: `/open/auth/v1/user/token?app_id=${config.appID}&code=${code}`,
    method: 'get'
  })
}

/**
 * @name 3. 刷新access_token (如果需要)
 * @param {string} refreshToken 填写通过code获取到的refresh_token参数
 * @returns {Promise}
 */
export const authUserTokenRefresh = (
  refreshToken: string
): Promise<API.ResponseAuthUserTokenRefresh> => {
  // @ts-ignore
  return request({
    url: `/open/auth/v1/user/token?appid=${config.appID}&refresh_token=${refreshToken}`,
    method: 'put'
  })
}

/**
 * @name 4. 通过third_union_id换取授权access_token
 * @param {string} third_union_id 用户唯一标识
 * @returns {Promise}
 */
export const authUserTokenByUnionid = (
  thirdUnionId: string
): Promise<API.ResponseAuthUserTokenByUnionid> => {
  // @ts-ignore
  return request({
    url: `/open/auth/v1/user/token/by-unionid?third_union_id=${thirdUnionId}&scope=${config.scope}&appid=${config.appID}`,
    method: 'get'
  })
}

/**
 * @name 5. 获取apptoken
 * @param {string} app_id 应用Id
 * @param {string} scope 应用授权的权限列表，多个值以逗号分割
 * @returns {Promise}
 */
export const authAppToken = (): Promise<API.ResponseAuthInscopeToken> => {
  // @ts-ignore
  return request({
    url: `/open/auth/v1/app/inscope/token?scope=file_edit,file_preview,file_edit,file_format_control,app_files_synerg_mgr&app_id=${config.appID}`,
    method: 'get'
  })
}
