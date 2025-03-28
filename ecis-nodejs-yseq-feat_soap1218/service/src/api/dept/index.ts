import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { arrToTree } from '../../util/index'
import { handleDeptSync } from './dept'
const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function deptSync(ctx: Context) {
  let res
  try {
    // const deptData: any = await getTotalData(getDeptData, [], params)
    // logger.info('三方增量部门数据' + JSON.stringify(deptData))
    // const deptList = await deptMapping(deptData, {
    //   departmentId: 'id',
    //   parentId: 'parentId',
    //   department: 'name',
    //   order: 'listOrder',
    //   disable: 'isDisabled',
    //   status: 'isCancel'
    // })
    // await handleDeptSync(deptList)
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    await sdkInstance.middleware.cache.set('task_dept_status', 'finied')
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  /* 加密返回数据 */
  ctx.body = res
  // ctx.body = aesEncryption(res)
  return ctx
}
