import { sdkInstance } from '../../../grpc/sdk'
import { logger } from '../../../index'
import { ErrResp } from '../../../../ecissdk/model/resHelper'

export async function mysql(ctx: any) {
  const { operation, dbName, sql, values } = ctx.request.body
  let res
  try {
    console.log(operation, dbName, sql, values)
    if (operation === 'select') {
      res = await sdkInstance.middleware.mysql.select(dbName, sql, values)
    } else if (operation === 'update') {
      res = await sdkInstance.middleware.mysql.update(dbName, sql, values)
    } else if (operation === 'insert') {
      res = await sdkInstance.middleware.mysql.insert(dbName, sql, values)
    } else if (operation === 'delete') {
      res = await sdkInstance.middleware.mysql.delete(dbName, sql, values)
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
