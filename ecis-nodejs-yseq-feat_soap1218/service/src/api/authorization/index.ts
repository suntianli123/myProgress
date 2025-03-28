import { Context } from 'koa'
import config from '../../config'
import axios from 'axios'
import { logger } from '../../ins'
import { accessTokenToUser, codeToAccessToken, getAccessTokenFromWechat, getUserAuth, getUserIdFromWechat } from '../../model/openApi/third'
import { resErrJson } from '../../util/msgCode'

/**
 * @path     /api/v1/authorization/redirectToWps
 * @param    {object} Context
 * @returns  {object}
 */
export async function redirectToWps(ctx: Context) {
  logger.info({ message: `redirectToWps参数:${JSON.stringify(ctx.query)}` })
  logger.info({
    message: `redirectToWps Headers：【${JSON.stringify(ctx.request.headers)}】`
  })
  const userAgent = ctx.request.headers['user-agent']
  logger.info({ message: `redirectToWps UserAgent：【${userAgent}】` })
  ctx.cookies.set('wps_sid', undefined)
  const { code, state } = ctx.query

  // PC端 & 移动端 企业微信标志
  const isFromWechat =
    ctx.headers['user-agent'].includes('Wechat') ||
    ctx.headers['user-agent'].includes('wxwork') ||
    (state && state === 'wxwork_redirect')
  logger.info({
    type: '微信标志位',
    data: isFromWechat
  })

  let url
  if (code) {
    const domain = isFromWechat ? config.third.wechat.mappingDomain : config.domain
    const cb: string = `${domain}/kdocs`
    const redirectUri: string = `${
      domain
    }/oauth-svr/oauth/v1/code?app_id=${
      config.appID
    }&is_platform_code_signin=true&cb=${encodeURIComponent(cb)}`
    const state = ctx.cookies.get('_WPS_OAUTH_STATE_') || new Date().getTime()
    logger.info({
      type: 'state的值',
      dfata: state
    })
    ctx.cookies.set('_WPS_OAUTH_STATE_', `${state}`)
    let codeParam = code
    if (isFromWechat) {
      codeParam = `${code}-wechat`
    }
    logger.info({
      type: 'code的值',
      data: code
    })
    url = redirectUri + '&state=' + state + '&code=' + codeParam
    logger.info({ message: `redirectToWps跳转前:${url}` })
  } else {
    // wps-跳转到-第三方登录页面
    // 1228配置
    let towpsUrl = `${config.domain}/c/${config.componentId}/api/v1/authorization/redirectToWps`

    // 三方地址-具体根据三方接口修改
    url = `${config.third.tim.domain}/idp/oauth2/authorize?client_id=${
      config.third.tim.clientId
    }&redirect_uri=${encodeURIComponent(
      towpsUrl
    )}&response_type=code&state=state`
    const { state } = ctx.query

    // 企业微信扫描二维码页面获取code
    // https://qywxuat.cctv.com/wwopen/sso/qrConnect?appid=wwb9d601f103941f51&agentid=1000076&redirect_uri=http://10.145.3.236/ecis/app/AK20221028YSEQ/api/v1/authorization/redirectToWps&response_type=code&scope=snsapi_base&state=#wxwork_redirect
    // 企业微信获取code地址、
    if (isFromWechat) {
      logger.info({
        type: '企业微信获取code接口',
        data: state
      })
      // 1228配置
      towpsUrl = `${config.third.wechat.mappingDomain}/c/${config.componentId}/api/v1/authorization/redirectToWps`
      const redirectUrl = encodeURIComponent(towpsUrl)
      url = `https://open.weixin.qq.com/connect/oauth2/authorize/connect/oauth2/authorize?appid=${config.third.wechat.corpid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state=#wechat_redirect`
    }
    // https://amtest.cctv.com/idp/oauth2/authorize?client_id=wpsuat&redirect_uri=http://10.145.3.236/ecis/app/AK20221028YSEQ/api/v1/authorization/redirectToWps&response_type=code&state=state
    // 模拟三方接口
    // url = `https://camelot.jczxw.cn/oauth/login?client_id=${config.thirdDEV.clientId}&response_type=code&state=state&redirect_url=${towpsUrl}`

    logger.info({ message: `wps-跳转到-第三方登录页面:${url}` })
  }
  // 重定向 {"code":40000103,"msg":"app ext not found"}
  ctx.status = 302
  ctx.redirect(url)
}

/**
 * @path     /api/v1/authorization/callback
 * @param   {object} Context
 * @returns {object}
 */

export async function callback(ctx: Context) {
  const userAgent = ctx.request.headers['user-agent']
  logger.info({ message: `callback UserAgent：【${userAgent}】` })

  let res
  try {
    // logger.info({ message: `callback参数:${JSON.stringify(ctx.query)}` })
    logger.info({
      type: 'callback参数',
      data: ctx.query
    })

    const { code } = ctx.query

    let isFromWechat = false
    if (code.includes('wechat')) {
      // @ts-ignore
      isFromWechat = true
    }
    let result: any
    // eslint-disable-next-line camelcase
    let access_token: string
    if (isFromWechat) {
      // 企业微信获取token
      result = await getAccessTokenFromWechat()
      logger.info({
        type: '微信token',
        access_token: result.access_token,
        result
      })
      // @ts-ignore
      const wechatCode = code.slice(0, code.lastIndexOf('-'))
      // eslint-disable-next-line camelcase
      access_token = `access_token=${result.access_token}&code=${wechatCode}&isFromWechat=${isFromWechat}`
    } else {
      result = await codeToAccessToken(`${code}`)

      // eslint-disable-next-line camelcase
      access_token = result.access_token
      logger.info({
        type: '三方token',
        data: result
      })
    }

    // 模拟第三方接口
    // const resData: any = await axios({
    //   method: 'get',
    //   url: `https://api.jczxw.cn/mock/20/wps/api/v1/codeToAccessToken?code=${code}`
    // })
    // logger.info({ message: `result:${JSON.stringify(resData.data)}` })
    // const result = resData.data

    const body = {
      access_token,
      token_type: 'type',
      expires_in: result.expires_in,
      refresh_token: result.refresh_token
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
  const userAgent = ctx.request.headers['user-agent']
  logger.info({ message: `userInfo UserAgent：【${userAgent}】` })
  let res
  try {
    // logger.info({ message: `userInfo参数:${JSON.stringify(ctx.query)}` })
    logger.info({
      type: 'userInfo接口参数',
      data: ctx.query
    })
    // eslint-disable-next-line camelcase
    let access_token = ctx.query.access_token

    // @ts-ignore
    const searchParams = new URLSearchParams(access_token)
    const isFromWechat = searchParams.get('isFromWechat')

    logger.info({
      type: 'userInfo中的标志位',
      data: isFromWechat
    })

    let userInfo: any
    let wxToken: any
    if (isFromWechat === 'true') {
      // 从企业微信平台获取用户id
      const code = searchParams.get('code')
      // eslint-disable-next-line camelcase
      access_token = searchParams.get('access_token')
      logger.info({
        type: '微信access_token和code',
        // eslint-disable-next-line camelcase
        data: `${access_token}分隔符${code}`
      })
      // 根据企业微信id获取对应的userInfo
      const userInfoFromMiddleUser = await getUserIdFromWechat(
        code,
        access_token
      )
      // eslint-disable-next-line camelcase
      wxToken = access_token
      logger.info({
        msg: '通过企业微信code和token获取的用户详情',
        userInfoFromMiddleUser
      })
      const { errcode } = userInfoFromMiddleUser

      if (errcode && errcode !== 0) {
        logger.info({
          type: '获取到的',
          data: ctx.headers
        })
        ctx.status = 302
        ctx.redirect(`${config.third.wechat.mappingDomain}/kdocs`)
        return
      }
      userInfo = {
        user_name: userInfoFromMiddleUser && userInfoFromMiddleUser.UserId,
        user_id: userInfoFromMiddleUser && userInfoFromMiddleUser.UserId,
        avatar: userInfoFromMiddleUser && userInfoFromMiddleUser.avatar
      }
      logger.info({
        type: 'userInfo返回数据',
        data: userInfo
      })
    } else {
      // eslint-disable-next-line camelcase
      userInfo = await accessTokenToUser(`${access_token}`)
      logger.info({
        type: 'userInfo返回数据',
        data: userInfo
      })

      // 获取企业微信接口
      const result: any = await getAccessTokenFromWechat()
      logger.info({})
      wxToken = result.access_token
    }

    const userId = userInfo.loginName || userInfo.user_id
    // 用户权限校验
    logger.info({
      msg: '用户权限校验:userid',
      userId
    })
    const userInfoData = await getUserAuth(userId, wxToken)
    if (userInfoData.errcode !== 0) {
      logger.error({ msg: '该用户无权限', userInfoData })
      userInfo = {}
    } else {
      userInfo = {
        avatar: userInfoData.avatar,
        loginName: userInfoData.userid
      }
    }
    // 模拟第三方接口
    // const resData: any = await axios({
    //   method: 'get',
    //   url: `https://api.jczxw.cn/mock/20/wps/api/v1/accessTokenToUser?access_token=${access_token}`
    // })
    // logger.info({ message: `result:${JSON.stringify(resData.data)}` })
    // const result = resData.data
    // const { loginName } = userInfo || {}
    res = {
      access_token,
      user_name: (userInfo && userInfo.loginName) || '',
      union_id: (userInfo && userInfo.loginName) || '',
      avatar: (userInfo && userInfo.avatar) || '' // 非必填字段
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
