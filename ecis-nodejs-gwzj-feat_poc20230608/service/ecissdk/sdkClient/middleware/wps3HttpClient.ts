import {WPSContext, WPSParams, WPSRequest} from "../../wps2";
import {FileClearHistoryResp, FileDecryptExistResp, FileDecryptFileResp, FilePreUploadFileResp, MysqlDelResp, MysqlInsertResp, MysqlSelResp, MysqlUpdateResp, Wps3PreDownloadResp, Wps3PreUploadResp} from "../../model/data";

export default class Wps3HttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
        this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
        return {
            ...params
        }
    }

    preDownloadUrl(key: string): Promise<Wps3PreDownloadResp>{
        const req = new WPSRequest(this.ctx)
            return req.get(
                `/sdk/wps3/pre_download_url`,
                this.query({
                    key
                })
            )
    }

    preUploadUrl(key: string): Promise<Wps3PreUploadResp>{
        const req = new WPSRequest(this.ctx)
            return req.get(
                `/sdk/wps3/pre_upload_url`,
                this.query({
                    key
                })
            )
    }
   
}
