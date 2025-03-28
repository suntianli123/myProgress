import {WPSContext, WPSParams, WPSRequest} from "../../wps2";
import {GetFileDownloadUrlRes, UpdateProfileParams, UploadFileRes} from "../../model/dlib/data";
import {CommonCodeRes} from "../../model/httpData";

export default class PocketHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
        this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
        return {
            ...params
        }
    }

    getProfile(): Promise<CommonCodeRes> {
        const req = new WPSRequest(this.ctx)
        return req.get<CommonCodeRes>(
            `/sdk/pocket/getProfile`,
            this.query()
        )
    }

    updateProfile(params: UpdateProfileParams): Promise<CommonCodeRes> {
        const req = new WPSRequest(this.ctx)
        return req.post<CommonCodeRes>(
            `/sdk/pocket/updateProfile`,
            this.query(),
            params
        )
    }

    getFileDownloadUrl(file_token: string, internal?: boolean, x_origin?: string, expectFileName?: string): Promise<GetFileDownloadUrlRes> {
        const req = new WPSRequest(this.ctx)
        return req.get<GetFileDownloadUrlRes>(
            `/sdk/pocket/getFileDownloadUrl`,
            this.query({file_token, internal, x_origin, expectFileName})
        )
    }

    uploadFile(name: string, size:number, fileData: Buffer): Promise<UploadFileRes> {
        const req = new WPSRequest(this.ctx)
        return req.post<UploadFileRes>(
            `/sdk/pocket/uploadFile`,
            this.query(),
            {
                name: name,
                size: size,
                fileData: fileData
            }
        )
    }

}
