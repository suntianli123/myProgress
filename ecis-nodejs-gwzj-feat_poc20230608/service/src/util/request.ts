import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import config from '../config'
import { sign } from './wpsSign'
import { logger } from '../server'

/** 创建request对象 */
const request: AxiosInstance = axios.create({
  baseURL: config.domain,
  timeout: 30000
})

/** request拦截器  */
request.interceptors.request.use(
  (conf: AxiosRequestConfig) => {
    /** WPS-3 签名 */
    if (!conf.headers.delWpsSign) {
      conf.headers = {
        ...conf.headers,
        ...sign(conf)
      }
      delete conf.headers.delWpsSign
    }
    // console.log(conf.url)
    return conf
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

/** response拦截器  */
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(response.data)
    return response.data ? response.data : response
  },
  (error: AxiosError) => {
    const { message, config, response } = error
    if (response && response.data) {
      logger.error({ message: `error-response-data: ${JSON.stringify(response.data)}` })
      logger.error({ message: `error-confg-data: ${JSON.stringify(config.data)}` })
      logger.error({ message: `error-confg-url: ${JSON.stringify(config.url)}` })
      logger.error({ message: `error-confg-headers: ${JSON.stringify(config.headers)}` })
      return Promise.resolve(response.data)
    }
    logger.error({ message: `error: ${error}` })
    logger.error({ message: `error: ${JSON.stringify(cycle(error))}` })
    const err = message
    logger.error({ message: `url:${config.url},message:${message}` })
    return Promise.resolve(err)
  }
)

export function cycle(obj: any, parent?: any) {
  // 表示调用的父级数组
  const parentArr = parent || [obj]
  for (const i in obj) {
    if (typeof obj[i] === 'object') {
      // 判断是否有循环引用
      parentArr.forEach((pObj: any) => {
        if (pObj === obj[i]) {
          obj[i] = '[cycle]'
        }
      })
      cycle(obj[i], [...parentArr, obj[i]])
    }
  }
  return obj
}

export default request
