import { Context } from 'koa'
import config from '../../config'
import { resErrJson } from '../../util/msgCode'
import { logger } from '../../server'
import { userLoginAuth } from '../../model/openApi/fjdlAPI'
import { getUserIdFromPC, getUsersByCode } from '../../model/openApi/third'
import { getUserIdFromWechat } from '../common'

/**
 * @path     /api/v1/authorization/redirectToWps
 * @param    {object} Context
 * @returns  {object}
 */
export async function redirectToWps(ctx: Context) {
  logger.info({ message: `redirectToWps参数:${JSON.stringify(ctx.query)}` })
  let url
  const redirectUriSet: any = ctx.query?.redirect_uri
  const access_code = ctx.query?.access_code
  const code = ctx.query?.code
  // 判断是否来自企微
  const isFromWechat = ctx.headers['user-agent'].includes('wxwork')
  // 判断是否来自企微
  logger.info({ type: '企业微信标志位', isFromWechat })
  if (access_code || code) {
    let thirdCode: any
    // eslint-disable-next-line eqeqeq
    if (isFromWechat) {
      // 企微登录
      // 根据企业微信id获取对应的userInfo
      const param = { CODE: code, appId: config.wechat.agentId }
      const userData = await getUserIdFromWechat(param)
      logger.info({ message: `userData返回数据:${JSON.stringify(userData)}` })
      // eslint-disable-next-line eqeqeq
      thirdCode = userData?.user_id
    } else {
      // 三方客户端登录
      const userInfoFromPC = await getUserIdFromPC(access_code)
      logger.info({ message: `userInfoFromPC返回数据:${JSON.stringify(userInfoFromPC)}` })
      thirdCode = userInfoFromPC?.user_id
    }
    let cb: string = `${config.domain}/kdocs`
    cb = ctx.cookies.get('REDIRECT_URI') ? ctx.cookies.get('REDIRECT_URI') : cb
    const redirectUri: string =
      `${config.domain}/oauth-svr/oauth/v1/code?app_id=${config.redirectAppid}&is_platform_code_signin=true&cb=${encodeURIComponent(cb)}`
    const state = ctx.cookies.get('_WPS_OAUTH_STATE_') || new Date().getTime()
    ctx.cookies.set('_WPS_OAUTH_STATE_', `${state}`)
    url = redirectUri + '&state=' + state + '&code=' + thirdCode
    logger.info({ message: `redirectToWps跳转前:${url}` })
  } else {
    let cb
    const splitArr = redirectUriSet ? redirectUriSet.split('cb=') : []
    if (splitArr.length && splitArr.length >= 2) {
      cb = splitArr[1].split('&is_platform')[0]
    }
    ctx.cookies.set('REDIRECT_URI', (cb ? decodeURIComponent(cb.toString()) : undefined))
    let towpsUrl = ''
    // 三方地址-具体根据三方接口修改
    url = `${config.domain}/c/${config.cid}/customize#/login`
    // 企微登录处理
    // eslint-disable-next-line eqeqeq
    if (isFromWechat) {
      towpsUrl = `${config.domain}/c/${config.cid}/api/v1/authorization/redirectToWps`
      const redirectUrl = encodeURIComponent(towpsUrl)
      url = `${config.wechat.domain}/connect/oauth2/authorize?appid=${config.wechat.corpid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state=STATE&agentid=${config.wechat.agentId}&type=wechat#wechat_redirect`
    }
    logger.info({ message: `wps-跳转到-第三方登录页面:${url}` })
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
      access_token: code
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
      union_id: access_token,
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

// 国网浙江退出登录
export async function logoutWps(ctx: Context) {
  logger.info({ message: `headers参数:${JSON.stringify(ctx.request.header)}` })
  logger.info({ message: `redirectToWps:${JSON.stringify(ctx.query)}` })
  ctx.cookies.set('wps_sid', undefined)
  const { redirect_url } = ctx.query
  if (redirect_url) {
    let state = ctx.cookies.get('_WPS_OAUTH_STATE_')
    if (!state) {
      state = new Date().getTime() + '_fjdl'
      ctx.cookies.set('_WPS_OAUTH_STATE_', state)
    }
    ctx.status = 302
    ctx.redirect(`${redirect_url}`)
  } else {
    ctx.status = 200
    ctx.body = {
      code: 200,
      msg: '注销成功！'
    }
  }
}

/**
 * @path     账号密码登录接口
 * @param    {object} Context
 * @returns  {object}
 */
export async function checkWxCode(ctx: Context) {
  let res
  try {
    logger.info({ message: `userInfo参数:${JSON.stringify(ctx.query)}` })
    const loginBody: any = ctx.request.body
    const param = {
      userName: loginBody?.userName, password: loginBody.password
    }
    const deptRootData: any = await userLoginAuth(param)
    res = {
      data: deptRootData,
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
