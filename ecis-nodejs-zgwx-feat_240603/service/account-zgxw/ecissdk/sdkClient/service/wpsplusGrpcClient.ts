import {GetDeptUsersParams, GetDeptUsersResp, GRPC_BINARY_KEY_SUFFIX} from "../../model/data";
import {GetDeptUsersRequest} from "../../client/wpsplus/wpsplus_pb";
import {grpcSdkInstance} from "../../../src/grpc/sdk";

/**
 * wpsplus RPC客户端
 */
export default class WpsplusGrpcClient {
  getDeptUsers(params: GetDeptUsersParams): Promise<GetDeptUsersResp> {
    return new Promise<GetDeptUsersResp>((resolve, reject) => {
      const request = new GetDeptUsersRequest()
      request.setCompId(params.path.comp_id)
      request.setDeptId(params.path.dept_id)
      request.setQueryStr(params.queryStr)
      grpcSdkInstance.meta.set(`headers${GRPC_BINARY_KEY_SUFFIX}`, Buffer.from(JSON.stringify(params.headers)))
      grpcSdkInstance.service.wpsplus.getDeptUsers(request, grpcSdkInstance.meta, function(_err, response) {
        if (_err) {
          return reject(_err)
        }
        return resolve({
          result: response.getResult(),
          data: response.getData() ? JSON.parse(response.getData()) : null,
          msg: response.getMsg()
        })
      })
    })
  }
}
