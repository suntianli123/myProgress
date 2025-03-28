import config from '../config'
import { logger } from '../ins'
import PocketHttpClient from '../../ecissdk/sdkClient/scene/pocketHttpClient'
import { WPSContext } from '../../ecissdk/wps2'
import MysqlHttpClient from '../../ecissdk/sdkClient/middleware/mysqlHttpClient'
import CacheHttpClient from '../../ecissdk/sdkClient/middleware/cacheHttpClient'
import Wps3HttpClient from '../../ecissdk/sdkClient/middleware/wps3HttpClient'
import YunDocHttpClient from '../../ecissdk/sdkClient/service/yunDocHttpClient'
import AccountHttpClient from '../../ecissdk/sdkClient/service/accountHttpClient'
import WpsOpenHttpClient from '../../ecissdk/sdkClient/service/wpsopenHttpClient'
import WpsPlusHttpClient from '../../ecissdk/sdkClient/service/wpsplusHttpClient'
import GlobalRouterHttpClient from '../../ecissdk/sdkClient/service/globalRouterHttpClient'
import SecDocHttpClient from '../../ecissdk/sdkClient/scene/secDocHttpClient'
import SecurityScanHttpClient from '../../ecissdk/sdkClient/scene/securityScanHttpClient'
import DevAccountHttpClient from '../../ecissdk/sdkClient/service/dev/devAccountHttpClient'
import DevWpsPlusHttpClient from '../../ecissdk/sdkClient/service/dev/devWpsPlusHttpClient'
import DevYunDocHttpClient from '../../ecissdk/sdkClient/service/dev/devYunDocHttpClient'
import MsgCenterHttpClient from '../../ecissdk/sdkClient/service/msgCenterHttpClient'

class SdkInstance {
  middleware: {
    cache: CacheHttpClient,
    mysql: MysqlHttpClient,
    wps3: Wps3HttpClient
  }

  service: {
    dev: {
      yunDoc: DevYunDocHttpClient,
      account: DevAccountHttpClient,
      wpsplus: DevWpsPlusHttpClient,
    }
    globalRouter: GlobalRouterHttpClient
    yunDoc: YunDocHttpClient
    account: AccountHttpClient
    wpsplus: WpsPlusHttpClient
    wpsopen: WpsOpenHttpClient
    msgCenter: MsgCenterHttpClient
  }

  scene: {
    securityScan: SecurityScanHttpClient
    secDoc: SecDocHttpClient
    pocket: PocketHttpClient
  }
}

let ctx: WPSContext
let sdkInstance: SdkInstance
async function initGrpSDKInstance() {
  const grpc = new Promise((resolve, reject) => {
    ctx = new WPSContext(config.ecisHost, config.appid, config.appkey)
    sdkInstance = {
      middleware: {
        cache: new CacheHttpClient(ctx),
        mysql: new MysqlHttpClient(ctx),
        wps3: new Wps3HttpClient(ctx)
      },

      service: {
        dev: {
          yunDoc: new DevYunDocHttpClient(ctx),
          account: new DevAccountHttpClient(ctx),
          wpsplus: new DevWpsPlusHttpClient(ctx),
        },
        globalRouter: new GlobalRouterHttpClient(ctx),
        yunDoc: new YunDocHttpClient(ctx),
        account: new AccountHttpClient(ctx),
        wpsplus: new WpsPlusHttpClient(ctx),
        wpsopen: new WpsOpenHttpClient(ctx),
        msgCenter: new MsgCenterHttpClient(ctx)
      },

      scene: {
        securityScan: new SecurityScanHttpClient(ctx),
        secDoc: new SecDocHttpClient(ctx),
        pocket: new PocketHttpClient(ctx)
      },
    }
    logger.info({ msg: 'ecissdk sdkInstance init done' })
    resolve(1)
  })
  await Promise.all([grpc])
}

export { sdkInstance, initGrpSDKInstance }
