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
import axios from 'axios'
import { logger } from '../server'
// import { deptSyncTask } from '../api/dept'
import { deptSyncTotal } from '../api/deptinit'
// import { userSyncTotal } from '../api/userinit'
// import { checkUserInfo } from '../api/userinit/checkUser'
import { getCompanyToken } from '../api/authToken/func'
import { redisGetLock, redisReleaseLock } from '../util/redis'
import { userSyncTotal } from '../api/userinit'

import { Context } from 'koa'
import config from '../config'
// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../grpc/sdk'
import { resJson, resErrJson } from '../util/msgCode'
const moment = require('moment')

let scheduleDeptTaskJob: any
const scheduleDeptTask = async (timeType?: any, taskTime?: any) => {
  const time: any = await getTaskTime(taskTime)
  logger.info(`当前定时任务规则为：(${time})}`)
  if (scheduleDeptTaskJob) scheduleDeptTaskJob.cancel()
  // 每个周天凌晨2点
  schedule.scheduleJob(time, async () => {
    console.log('进行了定时任务')
    logger.info('进行了定时任务')
    // redis-key
    const lockKey = 'ACCOUNTGWMD-DEPT-USER-LOCK'
    // 有效时长 单位（秒）
    const expireTime = 60 * 60
    const lockResult = await redisGetLock(lockKey, expireTime)
    logger.info(`当前节点获取锁状况：${JSON.stringify(lockResult)}`)
    try {
      if (lockResult) {
        // 成功获取到锁，执行业务逻辑
        logger.info(`当前节点获取锁【${lockKey}】成功,开始执行业务逻辑...`)
        const ctx: any = {}
        await getCompanyToken(true)
        /* 部门用户定时任务 */
        await deptSyncTotal(ctx)
        logger.info(`【${moment().format('YYYY-MM-DD HH:mm:ss')}】【三方全量部门同步完成】`)
        await userSyncTotal(ctx)
        logger.info(`【${moment().format('YYYY-MM-DD HH:mm:ss')}】【三方全量用户同步完成】`)
        logger.info('---------redis锁业务执行全量同步完毕-----------')
      } else {
        logger.info(`当前节点获取锁【${lockKey}】失败!`)
      }
    } catch (e) {
      logger.error('国网浙江定时任务执行异常', e)
    } finally {
      if (lockResult) {
        await redisReleaseLock(lockKey)
      }
    }
  })
}

export default scheduleDeptTask

const getTaskTime = async (taskTime?: any) => {
  let time = '0 0 18 * * ? '
  if (taskTime) {
    const hour = moment(taskTime, 'YYYY-MM-DD HH:mm:ss').hour()
    const minutes = moment(taskTime, 'YYYY-MM-DD HH:mm:ss').minutes()
    time = `0 ${minutes} ${hour} * * ? `
  }
  return time
}

export const updateDeptTaskTime = async (timeType?: any, taskTime?: any) => {
  await scheduleDeptTask(timeType, taskTime)
}
