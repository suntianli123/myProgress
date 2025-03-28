import {WPSContext, WPSParams, WPSRequest} from "../../../wps2";
import {GetCompUsersParams, GetCompUsersResp} from "../../../model/data";

export default class DevWpsPlusHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
        this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
        return {
            ...params
        }
    }

    getCompUsers(params: GetCompUsersParams): Promise<GetCompUsersResp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/wpsplus_dev/get_comp_users`,
            this.query(),
            {
                path: {
                    comp_id : params.path.comp_id
                },
                queryStr: params.queryStr
            }
        )
    }
}
