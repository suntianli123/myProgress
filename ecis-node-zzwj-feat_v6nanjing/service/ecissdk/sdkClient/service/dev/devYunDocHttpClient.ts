import {WPSContext, WPSParams, WPSRequest} from "../../../wps2";
import {DevCreateFileParams, DevCreateFileResp, DevDownloadFileParams, DevDownloadFileResp} from "../../../model/data";

export default class DevYunDocHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
        this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
        return {
            ...params
        }
    }

    createFile(params: DevCreateFileParams): Promise<DevCreateFileResp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/yundoc_dev/create_file`,
            this.query(),
            {
                userid: params.body.userid,
                name: params.body.name,
                sha1: params.body.sha1,
                size: params.body.size,
                groupid: params.body.groupid,
                parentid: params.body.parentid,

                parent_path: params.body.parent_path,
                etag: params.body.etag,
                must_create: params.body.must_create,
            }
        )
    }

    downloadFile(params: DevDownloadFileParams): Promise<DevDownloadFileResp> {
        const req = new WPSRequest(this.ctx)
        return req.get(
            `/sdk/yundoc_dev/download_file`,
            this.query({
                fileid: params.query.fileid,
                userid: params.query.userid,
                req_by_internal: params.query.req_by_internal
            })
        )
    }
}
