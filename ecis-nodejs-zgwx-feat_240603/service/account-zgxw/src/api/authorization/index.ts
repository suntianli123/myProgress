import { Context } from 'koa'
import config from '../../config'
import { resErrJson } from '../../util/msgCode'
import axios from 'axios'
import { sdkInstance } from '../../grpc/sdk'
import { logger } from '../../server'
import { codeGetToken, thirdGetUser } from '../../model/openApi/third'
import { getOnce13 } from '../common'

/**
 * @path     /api/v1/authorization/redirectToWps
 * @param    {object} Context
 * @returns  {object}
 */
export async function redirectToWps(ctx: Context) {
  logger.info({ message: `redirectToWps参数,query: ${JSON.stringify(ctx.query)}` })
  const { code, redirect_uri } = ctx.query
  let url
  const redirectUriSet: any = redirect_uri
  logger.info({ message: `redirectUri参数,redirectUriSet: ${redirectUriSet}` })
  // wps-跳转到-第三方登录页面
  const towpsUrl = `${config.domain}/ecis/app/${config.appid}/api/v1/authorization/redirectToWps`
  if (code) {
    // 使用 code 换取 token
    const ticketParam = {
      redirectUri: towpsUrl,
      code: code,
    }
    const verifyResult = await codeGetToken(ticketParam)
    logger.info({ message: `使用code换取token,JSON-verifyResult: ${JSON.stringify(verifyResult)}` })
    if (!verifyResult || !verifyResult?.access_token) {
      logger.warn({ message: `换取token失败,ticketParam: ${JSON.stringify(ticketParam)},verifyResult: ${JSON.stringify(verifyResult)}` })
      throw resErrJson({ message: '无效的用户信息登录' })
    }
    // 获取用户信息
    const thirdUserInfo = await thirdGetUser(verifyResult?.access_token)
    logger.info({ message: `获取用户信息,JSON-thirdUserInfo: ${JSON.stringify(thirdUserInfo)}` })
    if (!thirdUserInfo || !thirdUserInfo?.result || !thirdUserInfo?.result?.workNo) {
      logger.warn({ message: `获取用户信息失败,thirdUserInfo: ${JSON.stringify(thirdUserInfo)}` })
      throw resErrJson({ message: '获取用户信息失败' })
    }
    let cb: string = `${config.domain}/kdocs`
    cb = ctx.cookies.get('REDIRECT_URI') ? ctx.cookies.get('REDIRECT_URI') : cb
    const redirectUri: string =
      `${config.domain}/oauth-svr/oauth/v1/code?app_id=${config.appID}&is_platform_code_signin=true&cb=${encodeURIComponent(cb)}`
    const state = ctx.cookies.get('_WPS_OAUTH_STATE_') || new Date().getTime()
    ctx.cookies.set('_WPS_OAUTH_STATE_', `${state}`)

    // 通过用户workNo查询用户表中的master_user_id
    // const SQLResult = await sdkInstance.middleware.mysql.select(
    //   config.dbName,
    //   'SELECT * FROM middle_users WHERE user_id=?',
    //   [thirdUserInfo?.result?.workNo]
    // )
    // const SQLUserList =
    //   SQLResult.data &&
    //     SQLResult.data.rows &&
    //     Array.isArray(SQLResult.data.rows)
    //     ? SQLResult.data.rows
    //     : []
    // const userId = SQLUserList[0]?.master_user_id ? SQLUserList[0]?.master_user_id : SQLUserList[0]?.userId
    // url = redirectUri + '&state=' + state + '&code=' + userId


    url = redirectUri + '&state=' + state + '&code=' + thirdUserInfo?.result?.workNo
    logger.info({ message: `redirectToWps跳转前:${url}` })
  } else {
    let cb
    const splitArr = redirectUriSet ? redirectUriSet.split('cb=') : []
    if (splitArr.length && splitArr.length >= 2) {
      cb = splitArr[1].split('&is_platform')[0]
    }
    ctx.cookies.set('REDIRECT_URI', (cb ? decodeURIComponent(cb.toString()) : undefined))
    // 登录接口
    logger.warn({ message: `进行登录,loginId: ${config.third.loginId},towpsUrl: ${towpsUrl}` })
    const stateNum = await getOnce13()
    url = `${config.third.loginDomain}/authn-api/v5/oauth/authorize?redirect_uri=${towpsUrl}&client_id=${config.third.loginId}&response_type=code&state=${stateNum}`
    logger.info({ message: `进行登录跳转前url: ${url}` })
  }
  // 重定向
  ctx.status = 302
  ctx.redirect(url)
}
/**
 * @path     /api/v1/authorization/callback
 * @param   {object} Context
 * @returns {object}
 */
export async function callback(ctx: Context) {
  let res
  try {
    logger.info({ message: `callback参数:${JSON.stringify(ctx.query)}` })
    const { code, redirect_uri } = ctx.query
    const body = {
      access_token: code,
    }
    res = body
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}

/**
 * @path     /api/v1/authorization/userInfo
 * @param    {object} Context
 * @returns  {object}
 */
export async function userInfo(ctx: Context) {
  let res
  try {
    logger.info({ message: `userInfo参数:${JSON.stringify(ctx.query)}` })
    const { access_token } = ctx.query
    res = {
      access_token,
      user_name: '',
      union_id: `${access_token}`,
      avatar: '' // 非必填字段
    }
    logger.info({ message: `body返回数据:${JSON.stringify(res)}` })
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}
