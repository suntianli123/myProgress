import { Context } from 'koa'
import { callback, redirectToWps, userInfo } from './authorization'
import { UnionMiddleUserDept, getAllUser, handleWPSUser, matchStart, matchWpsUser, removeAll, uploadExcelAccount } from './common'
import { deptSyncTotal } from './deptinit'
import { cache } from './sdk/cache'
import { mysql } from './sdk/mysql'
import { userSyncTotal } from './userinit'
import { resErrJson, resJson } from '../util/msgCode'
import { redisGetLock } from '../util/redis'
import { logger } from '../ins'
import { deptStock } from './stock'
import { putDepts } from '../model/openApi/company'
import request from '../util/request'
import { getCompanyToken } from './authToken/func'
import { removeAllUsers } from '../util'
import { Logger } from 'winston'
import { updateMessage } from './updateSoap'
import { companyToken } from './authToken'
const Router = require('@koa/router')
const fs = require('fs')

export function api() {
  const router = new Router()
  // 指定路由
  router.get('/api/test/ping', async function (ctx: Context) {
    ctx.status = 200
    ctx.body = {
      result: 'ok'
    }
    return ctx
  })
  router.post('/api/cache', cache)
  router.post('/api/mysql', mysql)
  router.get('/api/v1/getCompanyToken', companyToken)
  router.get('/api/v1/removeAll', removeAll)

  // sso-redirectToWps
  router.get('/api/v1/authorization/redirectToWps', redirectToWps)
  // sso-callback
  router.get('/api/v1/authorization/callback', callback)
  // sso-userInfo
  router.get('/api/v1/authorization/userInfo', userInfo)
  /* 全量部门同步 */
  router.get('/api/v1/deptInit', deptSyncTotal)
  /* 同步用户 */
  router.get('/api/v1/userinit', userSyncTotal)
  // 存量部门处理
  router.get('/api/v1/stockDept', deptStock)
  // 存量用户插入用户中间表
  router.get('/api/v1/stock/user', handleWPSUser)
  // 存量数据插入关联关系中间表
  router.get('/api/v1/stock/unionUserDept', UnionMiddleUserDept)
  // 存储WPS存量用户
  router.get('/api/v1/match/wpsUser', matchWpsUser)
  // 文件导入账号数据
  router.post('/api/v1/uploadExcelAccount', uploadExcelAccount)
  // 匹配第三方ID
  router.get('/api/v1/match/start', matchStart)
  // 移除用户
  router.get('/api/v1/removeAllUsers', removeAllUsers)
  // 订阅时时同步功能
  router.post('/api/v1/updateMessage', updateMessage)

  router.post('/api/v1/changeDept', async (ctx: Context) => {
    const { name, order } = ctx.request.body
    const companyToken = '7878b16f574a6ce546e9f45b8ffdc21f'
    const deptId = '45VVW3yqvnY0MDE'
    const parms = {
      name: '总台编务会议成员及原三台台领导修改111',
      order: 0
    }
    const updateDept = await putDepts(companyToken, deptId, parms)
    ctx.body = {
      msg: '操作成功',
      data: updateDept
    }
    ctx.status = 200
    return ctx
  })

  router.get('/api/v1/getFile', getAllUser)

  // 获取锁
  router.get('/api/v1/getLock', async (ctx: Context) => {
    const key = ctx.query.key
    const time = ctx.query.time ? ctx.query.time.toString() : '30'
    let res
    try {
      if (!key) {
        res = resErrJson('key can not be empty!')
      } else {
        // const lockFlag = await redisGetLock(key.toString(), parseInt(time))
        // res = resJson({ data: lockFlag })
      }
    } catch (e) {
      logger.error(`尝试获取锁【${key}】异常！`, e)
    }
    ctx.body = res
    ctx.status = 200
  })
  return router
}
