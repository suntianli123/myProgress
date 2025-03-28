import {WPSContext, WPSParams} from "../../wps2";
import {GlobalRouterBindResp} from "../../model/data";
import {logger} from "../../../src/ins";

export default class GlobalRouterHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
        this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
        return {
            ...params
        }
    }

    bindRoute(srcRoutePath: string): Promise<GlobalRouterBindResp> {
        logger.error({msg: "The GlobalRouter SDK is disabled, please replace it!!!!"})
        // const req = new WPSRequest(this.ctx)
        // return req.post(
        //     `/sdk/global_router/bind_route`,
        //     this.query(),
        //     {
        //         srcRoutePath: srcRoutePath
        //     }
        // )
        return new Promise<any>((resolve, reject) => {
            resolve({
                result: "ok",
                data: {
                    url: ""
                },
                msg: "The GlobalRouter SDK is disabled, please replace it!"
            })
        })
    }
}
