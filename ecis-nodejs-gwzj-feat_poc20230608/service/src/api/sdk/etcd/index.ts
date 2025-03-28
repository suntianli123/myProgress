import { sdkInstance } from '../../../grpc/sdk'
import { logger } from '../../../index'
import { ErrResp } from '../../../../ecissdk/model/resHelper'

export async function etcd(ctx: any) {
  const { operation, key, seconds, value } = ctx.request.body
  let res
  try {
    if (operation === 'getLock') {
      // @ts-ignore
      res = await sdkInstance.middleware.etcd.getLock(key, seconds)
    } else if (operation === 'releaseLock') {
      // @ts-ignore
      res = await sdkInstance.middleware.etcd.releaseLock(key, value)
    } else {
      res = ErrResp('error', '不支持的操作类型')
    }
  } catch (e) {
    const msg = `${operation}操作异常:${e}`
    logger.error({ msg: `${msg}` })
    res = ErrResp('error', msg)
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}
