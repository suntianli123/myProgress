import {CommonRequest} from '../../client/mysql/mysql_pb'
import {grpcSdkInstance} from '../../../src/grpc/sdk'
import {MysqlDelResp, MysqlInsertResp, MysqlSelResp, MysqlUpdateResp} from '../../model/data'

/**
 * mysql grpc客户端
 */
export default class MysqlGrpcClient {
  select(dbName: string, sql: string, values: any[]): Promise<MysqlSelResp> {
    return new Promise((resolve, reject) => {
      const request = new CommonRequest()
      request.setDbname(dbName)
      request.setSql(sql)
      request.setValues(JSON.stringify(values))
      grpcSdkInstance.middleware.mysql.select(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData()
              ? JSON.parse(response.getData())
              : response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }

  update(dbName: string, sql: string, values: any[]): Promise<MysqlUpdateResp> {
    return new Promise((resolve, reject) => {
      const request = new CommonRequest()
      request.setDbname(dbName)
      request.setSql(sql)
      request.setValues(JSON.stringify(values))
      grpcSdkInstance.middleware.mysql.update(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData()
              ? JSON.parse(response.getData())
              : response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }

  insert(dbName: string, sql: string, values: any[]): Promise<MysqlInsertResp> {
    return new Promise((resolve, reject) => {
      const request = new CommonRequest()
      request.setDbname(dbName)
      request.setSql(sql)
      request.setValues(JSON.stringify(values))
      grpcSdkInstance.middleware.mysql.insert(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData()
              ? JSON.parse(response.getData())
              : response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }

  delete(dbName: string, sql: string, values: any[]): Promise<MysqlDelResp> {
    return new Promise((resolve, reject) => {
      const request = new CommonRequest()
      request.setDbname(dbName)
      request.setSql(sql)
      request.setValues(JSON.stringify(values))
      grpcSdkInstance.middleware.mysql.delete(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData()
              ? JSON.parse(response.getData())
              : response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }
}
