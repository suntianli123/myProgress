import {WPSContext, WPSParams, WPSRequest} from "../../wps2";
import {
    GetFileDownloadParams,
    GetFileDownloadResp, GetFileHistoryDownloadParams, GetFileHistoryParam, GetFileHistoryResp,
    ScanEngineCallBackParams,
    ScanEngineHeartBeatParams
} from "../../model/dlib/data";
import {Resp} from "../../model/resHelper";

export default class SecurityScanHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
        this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
        return {
            ...params
        }
    }

    scanEngineHeartBeat(params: ScanEngineHeartBeatParams): Promise<Resp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/securityScan/scanEngineHeartBeat`,
            this.query(),
            {
                bodyStr: JSON.stringify(params)
            }
        )
    }

    scanEngineCallBack(params: ScanEngineCallBackParams): Promise<Resp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/securityScan/scanEngineCallBack`,
            this.query(),
            {
                bodyStr: JSON.stringify(params)
            }
        )
    }

    getFileDownload(params: GetFileDownloadParams): Promise<GetFileDownloadResp> {
        const req = new WPSRequest(this.ctx)
        return req.get(
            `/sdk/securityScan/getFileDownload`,
            this.query({
                fileId: params.path.fileId,
                groupId: params.path.groupId,
                queryStr: params.queryStr
            })
        )
    }

    getFileHistoryDownload(params: GetFileHistoryDownloadParams): Promise<GetFileDownloadResp> {
        const req = new WPSRequest(this.ctx)
        return req.get(
            `/sdk/securityScan/getFileHistoryDownload`,
            this.query({
                historyId: params.path.historyId,
                queryStr: params.queryStr,
            })
        )
    }

    getFileHistory(params: GetFileHistoryParam): Promise<GetFileHistoryResp> {
        const req = new WPSRequest(this.ctx)
        return req.get(
            `/sdk/securityScan/getFileHistory`,
            this.query({
                fileId: params.path.fileId,
                queryStr: params.queryStr,
            })
        )
    }
}
