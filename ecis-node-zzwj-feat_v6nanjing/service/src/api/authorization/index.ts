import { Context } from 'koa'
import config from '../../config'
import { resErrJson, resJson } from '../../util/msgCode'
import axios from 'axios'
import { logger } from '../../server'
import { getThirdAuthTokenFunc, verifyDmyAuthTokenFunc, verifyThirdAuthTokenFunc } from '../third/thirdFunc'
import { tokenGetUser } from '../../model/openApi/third'

/**
 * @path     /api/v1/authorization/redirectToWps
 * @returns  {object}
 * @param ctx
 */
export async function redirectToWps(ctx: Context) {
  ctx.cookies.set('wps_sid', '')
  logger.info({ message: `redirectToWps参数:${JSON.stringify(ctx.query)}` })
  // 第三方浏览器走登录页
  const thirdCode = ctx.query.ticket
  // 从user-agent判断来源（暂定）
  const userAgent = ctx.query.source
  // 三方客户端带入token
  const thirdToken = ctx.query.token
  const againTime = ctx.query.againTime
  logger.info({ message: `redirectToWps UserAgent：【${userAgent}】` })
  // 大蚂蚁
  const dmyFlag = userAgent && userAgent.includes(`${config.third.dmyAuth.userAgent}`)
  // 北信源
  const bxyFlag = userAgent && userAgent.includes(`${config.third.bxyAuth.userAgent}`)
  const redirectUriSet: any = ctx.query.redirect_uri
  // 第三方客户端
  const thirdFlag = userAgent && userAgent.includes(`${config.third.thirdAuth.userAgent}`)
  logger.info({ message: `redirectUri参数:${redirectUriSet}` })
  let url
  if (thirdCode || dmyFlag || bxyFlag || thirdFlag) {
    let code
    // 三方客户端
    if (thirdFlag) {
      logger.info(`来源【第三方客户端】, thirdCode:【${thirdFlag}】`)
      const thirdGetToken = await tokenGetUser(thirdToken)
      logger.info(`通过token获得用户信息结果, ${JSON.stringify(thirdGetToken.data)}`)
      code = thirdGetToken.data.data.userId
    } else if (dmyFlag) {
      logger.info(`来源【大蚂蚁IM】, thirdCode:【${thirdCode}】`)
      code = thirdCode
      // code = `${config.third.dmyAuth.flag}${thirdCode}`
    } else if (bxyFlag) {
      // TODO
      logger.info(`来源【北信源】, bxyAuth:${thirdCode}`)
      const thirdGetToken = await tokenGetUser(thirdCode)
      logger.info(`通过token获得用户信息结果, ${JSON.stringify(thirdGetToken.data)}`)
      code = thirdGetToken.data.data.userId
    } else if (thirdCode) {
      logger.info(`来源【三方权限系统】, thirdCode:【${thirdCode}】`)
      code = thirdCode
    }
    let cb: string = `${config.domain}/kdocs`
    cb = ctx.cookies.get('REDIRECT_URI') ? ctx.cookies.get('REDIRECT_URI') : cb
    const redirectUri: string =
      `${config.domain}/oauth-svr/oauth/v1/code?app_id=${config.appID}&is_platform_code_signin=true&cb=${encodeURIComponent(cb)}`
    const state = ctx.cookies.get('_WPS_OAUTH_STATE_') || new Date().getTime()
    ctx.cookies.set('_WPS_OAUTH_STATE_', `${state}`)
    url = redirectUri + '&state=' + state + '&code=' + code
    logger.info({ message: `redirectToWps跳转前:${url}` })
  } else {
    if (againTime) {
      url = `${config.domain}/c/${config.metaAppId}/api/v1/sso`
    } else {
      url = `${config.domain}/c/${config.metaAppId}/api/v1/authSpace`
      // url = 'http://localhost:8000/api/v1/authSpace'
    }
    logger.info({ message: `wps-跳转到-定制登录页面:${url}` })
  }
  // 重定向
  ctx.status = 302
  ctx.redirect(url)
}

/**
 * @path     /api/v1/authorization/callback
 * @returns {object}
 * @param ctx
 */
export async function callback(ctx: Context) {
  logger.info({ message: `callback参数:${JSON.stringify(ctx.query)}` })
  ctx.status = 200
  ctx.body = { access_token: ctx.query.code }
  return ctx
}

/**
 * @path     /api/v1/authorization/userInfo
 * @returns  {object}
 * @param ctx
 */
export async function userInfo(ctx: Context) {
  logger.info({ message: `userInfo参数:${JSON.stringify(ctx.query)}` })
  let res
  const access_token:string = ctx.query.access_token.toString()
  try {
    res = {
      access_token,
      user_name: '',
      union_id: access_token,
      avatar: '' // 非必填字段
    }
    logger.info({ message: `body返回数据:${JSON.stringify(res)}` })
  } catch (e) {
    res = resErrJson(e)
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}

export async function getThirdAuthToken(ctx:Context) {
  let res
  const { userName, passWord } = ctx.request.body
  try {
    logger.info(`账号密码登录参数 username:【${userName}】`)
    // 第三方权限系统账号密码登录（获取Token）
    const thirdAuthToken = await getThirdAuthTokenFunc(userName, passWord)
    logger.info(`登录成功后用户数据:【${JSON.stringify(thirdAuthToken)}】`)
    const redirectUrl = `${config.domain}/c/${config.metaAppId}/api/v1/authorization/redirectToWps?ticket=${thirdAuthToken}`
    logger.info(`获取第三方权限系统Token成功,username:【${userName}】, userId:【${thirdAuthToken}】, redirectUrl:【${redirectUrl}】`)
    res = resJson({ data: { redirectUrl: encodeURI(redirectUrl) } })
  } catch (e) {
    logger.error(`第三方权限系统账号密码登录失败! username:【${userName}】`)
    res = resErrJson(e)
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}
