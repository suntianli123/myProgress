import { BindRouteRequest } from '../../client/globalRouter/globalRouter_pb'
import { grpcSdkInstance } from '../../../src/grpc/sdk'
import { GlobalRouterBindResp } from '../../model/data'

export default class GlobalRouterGrpcClient {
  bindRoute(srcRoutePath: string): Promise<GlobalRouterBindResp> {
    return new Promise((resolve, reject) => {
      const request = new BindRouteRequest()
      request.setSrcRoutePath(srcRoutePath)
      grpcSdkInstance.service.globalRouter.bindRoute(
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
