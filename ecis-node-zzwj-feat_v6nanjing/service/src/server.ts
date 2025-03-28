import { Context } from 'koa'
import config from './config'
import * as Koa from 'koa'
import * as koaLogger from 'koa-logger'
import * as koaBody from 'koa-body'
import { createLogger, format, transports } from 'winston'

/* 测试接口-Start */
import { companyToken } from './api/authToken'
// import { etcd } from './api/sdk/etcd'
import { cache } from './api/sdk/cache'
import { mysql } from './api/sdk/mysql'
import { getCompanyRoot, getAllDept, getAllUser, manualDeptUser, addDeptSqlSecDeptId, uidGetDeptInfo, addThirdDeptId, removeAll } from './api/common'
/* 测试接口-End */

import { callback, getThirdAuthToken, redirectToWps, userInfo } from './api/authorization'
import { deptSync } from './api/dept/index'
import { deptSyncTotal } from './api/deptinit/index'
import { userSyncTotal } from './api/userinit/index'
import { userSync } from './api/user/index'
import { excelDemo } from './api/excel'
import { setTaskTime } from './api/scheduleTaskTime'
import scheduleTask from './schedule/totalTask'
import { redisGetLock } from './util/redis'
import { sdkInstance } from './grpc/sdk'
const fs = require('fs')

const Router = require('@koa/router')
const koaStatic = require('koa-static')
const path = require('path')
const { combine, timestamp, colorize, errors, splat, json } = format

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
// app.use(koaStatic(path.join(__dirname, './public')))
app.use(koaStatic(path.join(__dirname, '../../src/public')))

app.use(koaLogger())
app.use(koaBody({ multipart: true }))

scheduleTask() // 定时全量同步


// 本地调试使用
router.post('/api/cache', cache)
router.post('/api/mysql', mysql)
// router.post('/api/etcd', etcd)
router.get('/api/v1/getCompanyRoot', getCompanyRoot)
router.get('/api/v1/getCompanyToken', companyToken)
router.get('/api/v1/common/getAllDept', getAllDept)
router.get('/api/v1/common/getAllUser', getAllUser)
// 删除部门和用户
router.post('/api/v1/removeAll', removeAll)

// 三方权限系统登录
router.post('/api/v1/getThirdAuthToken', getThirdAuthToken)
// 添加二级部门更新部门表
router.get('/api/v1/addDeptSqlSecDeptId', addDeptSqlSecDeptId)
// 添加三级部门更新部门表
router.get('/api/v1/addThirdDeptId', addThirdDeptId)
// 通过company_uid获取部门信息
router.get('/api/v1/uidGetDeptInfo', uidGetDeptInfo)

router.get('/test', (ctx: any) => {
  ctx.type = 'html'
  ctx.body = '<script>alert(1)</script>'
})

// excelDemo
router.post('/api/v1/excelDemo', excelDemo)
// sso-redirectToWps
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

/* 修改定时任务时间 */
router.get('/api/v1/tasktime', setTaskTime)
/* 手动改执行同步任务 */
router.get('/api/v1/manualDeptUser', manualDeptUser)

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

router.get('/api/v1/sso', async (ctx: Context) => {
  ctx.body = `
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
        <script>
          window.routerBase = "/";
        </script>
        <script>
          //! umi version: 3.5.36
        </script>
      </head>
      <body>
        <div id="root"></div>
        <script src="${config.domain}/c/zzwjaccount/api/v1/umiJs"></script>
      </body>
    </html>`
  return ctx
})

router.get('/api/v1/umiJs', async (ctx: Context) => {
  ctx.type = 'js'
  const url = path.join(__dirname, '../src/public/umi.js')
  const result = await fs.readFileSync(url, 'utf-8')
  ctx.body = result
  return ctx
})


router.get('/api/v1/authSpace', (ctx: any) => {
  ctx.type = 'html'
  ctx.body = `
  <script>
    window.onload = () => {
        function getUrlParams(url) {
          let urlStr = url.split('?')[1]
          const urlSearchParams = new URLSearchParams(urlStr)
          const result = Object.fromEntries(urlSearchParams.entries())
          return result
        }
        const pageSession = sessionStorage.getItem('cb') || ''
        const pageParam = getUrlParams(pageSession)
        console.log(pageParam)
        let linkStr = ''
        // eslint-disable-next-line no-prototype-builtins
        if (pageParam.ticket) {
          linkStr += '&ticket=' + pageParam.ticket
        }
        if (pageParam.source) {
          linkStr += '&source=' + pageParam.source
        }
        window.location.href = '${config.domain}/c/zzwjaccount/api/v1/authorization/redirectToWps?againTime=1' + linkStr
    }
  </script>
`
})

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
// app.listen(eee.port)

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
