import { WPSContext, WPSParams, WPSRequest } from '../../wps2'
import { AccountGetUserBySidResp, AccountIsLoginResp } from '../../model/data'

export default class AccountHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
      this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
      return {
        ...params
      }
    }

    isLogin(wpsSid: string): Promise<AccountIsLoginResp> {
      const req = new WPSRequest(this.ctx)
      return req.get(
        '/sdk/account/is_login',
        this.query({
          wpsSid: wpsSid
        })
      )
    }

    getUserBySid(wpsSid: string, csrf: string): Promise<AccountGetUserBySidResp> {
      const req = new WPSRequest(this.ctx)
      return req.get(
        '/sdk/account/get_user_by_sid',
        this.query({
          wpsSid: wpsSid,
          csrf: csrf
        })
      )
    }
}
