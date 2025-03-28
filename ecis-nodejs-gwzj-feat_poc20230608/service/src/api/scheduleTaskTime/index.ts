import { resJson, resErrJson, resCheck } from '../../util/msgCode'
import { logger } from '../../server'
import { Context } from 'koa'
import { updateDeptTaskTime } from '../../schedule/deptTask'
const moment = require('moment')

export async function setTaskTime(ctx: Context) {
  let res
  try {
    /* 入参 */
    const timeType: any = ctx.query.timeType
    const taskTime: any = ctx.query.taskTime
    // const taskTime: any = '1686902580000'
    const time = moment(Number(taskTime)).format('YYYY-MM-DD HH:mm:ss')
    logger.info({ msg: `进入修改定时时间方法,timeType: ${timeType}, taskTime: ${taskTime}, time:${time}` })
    /* 定时任务 */
    await updateDeptTaskTime(timeType, time)
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
