import axios, { AxiosError } from 'axios'
import * as https from 'https'
import { WPSContext } from './WPSContext'
import { WPSError } from './WPSError'
import { logger } from '../../src/ins'

const agent = new https.Agent({ rejectUnauthorized: false })

export interface WPSParams {
  [key: string]: any
}

export interface WPSHeader {
  [key: string]: any
}

export class WPSRequest {
  ctx: WPSContext
  headers: WPSHeader = {}

  constructor(ctx: WPSContext) {
    this.ctx = ctx
  }

  private WPSError(error: any) {
    if (error.response) {
      const status = error.response.status || 500
      let code = error.response.data.code
      let msg = error.response.data.msg
      code = code || 1
      msg = msg || 'serverError'
      throw new WPSError(status, code, msg, error)
    }
    const message = error.message || 'error'
    return new WPSError(500, 1, message, error)
  }

  async get<T>(
    url: string,
    params?: WPSParams
  ) {
    url = this.query(url, params)
    const sign = this.ctx.sign('GET', url)
    url = this.ctx.abs(url)

    try {
      const ret = await axios.get(url, {
        headers: { ...this.headers, ...sign },
        httpsAgent: agent
      })
      return ret.data as T
    } catch (error) {
      logger.error(url, error.response?.data)
      throw this.WPSError(error)
    }
  }

  async post<T>(
    url: string,
    params?: WPSParams,
    data = {}
  ) {
    url = this.query(url, params)
    const body = this.ctx.stringify(data)
    const sign = this.ctx.sign('POST', url, body)
    url = this.ctx.abs(url)

    console.log(sign)
    console.log(url)
    console.log(body)

    try {
      const ret = await axios.post(url, body, {
        headers: { ...this.headers, ...sign },
        httpsAgent: agent
      })
      return ret.data as T
    } catch (error) {
      logger.error(url, body, error.response?.data)
      throw this.WPSError(error)
    }
  }

  async put<T>(
    url: string,
    params?: WPSParams,
    data = {}
  ) {
    url = this.query(url, params)
    const body = this.ctx.stringify(data)
    const sign = this.ctx.sign('PUT', url, body)
    url = this.ctx.abs(url)

    try {
      const ret = await axios.put(url, body, {
        headers: { ...this.headers, ...sign },
        httpsAgent: agent
      })
      return ret.data as T
    } catch (error) {
      logger.error(url, body, error.response?.data)
      throw this.WPSError(error)
    }
  }

  async delete<T>(
    url: string,
    params?: WPSParams
  ) {
    url = this.query(url, params)
    const sign = this.ctx.sign('DELETE', url)
    url = this.ctx.abs(url)

    try {
      const ret = await axios.delete(url, {
        headers: { ...this.headers, ...sign },
        httpsAgent: agent
      })
      return ret.data as T
    } catch (error) {
      logger.error(url, error.response?.data)
      throw this.WPSError(error)
    }
  }

  private query(url: string, params: WPSParams) {
    const query = this.ctx.query(params)
    if (url.indexOf('?') > 0) {
      return `${url}&${query}`
    }
    if (query && query.length > 0) {
      return `${url}?${query}`
    }
    return url
  }
}
