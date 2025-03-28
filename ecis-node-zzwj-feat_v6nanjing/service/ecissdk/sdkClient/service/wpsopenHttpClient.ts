import {WPSContext, WPSParams, WPSRequest} from "../../wps2";
import {
    GRPC_BINARY_KEY_SUFFIX,
    OpenGetFileInfoParam,
    OpenGetFileInfoResp,
    OpenGetIdConfuseParams,
    OpenGetIdConfuseResp,
    OpenGetSaveFileUrlParam,
    OpenGetSaveFileUrlResp,
    OpenPreviewInnerFileInfoParam,
    OpenPreviewInnerFileInfoResp
} from "../../model/data";

export default class WpsOpenHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
        this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
        return {
            ...params
        }
    }

    getIdConfuse(params: OpenGetIdConfuseParams): Promise<OpenGetIdConfuseResp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/wpsopen/get_id_confuse`,
            this.query(),
            {
                queryStr: params.queryStr
            }
        )
    }
}
