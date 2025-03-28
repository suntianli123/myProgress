import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import config from '../config'
import { logger } from '../ins'
import { sign } from './wpsSign'

/** 创建request对象 */
const request: AxiosInstance = axios.create({
  baseURL: config.domain,
  // baseURL: config.host,
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
    logger.error({ message: `error: ${JSON.stringify(error)}` })
    const err = message
    logger.error({ message: `url:${config.url},message:${message}` })
    return Promise.resolve(err)
  }
)

export default request
