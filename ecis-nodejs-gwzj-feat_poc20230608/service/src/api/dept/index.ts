import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { arrToTree, deptMapping } from '../../util/index'
import { handleDeptSync } from './dept'
import { logger } from '../../server'
import { getDeptRootDataApi, getNextDeptDataApi } from '../../model/openApi/fjdlAPI'
const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function deptSync(ctx: Context) {
  let res
  try {
    const rootId = await getDeptList('') // 同步根部门信息
    await getNextDeptList(rootId) // 同步根部门下的部门信息
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

/**
 * 根据部门ID查询当前部门信息
 * @param {string} deptId
 * @param {string} propertyType
 */
const getDeptList = async (propertyType?: string) => {
  const deptData: any = await getDeptRootDataApi()
  if (!deptData || deptData.length < 1) {
    throw resErrJson({ msg: '通过systemId 获取第一次组织信息失败！' })
  }
  logger.info('部门同步，查询当前部门根部门数据deptData: ' + JSON.stringify(deptData))
  const data = (deptData && deptData.length > 0) ? deptData[0] : {}
  logger.info('根部门数据' + JSON.stringify(data))
  return data.id
}

/**
 * 根据部门ID查询下一级部门信息
 * @param {string} deptId
 * @param {string} propertyType
 */
const getNextDeptList = async (deptId: string, propertyType?: string) => {
  const deptData: any = await getNextDeptDataApi(deptId)
  logger.info(`部门同步，当前部门${deptId}下，部门数据：${JSON.stringify(deptData)}`)

  const data = deptData
  const ids = data.map((item: any) => item.id).join(',')
  logger.info('部门数据' + JSON.stringify(data))
  if (data.length) { // 当下一级数据为空时,递归完成
    const deptList = await deptMapping(data, {
      departmentId: 'id',
      parentId: 'parentId',
      department: 'name',
      order: 'orderNo',
      disable: '',
      status: 'state'
    })
    await handleDeptSync(deptList)
    for (const dept of data) {
      await getNextDeptList(dept.id) // 递归调用
    }
  }
}
