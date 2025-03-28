import request from '../../request'
import config from '../../../config'
const appId = config.dbName.replace(/ecis_plugins_/, '')
const apiUrl = `/c/${appId}/api/etcd`

export class EtcsRequest {
  getLock(key: string, seconds: number): Promise<any> {
    return request({
      url: apiUrl,
      method: 'post',
      data: {
        operation: 'getLock',
        key,
        seconds
      }
    })
  }

  releaseLock(key: string, value: string): Promise<any> {
    return request({
      url: apiUrl,
      method: 'post',
      data: {
        operation: 'releaseLock',
        key,
        value
      }
    })
  }
}

const etcd = new EtcsRequest()

export default etcd
