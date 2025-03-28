import { Context } from 'koa'
import config from './config'
import * as Koa from 'koa'
import * as koaLogger from 'koa-logger'
import * as koaBody from 'koa-body'
import { createLogger, format, transports } from 'winston'

/* 测试接口-Start */
import { companyToken, customize } from './api/authToken'
import { etcd } from './api/sdk/etcd'
import { cache } from './api/sdk/cache'
import { mysql } from './api/sdk/mysql'
import { getCompanyRoot, getAllDept, getAllUser, removeAll } from './api/common'
/* 测试接口-End */

import { callback, checkWxCode, logoutWps, redirectToWps, userInfo } from './api/authorization'
import { deptSync } from './api/dept/index'
import { deptSyncTotal } from './api/deptinit/index'
import { userSyncTotal } from './api/userinit/index'
import { userSync } from './api/user/index'
import { excelDemo, readExcel } from './api/excel'

/** 定时任务 */
import scheduleTask from './schedule/task'
import scheduleDeptTask from './schedule/deptTask'
import { redisGetLock } from './util/redis'
import { sdkInstance } from './grpc/sdk'
import { setTaskTime } from './api/scheduleTaskTime'
import { addWhiteUser, delateWhiteUser, getWhiteUserSync, removeAllWhiteUser, searchWhiteUser, updataWhiteUser } from './api/whiteUser'

const Router = require('@koa/router')
const koaStatic = require('koa-static')
const path = require('path')
const fs = require('fs')
const { combine, timestamp, colorize, errors, splat, json } = format

/** 定时任务执行 */
scheduleDeptTask()

// 指定日志级别
const logLevel = process.env.LOG_LEVEL || 'info'

const app = new Koa()
const router = new Router()
// 创建日志实例
const logger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    errors({ stack: true }),
    splat(),
    json(),
    colorize({ all: true })
  ),
  defaultMeta: { appid: config.appid },
  transports: [
    new transports.Console({
      level: logLevel
    })
  ]
})

// 开发环境 ./public  生产 ../../src/public
app.use(koaStatic(path.join(__dirname, '../../src/public')))

app.use(koaLogger())
app.use(koaBody({ multipart: true }))

// 删除部门和用户
router.get('/api/v1/removeAll', removeAll)
// 本地调试使用
router.post('/api/cache', cache)

router.post('/api/mysql', mysql)
router.post('/api/etcd', etcd)
router.get('/api/v1/getCompanyRoot', getCompanyRoot)
router.get('/api/v1/getCompanyToken', companyToken)
router.get('/api/v1/common/getAllDept', getAllDept)
router.get('/api/v1/common/getAllUser', getAllUser)

router.get('/test', (ctx: any) => {
  ctx.type = 'html'
  ctx.body = '<script>alert(1)</script>'
})

// excelDemo
router.post('/api/v1/excelDemo', excelDemo)
// readExcel
router.get('/api/v1/readExcel', readExcel)
// 三方登录后回调
router.get('/api/v1/authorization/redirectToWps', redirectToWps)
// sso-callback
router.get('/api/v1/authorization/callback', callback)
// sso-userInfo
router.get('/api/v1/authorization/userInfo', userInfo)

/* 全量部门同步 */
router.get('/api/v1/deptInit', deptSyncTotal)
/* 增量同步部门 */
router.get('/api/v1/dept', deptSync)
/* 同步用户 */
router.get('/api/v1/userinit', userSyncTotal)
/* 增量同步用户 */
router.get('/api/v1/user', userSync)
// 国网浙江退出登录
router.get('/api/v1/auth/logoutWps', logoutWps)

// 定制页面
router.get('/customize', customize)
/* 修改定时任务时间 */
router.get('/api/v1/tasktime', setTaskTime)
/* 获取白名单用户列表 */
router.get('/api/v1/getWhiteUserSync', getWhiteUserSync)
/* 搜索白名单用户列表 */
router.get('/api/v1/searchWhiteUser', searchWhiteUser)
/* 新增白名单用户列表 */
router.get('/api/v1/addWhiteUser', addWhiteUser)
/* 修改白名单用户列表 */
router.get('/api/v1/updataWhiteUser', updataWhiteUser)
/* 删除白名单用户列表 */
router.post('/api/v1/delateWhiteUser', delateWhiteUser)
/* 清空白名单用户所有数据 */
router.get('/api/v1/removeAllWhiteUser', removeAllWhiteUser)
// 账号密码登录接口
router.post('/api/v1/auth/checkWxCode', checkWxCode)

router.get('/api/v1/testDept', async (ctx: Context) => {
  const key = 'async-etcd-lock-test'
  // 有效时长 单位（秒）
  const expireTime = 60 * 5
  const lockResult: any = await redisGetLock(key, expireTime)
  ctx.body = lockResult
  ctx.status = 200
})

// 拦截 /kdocs/oauth/v1
router.get('/oauth/v1', (ctx: Context) => {
  ctx.redirect(`${config.domain}/kdocs`)
})
// 注册路由/kdocs/oauth/v1 或路径参数?path=xxx
router.get('/api/v1/bindRoute', async (ctx: Context) => {
  const path = ctx.query.path || '/oauth/v1'
  const res = await sdkInstance.service.globalRouter.bindRoute(`${path}`)
  ctx.body = res
})

app.use(router.routes())

// 单元测试-提供方法
const run = (port: number) => {
  return app.listen(port)
}

// 未捕获的Api异常
app.on('request-error', (error: Error, ctx: Context) => {
  logger.error({
    type: 'request-error',
    message: error.message,
    requestId: ctx.requestId
  })
})

// 未捕获的服务异常
app.on('server-error', (error: any) => {
  logger.error({
    type: 'server-error',
    message: error.message
  })
})

// 未捕获的异常
process.on('uncaughtException', err => {
  logger.error({ msg: `未捕获的异常:${err}` })
})

export { logger, run }
