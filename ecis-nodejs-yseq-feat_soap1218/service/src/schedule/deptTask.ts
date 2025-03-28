// *  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │  |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

import { userSyncTotal } from '../api/userinit'

import * as schedule from 'node-schedule'
import { logger } from '../ins'
import { deptSyncTotal } from '../api/deptinit'
import config from '../config'
import { redisGetLock, redisReleaseLock } from '../util/redis'

const scheduleDeptTask = () => {
  // 每天1时30分0秒执行一次:
  schedule.scheduleJob('0 30 09 * * *', async () => {
    // redis-key
    const lockKey = `${config.appID}-DEPT-LOCK`
    // 有效时长 单位（秒）
    const expireTime = 5 * 60
    const lockResult = await redisGetLock(lockKey, expireTime)
    try {
      if (lockResult) {
        logger.info(`当前节点获取锁【${lockKey}】成功,开始执行业务逻辑...`)
        await deptSyncTotal()
        await userSyncTotal()
      } else {
        logger.info(`当前节点获取锁【${lockKey}】失败!`)
      }
    } catch (e) {
      logger.error('部门定时任务执行异常', e)
    } finally {
      if (lockResult) {
        await redisReleaseLock(lockKey)
      }
    }
    console.log('【同步部门定时任务】' + new Date())
  })
}

export default scheduleDeptTask
