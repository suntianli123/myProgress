import { grpcSdkInstance } from '../../../src/grpc/sdk'
import { DownloadRequest, UploadRequest } from '../../client/wps3/wps3_pb'
import { Wps3DownloadResp, Wps3UploadResp } from '../../model/data'

/**
 * s3 RPC客户端
 */
export default class Wps3GrpcClient {
  upload(key: string, stream: string): Promise<Wps3UploadResp> {
    return new Promise((resolve, reject) => {
      const request = new UploadRequest()
      request.setKey(key)
      request.setStream(stream)
      grpcSdkInstance.middleware.wps3.upload(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: {etag: JSON.parse(response.getData()).etag},
            msg: response.getMsg()
          })
        }
      )
    })
  }

  download(key: string): Promise<Wps3DownloadResp> {
    return new Promise((resolve, reject) => {
      const request = new DownloadRequest()
      request.setKey(key)
      grpcSdkInstance.middleware.wps3.download(
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
