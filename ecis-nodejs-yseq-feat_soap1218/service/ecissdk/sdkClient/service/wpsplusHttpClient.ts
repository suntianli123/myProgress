import {WPSContext, WPSParams, WPSRequest} from "../../wps2";
import {GetDeptUsersParams, GetDeptUsersResp} from "../../model/data";

export default class WpsPlusHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
        this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
        return {
            ...params
        }
    }

    getDeptUsers(params: GetDeptUsersParams): Promise<GetDeptUsersResp> {
        const req = new WPSRequest(this.ctx)
        req.headers = params.headers
        return req.post(
            `/sdk/wpsplus/get_dept_users`,
            this.query(),
            {
                path: {
                    comp_id: params.path.comp_id,
                    dept_id: params.path.dept_id
                },
                queryStr: params.queryStr
            }
        )
    }
}
