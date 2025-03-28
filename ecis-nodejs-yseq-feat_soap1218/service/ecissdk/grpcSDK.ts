import * as grpc from '@grpc/grpc-js'
import { MysqlServiceClient } from './client/mysql/mysql_grpc_pb'
import { EtcdServiceClient } from './client/etcd/etcd_grpc_pb'
import { Wps3ServiceClient } from './client/wps3/wps3_grpc_pb'
import { ConfigServiceClient } from './client/config/config_grpc_pb'
import { YunDocServiceClient } from './client/yunDoc/yunDoc_grpc_pb'
import { GlobalRouterServiceClient } from './client/globalRouter/globalRouter_grpc_pb'
import { FileDecryptServiceClient } from './client/fileDecrypt/fileDecrypt_grpc_pb'
import { AppAuthServiceClient } from './client/appAuth/appAuth_grpc_pb'
import { AuthRequest, AuthResponse } from './client/appAuth/appAuth_pb'
import { CacheServiceClient } from './client/cache/cache_grpc_pb'
import { sleep } from '../src/util/utils'
import { AccountServiceClient } from './client/account/account_grpc_pb'
import { DevAccountServiceClient } from './client/devAccount/devAccount_grpc_pb'
import { DevWpsplusServiceClient } from './client/devWpsplus/devWpsplus_grpc_pb'
import { WpsopenServiceClient } from './client/wpsopen/wpsopen_grpc_pb'
import { WpsplusServiceClient } from './client/wpsplus/wpsplus_grpc_pb'
import { DevYunDocServiceClient } from './client/devYunDoc/devYunDoc_grpc_pb'
import { logger } from '../src/ins'
import { FileScanServiceClient } from './client/fileScan/fileScan_grpc_pb'
import {SecDocServiceClient} from "./client/secDoc/secdoc_grpc_pb";
import {PocketServiceClient} from "./client/pocket/pocket_grpc_pb";
import {SecurityScanServiceClient} from "./client/securityScan/securityScan_grpc_pb";

class GrpcSdkInstance {
  meta: grpc.Metadata

  middleware: {
    cache: CacheServiceClient,
    mysql: MysqlServiceClient,
    etcd: EtcdServiceClient,
    wps3: Wps3ServiceClient,
    appConfig: ConfigServiceClient
  }

  service: {
    dev: {
      yunDoc: DevYunDocServiceClient,
      account: DevAccountServiceClient,
      wpsplus: DevWpsplusServiceClient,
    }
    yunDoc: YunDocServiceClient,
    globalRouter: GlobalRouterServiceClient
    account: AccountServiceClient
    wpsplus: WpsplusServiceClient
    wpsopen: WpsopenServiceClient
  }

  scene: {
    fileDecrypt: FileDecryptServiceClient,
    fileScan: FileScanServiceClient,
    securityScan: SecurityScanServiceClient,
    secDoc: SecDocServiceClient,
    pocket: PocketServiceClient
  }
}

class GrpcSDK {
  /**
   * 元信息，如appid、access_token
   */
  private meta = new grpc.Metadata()
  private grpcAddress: string
  private appid: string
  private appkey: string

  /**
   * 初始化
   * @param grpcAddress grpc服务地址
   * @param appid app唯一标识
   * @param appkey app唯一标识
   * @return sdkInstance sdk实例
   */
  async init(grpcAddress: string, appid: string, appkey: string): Promise<GrpcSdkInstance> {
    this.grpcAddress = grpcAddress
    this.appid = appid
    this.appkey = appkey
    const res = await this.auth(this.grpcAddress, this.appid, this.appkey)
    this.meta.set('access_token', res.getAccessToken())
    this.meta.set('appid', res.getAppid())
    const sdkInstance = {
      meta: this.meta,
      middleware: {
        cache: new CacheServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
        mysql: new MysqlServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
        etcd: new EtcdServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
        wps3: new Wps3ServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
        appConfig: new ConfigServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure())
      },
      service: {
        dev: {
          yunDoc: new DevYunDocServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
          account: new DevAccountServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
          wpsplus: new DevWpsplusServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
        },
        yunDoc: new YunDocServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
        globalRouter: new GlobalRouterServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
        account: new AccountServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
        wpsplus: new WpsplusServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
        wpsopen: new WpsopenServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure())
      },
      scene: {
        fileDecrypt: new FileDecryptServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
        fileScan: new FileScanServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
        securityScan: new SecurityScanServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
        secDoc: new SecDocServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure()),
        pocket: new PocketServiceClient(this.grpcAddress, grpc.ChannelCredentials.createInsecure())
      }
    }
    this.cronRefreshAppCredential()
    return sdkInstance
  }

  /**
   * 定时刷新appCredential中的accessToken
   * @private
   */
  private async cronRefreshAppCredential() {
    while (1) {
      try {
        const res = await this.auth(this.grpcAddress, this.appid, this.appkey)
        this.meta.set('access_token', res.getAccessToken())
        this.meta.set('appid', res.getAppid())
        logger.info({ msg: `定时刷新accessToken信息:appid=${this.appid}，accessToken=${res.getAccessToken()}` })
      } catch (e) {
        logger.error({ msg: `定时刷新appCredential异常：${e}` })
      } finally {
        await sleep(12 * 60 * 60 * 1000)
      }
    }
  }

  private async auth(grpcAddress: string, appid: string, appkey: string) {
    const appAuthClient = new AppAuthServiceClient(grpcAddress, grpc.ChannelCredentials.createInsecure())
    const res = await new Promise<AuthResponse>((resolve, reject) => {
      const request = new AuthRequest()
      request.setAppid(appid)
      request.setAppkey(appkey)
      appAuthClient.auth(request, function(err, response) {
        if (err) {
          return reject(err)
        }
        return resolve(response)
      })
    })
    return res
  }
}

const grpcSDK = new GrpcSDK()
export {
  grpcSDK,
  GrpcSdkInstance
}
