import { getThirdAuthToken, verifyThirdAuthToken, verifyDmyAuthToken } from '../../model/openApi/third'
import { logger } from '../../server'

/**
 * 权限系统 账号密码登录获取token
 */
export async function getThirdAuthTokenFunc(username: string, password: string) {
  logger.info('进入到账号密码登录')
  const result = await getThirdAuthToken(username, password)
  logger.info(`登录成功后用户数据:【${JSON.stringify(result.data)}】`)
  // eslint-disable-next-line eqeqeq
  if (result.data.status == '0' && result.data.data && result.data.data.userModel && result.data.data.userModel.id) {
    return result.data.data.userModel.id
  } else {
    logger.error(`【权限系统】账号密码登录失败！username:【${username}】,Result: 【${JSON.stringify(result.data.data)}】`)
    throw new Error('【权限系统】账号密码登录失败！')
  }
  // if (result.data.status === '0' && result.data.data.token) {
  //   return result.data.data.token
  // } else {
  //   logger.error(`【权限系统】账号密码登录失败！username:【${username}】,Result: 【${JSON.stringify(result.data.data)}】`)
  //   throw new Error('【权限系统】账号密码登录失败！')
  // }
}

/**
 * 权限系统 校验token
 */
export async function verifyThirdAuthTokenFunc(token: string) {
  const result = await verifyThirdAuthToken(token)
  if (result.status === 200 && result.data.status === '0' && result.data.data) {
    return result.data.data
  } else {
    logger.error(`【权限系统】校验token失败！token:【${token}】,Result: 【${JSON.stringify(result.data.data)}】`)
    throw new Error('【权限系统】校验token失败！')
  }
}

/**
 * 大蚂蚁IM 校验Token
 */
export async function verifyDmyAuthTokenFunc(ssid: string, uid: string, token: string) {
  const result = await verifyDmyAuthToken(ssid, uid, token)
  if (result.status === 200 && result.data.status === '1') {
    return true
  } else {
    logger.error(`【大蚂蚁IM】校验Token失败！ssid:【${ssid}】uid:【${uid}】token:【${token}】,Result: 【${JSON.stringify(result.data)}】`)
    return false
  }
}
