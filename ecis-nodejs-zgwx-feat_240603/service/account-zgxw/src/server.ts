import { Context } from 'koa'
import config from './config'
import * as Koa from 'koa'
import * as koaLogger from 'koa-logger'
import * as koaBody from 'koa-body'
import { createLogger, format, transports } from 'winston'

/* 测试接口-Start */
import { companyToken } from './api/authToken'
import { etcd } from './api/sdk/etcd'
import { cache } from './api/sdk/cache'
import { mysql, query } from './api/sdk/mysql'
import { getCompanyRoot, getAllDept, getAllUser, updataSubThird, addUser, addDeptList, getMastDepts, getMastUsers } from './api/common'
/* 测试接口-End */

import { callback, redirectToWps, userInfo } from './api/authorization'
import { deptSync } from './api/dept/index'
import { deptSyncTotal } from './api/deptinit/index'
import { userSyncTotal } from './api/userinit/index'
import { userSync } from './api/user/index'
import { excelDemo, readExcel } from './api/excel'
import { addNotThirdIdUser, checkUserByAtime, disableUserByAtime, deptStock, notThirdUnionId, userStock, wpsDeptInfo, clearDisabledUser } from './api/stock'
import { deptMastInit } from './api/deptMast'
import { mastMoreUser, userMastInit } from './api/userMast'
import { reviseUserSync } from './api/userMast/reviseUser'
import { reviseDeptSync } from './api/deptMast/reviseDept'
import { userContrastSync } from './api/userMast/userContrast'
import { deptContrastSync } from './api/deptMast/deptContrast'
import { mastUpdataSub } from './api/mastUpdata'
import { makeExcel } from './api/excel/excel'

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

// 本地调试使用
router.post('/api/cache', cache)
router.post('/api/mysql', mysql)
router.post('/api/etcd', etcd)
router.get('/api/v1/getCompanyRoot', getCompanyRoot)
router.get('/api/v1/getCompanyToken', companyToken)
router.get('/api/v1/common/getAllDept', getAllDept)
router.get('/api/v1/common/getAllUser', getAllUser)

// excelDemo
router.post('/api/v1/excelDemo', excelDemo)
// readExcel
router.get('/api/v1/readExcel', readExcel)
// readExcel
router.get('/api/v1/makeExcel', makeExcel)
// 三方登录后回调
router.get('/api/v1/authorization/redirectToWps', redirectToWps)
// sso-callback
router.get('/api/v1/authorization/callback', callback)
// sso-userInfo
router.get('/api/v1/authorization/userInfo', userInfo)

/* 增量同步部门 */
router.get('/api/v1/dept', deptSync)
/* 全量部门同步 */
router.get('/api/v1/deptInit', deptSyncTotal)
/* 同步用户 */
router.get('/api/v1/userInit', userSyncTotal)
/* 增量同步用户 */
router.get('/api/v1/user', userSync)
/* 更新订阅接收接口 */
router.post('/api/v1/updataSubThird', updataSubThird)
/* 单个添加wps用户 */
router.get('/api/v1/addUser', addUser)

/* 存量同步部门 */
router.get('/api/v1/deptStock', deptStock)
/* 存量同步用户 */
router.get('/api/v1/userStock', userStock)
/* 获取部门信息 */
router.get('/api/v1/wpsDeptInfo', wpsDeptInfo)
/* 获取没有三方id的用户 */
router.get('/api/v1/notThirdUnionId', notThirdUnionId)
/* 添加没有三方id的用户 */
router.get('/api/v1/addNotThirdIdUser', addNotThirdIdUser)
/* 手动添加部门到中间表 */
router.get('/api/v1/addDeptList', addDeptList)
/* 获取主数据部门 */
router.get('/api/v1/getMastDepts', getMastDepts)
/* 获取主数据用户 */
router.get('/api/v1/getMastUsers', getMastUsers)

/* 存量用户校正用户id */
router.get('/api/v1/reviseUserSync', reviseUserSync)
/* 存量部门校正部门id */
router.get('/api/v1/reviseDeptSync', reviseDeptSync)
/* 比主数据多出的用户列表 */
router.get('/api/v1/userContrastSync', userContrastSync)
/* 比主数据多出的部门列表 */
router.get('/api/v1/deptContrastSync', deptContrastSync)
/* 主数据全量部门同步 */
router.get('/api/v1/deptMastInit', deptMastInit)
/* 主数据全量用户同步 */
router.get('/api/v1/userMastInit', userMastInit)
/* 主数据更新订阅接收接口 */
router.post('/api/v1/mastUpdataSub', mastUpdataSub)
/* 主数据全量用户同步 */
router.get('/api/v1/mastMoreUser', mastMoreUser)

/* 调试-查询wps库 */
router.post('/api/wps/query', query)

/* 查询 禁用-启用账号 */
router.get('/api/v1/checkUserByAtime', checkUserByAtime)

/* 禁用 禁用-启用账号 */
router.get('/api/v1/disableUserByAtime', disableUserByAtime)

/* 移除已禁用的账号 */
router.get('/api/v1/clearDisabledUser', clearDisabledUser)

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
