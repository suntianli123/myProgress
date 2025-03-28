import {WPSContext, WPSParams, WPSRequest} from "../../wps2";
import {CacheDelResp, CacheGetResp, CacheSetResp, FileClearHistoryResp, FileDecryptExistResp, FileDecryptFileResp, FilePreUploadFileResp, MysqlDelResp, MysqlInsertResp, MysqlSelResp, MysqlUpdateResp} from "../../model/data";

export default class CacheHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
        this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
        return {
            ...params
        }
    }

    set(key: string, value: string): Promise<CacheSetResp>{
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/cache/set`,
            this.query(),
            {
                key,
                value,
            }
        )
    }

    get(key: string): Promise<CacheGetResp>{
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/cache/get`,
            this.query(),
            {
                key,
            }
        )
    }

    del(key: string): Promise<CacheDelResp>{
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/cache/del`,
            this.query(),
            {
                key,
            }
        )
    }

    hSet(hash: string, field: string, value: string): Promise<CacheDelResp>{
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/cache/hSet`,
            this.query(),
            {
                hash,
                field,
                value
            }
        )
    }

    hGet(hash: string, field: string): Promise<CacheDelResp>{
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/cache/hGet`,
            this.query(),
            {
                hash,
                field
            }
        )
    }

    hDel(hash: string, field: string): Promise<CacheDelResp>{
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/cache/hDel`,
            this.query(),
            {
                hash,
                field
            }
        )
    }

    hGetAll(hash: string): Promise<CacheDelResp>{
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/cache/hGetAll`,
            this.query(),
            {
                hash,
            }
        )
    }
}
