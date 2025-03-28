import { AccountGetUserBySidResp, AccountIsLoginResp} from "../../model/data";
import {grpcSdkInstance} from "../../../src/grpc/sdk";
import { GetUserBySidRequest, IsLoginRequest} from "../../client/account/account_pb";

export default class AccountGrpcClient {

    isLogin(wpsSid: string): Promise<AccountIsLoginResp> {
        return new Promise<AccountIsLoginResp>((resolve, reject) => {
            const request = new IsLoginRequest()
            request.setWpsSid(wpsSid)
            grpcSdkInstance.service.account.isLogin(
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
                    } as AccountIsLoginResp)
                }
            )
        })
    }

    getUserBySid(wpsSid: string, csrf: string): Promise<AccountGetUserBySidResp> {
        return new Promise<AccountGetUserBySidResp>((resolve, reject) => {
            const request = new GetUserBySidRequest()
            request.setWpsSid(wpsSid)
            request.setCsrf(csrf)
            grpcSdkInstance.service.account.getUserBySid(
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
                    } as AccountGetUserBySidResp)
                }
            )
        })
    }

}
