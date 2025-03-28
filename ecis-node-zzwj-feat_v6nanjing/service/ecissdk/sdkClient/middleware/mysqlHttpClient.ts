import { WPSContext, WPSParams, WPSRequest } from '../../wps2'
import { FileClearHistoryResp, FileDecryptExistResp, FileDecryptFileResp, FilePreUploadFileResp, MysqlDelResp, MysqlInsertResp, MysqlSelResp, MysqlUpdateResp } from '../../model/data'

export default class MysqlHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
      this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
      return {
        ...params
      }
    }

    select(dbName: string, sql: string, values: any[]): Promise<MysqlSelResp> {
      const req = new WPSRequest(this.ctx)
      return req.post(
        '/sdk/mysql/select',
        this.query(),
        {
          dbName,
          sql,
          values
        }
      )
    }

    update(dbName: string, sql: string, values: any[]): Promise<MysqlUpdateResp> {
      const req = new WPSRequest(this.ctx)
      return req.post(
        '/sdk/mysql/update',
        this.query(),
        {
          dbName,
          sql,
          values
        }
      )
    }

    insert(dbName: string, sql: string, values: any[]): Promise<MysqlInsertResp> {
      const req = new WPSRequest(this.ctx)
      return req.post(
        '/sdk/mysql/insert',
        this.query(),
        {
          dbName,
          sql,
          values
        }
      )
    }

    delete(dbName: string, sql: string, values: any[]): Promise<MysqlDelResp> {
      const req = new WPSRequest(this.ctx)
      return req.post(
        '/sdk/mysql/delete',
        this.query(),
        {
          dbName,
          sql,
          values
        }
      )
    }
}
