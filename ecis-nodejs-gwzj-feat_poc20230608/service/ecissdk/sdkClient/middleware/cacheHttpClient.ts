import { WPSContext, WPSParams, WPSRequest } from '../../wps2'
import { CacheDelResp, CacheGetResp, CacheSetResp, FileClearHistoryResp, FileDecryptExistResp, FileDecryptFileResp, FilePreUploadFileResp, MysqlDelResp, MysqlInsertResp, MysqlSelResp, MysqlUpdateResp } from '../../model/data'

export default class CacheHttpClient {
    [x: string]: any
    ctx: WPSContext

    constructor(ctx: WPSContext) {
      this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
      return {
        ...params
      }
    }

    set(key: string, value: string): Promise<CacheSetResp> {
      const req = new WPSRequest(this.ctx)
      return req.post(
        '/sdk/cache/set',
        this.query(),
        {
          key,
          value,
        }
      )
    }

    get(key: string): Promise<CacheGetResp> {
      const req = new WPSRequest(this.ctx)
      return req.post(
        '/sdk/cache/get',
        this.query(),
        {
          key,
        }
      )
    }

    del(key: string): Promise<CacheDelResp> {
      const req = new WPSRequest(this.ctx)
      return req.post(
        '/sdk/cache/del',
        this.query(),
        {
          key,
        }
      )
    }
}
