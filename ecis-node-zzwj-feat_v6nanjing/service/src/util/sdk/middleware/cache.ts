import request from '../../request'
// import config from '../../../config'
const appId = 'zzwjaccount'
const apiUrl = `/c/${appId}/api/cache`

export class CacheRequest {
  set(key: string, value: string): Promise<any> {
    return request({
      url: apiUrl,
      method: 'post',
      data: {
        operation: 'set',
        key,
        value
      }
    })
  }

  get(key: string): Promise<any> {
    return request({
      url: apiUrl,
      method: 'post',
      data: {
        operation: 'get',
        key
      }
    })
  }

  del(key: string): Promise<any> {
    return request({
      url: apiUrl,
      method: 'post',
      data: {
        operation: 'del',
        key
      }
    })
  }
}

const cache = new CacheRequest()

export default cache
