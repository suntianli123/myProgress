import {WPSContext, WPSParams, WPSRequest} from "../../../wps2";
import {
    DevCreateFileParams,
    DevCreateFileResp,
    DevCreateFilesUploadParams,
    DevDownloadFileParams,
    DevDownloadFileResp, YundocCreateFilesUploadResp
} from "../../../model/data";
import {Resp} from "../../../model/resHelper";

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

    createFilesUpload(params: DevCreateFilesUploadParams): Promise<Resp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/yundoc_dev/create_files_upload`,
            this.query(),
            {
                userid: params.body.userid,
                name: params.body.name,
                size: params.body.size,
                parent_path: params.body.parent_path,
            }
        )
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
                req_by_internal: params.query.req_by_internal,
                x_origin: params.query.x_origin
            })
        )
    }
}
