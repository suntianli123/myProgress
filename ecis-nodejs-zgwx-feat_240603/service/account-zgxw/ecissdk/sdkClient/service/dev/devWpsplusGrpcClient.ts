import { GetCompUsersParams, GetCompUsersResp} from "../../../model/data";
import {grpcSdkInstance} from "../../../../src/grpc/sdk";
import {GetCompUsersRequest} from "../../../client/devWpsplus/devWpsplus_pb";

export default class DevWpsplusGrpcClient {
  getCompUsers(params: GetCompUsersParams): Promise<GetCompUsersResp> {
    return new Promise<GetCompUsersResp>((resolve, reject) => {
      const request = new GetCompUsersRequest()
      request.setCompId(params.path.comp_id)
      request.setQueryStr(params.queryStr)
      grpcSdkInstance.service.dev.wpsplus.getCompUsers(
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
          } as GetCompUsersResp)
        }
      )
    })
  }
}
