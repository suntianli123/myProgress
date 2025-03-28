import {AccountGetUserByIdResp} from "../../../model/data";
import {grpcSdkInstance} from "../../../../src/grpc/sdk";
import {GetUserByIdRequest} from "../../../client/devAccount/devAccount_pb";

export default class DevAccountGrpcClient {
  getUserById(userid: string): Promise<AccountGetUserByIdResp> {
    return new Promise<AccountGetUserByIdResp>((resolve, reject) => {
      const request = new GetUserByIdRequest()
      request.setUserid(userid)
      grpcSdkInstance.service.dev.account.getUserById(
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
          } as AccountGetUserByIdResp)
        }
      )
    })
  }
}
