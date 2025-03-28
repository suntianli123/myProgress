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
import { deptSync } from '../api/dept'
import { userSync } from '../api/user'

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
const scheduleTask = async (taskTime?: any) => {
  const ruleOri = await getTaskTime(taskTime)
  // rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6]
  // */2
  rule.hour = ruleOri?.hour ? ruleOri?.hour : '*'
  rule.minute = ruleOri?.minute ? ruleOri?.minute : '0/20'
  logger.info(`当前设定每隔：${JSON.stringify(rule)}`)
  if (scheduleDeptTaskJob) {
    scheduleDeptTaskJob.cancel()
  }
  const schRule = '' + rule.second + ' ' + rule.minute + ' ' + rule.hour + ' ' + rule.date + ' ' + rule.month + ' ' + rule.dayOfWeek
  console.log(schRule)
  /* 0 0/2 * * * ?  */
  /* 定时任务 */
  scheduleDeptTaskJob = schedule.scheduleJob(schRule, async () => {
    let res
    try {
      const ctx: any = {}
      await deptSync(ctx)
      await userSync(ctx)
    } catch (e) {
      /** 格式化错误信息-记录错误日志 */
      await sdkInstance.middleware.cache.set('task_dept_status', 'finied')
      const errJson = resErrJson(e)
      // 错误返回值
      res = errJson
    }
    logger.info(res)
  })
}

export default scheduleTask

const getTaskTime = async (taskTime?: any) => {
  const rule = new schedule.RecurrenceRule()
  if (taskTime) {
    /* 默认定时时间 每隔2小时 */
    rule.hour = taskTime.split('.')[0] !== '0' ? `*/${taskTime.split('.')[0]}` : '*'
    rule.minute = taskTime.split('.')[1] !== '0' ? '0/30' : '0'
  }
  return rule
}

export const updateTaskTime = async (taskTime?: any) => {
  await scheduleTask(taskTime)
}
