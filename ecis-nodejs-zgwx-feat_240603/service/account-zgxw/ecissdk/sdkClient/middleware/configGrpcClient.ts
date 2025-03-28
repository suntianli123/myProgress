import { grpcSdkInstance } from '../../../src/grpc/sdk'
import { ConfigGetRequest, ConfigSetRequest } from '../../client/config/config_pb'
import { ConfigGetResp, ConfigPutResp } from '../../model/data'

/**
 * config RPC客户端
 */
export default class ConfigGrpcClient {
  put(key: string, value: string): Promise<ConfigPutResp> {
    return new Promise((resolve, reject) => {
      const request = new ConfigSetRequest()
      request.setKey(key)
      request.setValue(value)
      grpcSdkInstance.middleware.appConfig.put(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }

  get(key?: string): Promise<ConfigGetResp> {
    return new Promise((resolve, reject) => {
      const request = new ConfigGetRequest()
      if(key){
        request.setKey(key)
      }
      grpcSdkInstance.middleware.appConfig.get(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }
}
