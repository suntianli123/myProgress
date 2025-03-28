import { grpcSDK, GrpcSdkInstance } from '../../../../ecissdk/grpcSDK'
import config from '../../../config'
import { logger } from '../../../index'
import CacheGrpcClient from '../../../../ecissdk/sdkClient/middleware/cacheGrpcClient'
import MysqlGrpcClient from '../../../../ecissdk/sdkClient/middleware/mysqlGrpcClient'
import EtcdGrpcClient from '../../../../ecissdk/sdkClient/middleware/etcdGrpcClient'
import Wps3GrpcClient from '../../../../ecissdk/sdkClient/middleware/wps3GrpcClient'
import ConfigGrpcClient from '../../../../ecissdk/sdkClient/middleware/configGrpcClient'
import GlobalRouterGrpcClient from '../../../../ecissdk/sdkClient/service/globalRouterGrpcClient'
import FileDecryptGrpcClient from '../../../../ecissdk/sdkClient/scene/fileDecryptGrpcClient'

import Mysql from './pg'

class SdkInstance {
  middleware: {
    cache: CacheGrpcClient
    mysql: MysqlGrpcClient
    etcd: EtcdGrpcClient
    wps3: Wps3GrpcClient
    appConfig: ConfigGrpcClient
  }

  service: {
    globalRouter: GlobalRouterGrpcClient
  }

  scene: {
    fileDecrypt: FileDecryptGrpcClient
  }
}

let grpcSdkInstance: GrpcSdkInstance

// orm模拟grpc
const pgSdkInstance: any = {
  middleware: {
    mysql: new Mysql()
  }
}

export { grpcSdkInstance, pgSdkInstance }
