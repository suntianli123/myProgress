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
import { redisGetLock, redisReleaseLock } from '../util/redis'
import config from '../config'
import { logger } from '../server'

const scheduleTask = () => {
  // 每天0时0分0秒执行一次:
  schedule.scheduleJob('0 0 0 * * *', async () => {
    logger.info('【同步部门定时任务开始】' + new Date())
    // redis-key
    const lockKey = `${config.appID}-SYNC-LOCK`
    // 有效时长 单位（秒）
    const expireTime = 5 * 60
    const lockResult = await redisGetLock(lockKey, expireTime)
    try {
      if (lockResult) {
        logger.info('成功获取到锁，执行同步')
        // TODO 成功获取到锁，执行业务逻辑
        // 部门同步完成再同步用户
      } else {
        logger.warn('未获取到锁，任务退出')
      }
    } catch (e) {
      logger.error('部门定时任务执行异常', e)
    } finally {
      if (lockResult) {
        await redisReleaseLock(lockKey)
      }
    }
    logger.info('【同步部门定时任务结束】' + new Date())
  })
}

export default scheduleTask
