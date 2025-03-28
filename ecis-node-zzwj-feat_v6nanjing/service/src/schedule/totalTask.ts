// *  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │  |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

import * as schedule from 'node-schedule'
import { Context } from 'koa'
import { logger } from '../server'
import { sdkInstance } from '../grpc/sdk'
import { resErrJson } from '../util/msgCode'
import { deptSyncTotal } from '../api/deptinit'
import { userSyncTotal } from '../api/userinit'
import config from '../config'
import { redisGetLock, redisReleaseLock } from '../util/redis'

const scheduleUserTask = () => {
  // 每分钟的第30秒定时执行一次:
  schedule.scheduleJob('0 05 02 * * *', () => {
    console.log('【同步用户定时任务】' + new Date())
  })
}
const moment = require('moment')
let scheduleDeptTaskJob: any
const rule = new schedule.RecurrenceRule()
rule.hour = '2'
rule.minute = '0'
rule.second = '0'
rule.dayOfWeek = '? '
rule.date = '*'
rule.month = '*'
const scheduleTask = async (timeType?: any, taskTime?: any) => {
  const ruleOri = await getTaskTime(timeType, taskTime)
  // */2
  rule.hour = ruleOri.hour ? ruleOri.hour : '*'
  rule.minute = ruleOri.minute ? ruleOri.minute : '0/10'
  logger.info(`当前设定每隔：${JSON.stringify(rule)}`)
  if (scheduleDeptTaskJob) {
    scheduleDeptTaskJob.cancel()
  }
  const schRule = '' + rule.second + ' ' + rule.minute + ' ' + rule.hour + ' ' + rule.date + ' ' + rule.month + ' ' + rule.dayOfWeek
  console.log(schRule)
  /* 0 0/2 * * * ?  */
  /* 定时任务 */
  scheduleDeptTaskJob = schedule.scheduleJob(schRule, async () => {
    // let res
    // try {
    //   const ctx: any = {}
    //   await deptSyncTotal(ctx)
    //   await userSyncTotal(ctx)
    // } catch (e) {
    //   /** 格式化错误信息-记录错误日志 */
    //   await sdkInstance.middleware.cache.set('task_dept_status', 'finied')
    //   const errJson = resErrJson(e)
    //   // 错误返回值
    //   res = errJson
    // }
    // logger.info(res)

    // redis-key
    const lockKey = `${config.appID}-DEPT-LOCK`
    // 有效时长 单位（秒）
    const expireTime = 60 * 5
    const lockResult = await redisGetLock(lockKey, expireTime)
    try {
      if (lockResult) {
        const ctx: any = {}
        await deptSyncTotal(ctx)
        await userSyncTotal(ctx)
      }
    } catch (e) {
      logger.error('部门定时任务执行异常', e)
    } finally {
      if (lockResult) {
        await redisReleaseLock(lockKey)
        logger.info('锁释放完毕')
      }
    }
    console.log('【同步部门定时任务】' + new Date())
  })
}

export default scheduleTask

const getTaskTime = async (timeType?: any, taskTime?: any) => {
  // let time = '0 0 */5 * * *'
  const rule = new schedule.RecurrenceRule()
  /* 默认定时时间 每隔一小时 */
  if (timeType && timeType === 'fixed') {
    // 定点：每天定点（比如23点）跑一次
    rule.hour = moment(taskTime, 'YYYY-MM-DD HH:mm:ss').hour()
    rule.minute = moment(taskTime, 'YYYY-MM-DD HH:mm:ss').minutes()
    // time = `0 ${minutes} ${hour} * * *`
  }
  if (timeType && timeType === 'cycle') {
    // 周期：每隔n小时跑一次
    // const rule = new schedule.RecurrenceRule()
    rule.hour =
      taskTime.split('.')[0] !== '0' ? `*/${taskTime.split('.')[0]}` : '*'
    rule.minute = taskTime.split('.')[1] !== '0' ? '0/30' : '0'
    // time = `0 ${minutes} ${hour} * * *`
  }
  return rule
}

export const updateTaskTime = async (timeType?: any, taskTime?: any) => {
  await scheduleTask(timeType, taskTime)
}
