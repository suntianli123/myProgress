import { grpcSDK, GrpcSdkInstance } from '../../ecissdk/grpcSDK'
import config from '../config'
import { logger } from '../index'
import CacheGrpcClient from '../../ecissdk/sdkClient/middleware/cacheGrpcClient'
import MysqlGrpcClient from '../../ecissdk/sdkClient/middleware/mysqlGrpcClient'
import EtcdGrpcClient from '../../ecissdk/sdkClient/middleware/etcdGrpcClient'
import Wps3GrpcClient from '../../ecissdk/sdkClient/middleware/wps3GrpcClient'
import ConfigGrpcClient from '../../ecissdk/sdkClient/middleware/configGrpcClient'
import GlobalRouterGrpcClient from '../../ecissdk/sdkClient/service/globalRouterGrpcClient'
import FileDecryptGrpcClient from '../../ecissdk/sdkClient/scene/fileDecryptGrpcClient'
import AccountGrpcClient from '../../ecissdk/sdkClient/service/accountGrpcClient'
import DevAccountGrpcClient from '../../ecissdk/sdkClient/service/dev/devAccountGrpcClient'
import WpsopenGrpcClient from '../../ecissdk/sdkClient/service/wpsopenGrpcClient'
import WpsplusGrpcClient from '../../ecissdk/sdkClient/service/wpsplusGrpcClient'
import DevWpsplusGrpcClient from '../../ecissdk/sdkClient/service/dev/devWpsplusGrpcClient'

class SdkInstance {
  middleware: {
    cache: CacheGrpcClient,
    mysql: MysqlGrpcClient,
    etcd: EtcdGrpcClient,
    wps3: Wps3GrpcClient,
    appConfig: ConfigGrpcClient
  }

  service: {
    dev: {
      account: DevAccountGrpcClient,
      wpsplus: DevWpsplusGrpcClient
    }
    globalRouter: GlobalRouterGrpcClient,
    account: AccountGrpcClient,
    wpsopen: WpsopenGrpcClient,
    wpsplus: WpsplusGrpcClient
  }

  scene: {
    fileDecrypt: FileDecryptGrpcClient
  }
}

let grpcSdkInstance: GrpcSdkInstance
let sdkInstance: SdkInstance
grpcSDK
  .init(config.grpc.addr, config.appid, config.appkey)
  .then(sdk => {
    grpcSdkInstance = sdk
    sdkInstance = {
      middleware: {
        cache: new CacheGrpcClient(),
        mysql: new MysqlGrpcClient(),
        etcd: new EtcdGrpcClient(),
        wps3: new Wps3GrpcClient(),
        appConfig: new ConfigGrpcClient()
      },

      service: {
        dev: {
          account: new DevAccountGrpcClient(),
          wpsplus: new DevWpsplusGrpcClient()
        },
        globalRouter: new GlobalRouterGrpcClient(),
        account: new AccountGrpcClient(),
        wpsopen: new WpsopenGrpcClient(),
        wpsplus: new WpsplusGrpcClient()
      },

      scene: {
        fileDecrypt: new FileDecryptGrpcClient()
      },
    }
    logger.info({ msg: 'ecissdk sdkInstance init done' })
  })
  .catch(reason => {
    logger.error({ msg: `ecissdk sdkInstance init error:${reason}` })
  })

export { grpcSdkInstance, sdkInstance }
