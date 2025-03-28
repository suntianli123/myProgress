import {WPSContext, WPSParams, WPSRequest} from "../../../wps2";
import {AccountGetUserByIdResp} from "../../../model/data";

export default class DevAccountHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
        this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
        return {
            ...params
        }
    }

    getUserById(userid: string): Promise<AccountGetUserByIdResp> {
        const req = new WPSRequest(this.ctx)
        return req.get(
            `/sdk/account_dev/get_user_by_id`,
            this.query({
                userid: userid
            })
        )
    }
}
