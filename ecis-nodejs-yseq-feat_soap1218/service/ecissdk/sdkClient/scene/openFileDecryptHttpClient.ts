import {WPSContext, WPSParams, WPSRequest} from "../../wps2";
import {FileDecryptFileResp, FilePreUploadFileResp} from "../../model/data";
import {Resp} from "../../model/resHelper";

export default class FileDecryptHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
        this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
        return {
            ...params
        }
    }

    saveDecryFile(storekey: string, convertSize: number, filesize: number, callback: any): Promise<Resp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/openFileDecrypt/saveDecryFile`,
            this.query(),
            {
                storekey: storekey,
                convertSize: convertSize,
                filesize: filesize,
                callback: callback
            }
        )
    }

    preUploadFile(storekey: string): Promise<FilePreUploadFileResp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/openFileDecrypt/preUploadFile`,
            this.query(),
            {
                storekey: storekey,
            }
        )
    }

    existDecryptFile(
        storekey: string
    ): Promise<FileDecryptFileResp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/openFileDecrypt/existDecryptFile`,
            this.query(),
            {
                storekey: storekey
            }
        )
    }

    clearHistoryFile(storekey: string, lastdate: number): Promise<Resp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/openFileDecrypt/clearHistoryFile`,
            this.query(),
            {
                storekey: storekey,
                lastdate: lastdate
            }
        )
    }
}
