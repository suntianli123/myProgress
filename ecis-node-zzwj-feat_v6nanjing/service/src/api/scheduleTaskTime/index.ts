import { resJson, resErrJson, resCheck } from '../../util/msgCode'
import { logger } from '../../server'
import { Context } from 'koa'
import { updateTaskTime } from '../../schedule/totalTask'
const moment = require('moment')

export async function setTaskTime(ctx: Context) {
  let res
  try {
    /* 入参 */
    // const timeType = 'fixed'
    const timeType: any = ctx.query.timeType
    const taskTime: any = ctx.query.taskTime
    logger.info({ msg: `进入修改定时时间方法${timeType}, ${taskTime}` })
    const time =
      timeType === 'cycle'
        ? taskTime
        : moment(Number(taskTime)).format('YYYY-MM-DD HH:mm:ss')
    /* 定时任务 */
    await updateTaskTime(timeType, time)
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    logger.info('修改定时时间失败', e)
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  /* 返回数据 */
  ctx.body = res
  // ctx.body = aesEncryption(res)
  return ctx
}
