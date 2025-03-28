import request from '../../request'
import config from '../../../config'
const apiUrl = `/c/${config.cid}/api/mysql`

export class MysqlRequest {
  select(dbName: string, sql: string, values: any[]): Promise<any> {
    return request({
      url: apiUrl,
      method: 'post',
      data: {
        operation: 'select',
        dbName,
        sql,
        values
      }
    })
  }

  update(dbName: string, sql: string, values: any[]): Promise<any> {
    return request({
      url: apiUrl,
      method: 'post',
      data: {
        operation: 'update',
        dbName,
        sql,
        values
      }
    })
  }

  insert(dbName: string, sql: string, values: any[]): Promise<any> {
    return request({
      url: apiUrl,
      method: 'post',
      data: {
        operation: 'insert',
        dbName,
        sql,
        values
      }
    })
  }

  delete(dbName: string, sql: string, values: any[]): Promise<any> {
    return request({
      url: apiUrl,
      method: 'post',
      data: {
        operation: 'delete',
        dbName,
        sql,
        values
      }
    })
  }
}

const mysql = new MysqlRequest()

export default mysql
