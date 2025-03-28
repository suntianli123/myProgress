import { sdkInstance } from '../../../grpc/sdk'
import { logger } from '../../../index'
import { ErrResp } from '../../../../ecissdk/model/resHelper'

export async function cache(ctx: any) {
  const { operation, key, value, hash, field } = ctx.request.body
  let res
  try {
    if (operation === 'set') {
      res = await sdkInstance.middleware.cache.set(key, value)
    } else if (operation === 'get') {
      res = await sdkInstance.middleware.cache.get(key)
    } else if (operation === 'del') {
      res = await sdkInstance.middleware.cache.del(key)
    } else if (operation === 'hSet') {
      res = await sdkInstance.middleware.cache.hSet(hash, field, value)
    } else if (operation === 'hGet') {
      res = await sdkInstance.middleware.cache.hGet(hash, field)
    } else if (operation === 'hDel') {
      res = await sdkInstance.middleware.cache.hDel(hash, field)
    } else if (operation === 'hGetAll') {
      res = await sdkInstance.middleware.cache.hGetAll(hash)
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
