import {WPSContext, WPSParams, WPSRequest} from "../../wps2";
import {
    GRPC_BINARY_KEY_SUFFIX,
    OpenGetFileInfoParam,
    OpenGetFileInfoResp,
    OpenGetIdConfuseParams,
    OpenGetIdConfuseResp, OpenGetIdDeConfuseResp,
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

    getIdDeConfuse(params: OpenGetIdConfuseParams): Promise<OpenGetIdDeConfuseResp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/wpsopen/get_id_deConfuse`,
            this.query(),
            {
                queryStr: params.queryStr
            }
        )
    }

    getFileInfo(params: OpenGetFileInfoParam): Promise<OpenGetFileInfoResp> {
        const req = new WPSRequest(this.ctx)
        req.headers = params.headers
        return req.post(
            `/sdk/wpsopen/get_file_info`,
            this.query(),
            {
                queryStr: params.queryStr
            }
        )
    }

    getPreviewInnerFileInfo(params: OpenPreviewInnerFileInfoParam): Promise<OpenPreviewInnerFileInfoResp> {
        const req = new WPSRequest(this.ctx)
        req.headers = params.headers
        return req.post(
            `/sdk/wpsopen/get_preview_inner_file_info`,
            this.query(),
            {
                queryStr: params.queryStr
            }
        )
    }

    getSaveFileUrl(params: OpenGetSaveFileUrlParam): Promise<OpenGetSaveFileUrlResp> {
        const req = new WPSRequest(this.ctx)
        req.headers = params.headers
        return req.post(
            `/sdk/wpsopen/get_save_file_url`,
            this.query(),
            {
                queryStr: params.queryStr
            }
        )
    }
}
