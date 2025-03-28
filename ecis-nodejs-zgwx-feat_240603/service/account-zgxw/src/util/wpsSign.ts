import config from '../config'
import type { AxiosRequestConfig } from 'axios'
const crypto = require('crypto')

/**
 *  wps3 签名方法
 *  @param   {object} RequestConfig
 *  @returns {object} wps3 headers签名
 */
export function sign(conf: AxiosRequestConfig) {
  const contentType = 'application/json'
  const date = new Date().toUTCString()
  let body: string = ''
  if (conf.data && Object.keys(conf.data).length) {
    body = `${JSON.stringify(conf.data)}`
  }
  const contentMd5 = crypto.createHash('md5').update(body).digest('hex')
  const url = conf.url
    .replace(/\/koauthapi/, '')
    .replace(/\/kopenapi/, '')
    .replace(/\/open/, '')
  const sha1Data = `${config.appKey}${contentMd5}${url}${contentType}${date}`
  const sign =
    'WPS-3:' +
    config.appID +
    ':' +
    crypto.createHash('sha1').update(sha1Data).digest('hex')
  return {
    'Content-Type': contentType,
    'Content-Md5': contentMd5,
    'X-Auth': sign,
    Date: date
  }
}
