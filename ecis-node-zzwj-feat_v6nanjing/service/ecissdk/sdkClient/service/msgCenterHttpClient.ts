import {WPSContext, WPSParams, WPSRequest} from "../../wps2";
import {NotifyParmams, NotifyResp} from "../../model/data";

export default class MsgCenterHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
        this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
        return {
            ...params
        }
    }

    pushMsg(params: NotifyParmams): Promise<NotifyResp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/msgCenter/pushMsg`,
            this.query(),
            params
        )
    }
}
