import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { arrToTree, deptMapping } from '../../util/index'
import { handleDeptSync } from './dept'
import { logger } from '../../server'
const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function deptSync(ctx: Context) {
  let res
  try {
    const getTotalData: any = await axios.get('http://172.21.131.52:3000/mock/11/WPS/WPS/zzwj/dept')
    if (!getTotalData || !getTotalData.data || !getTotalData.data.data || !getTotalData.data.data.list) {
      throw resErrJson({ msg: '获取三方部门数据失败。' })
    }
    const deptList = await deptMapping(getTotalData.data.data.list, {
      departmentId: 'orgId',
      parentId: 'parentOrgId',
      department: 'orgName',
      status: 'useFlag',
      order: 'order'
    })
    await handleDeptSync(deptList)
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
