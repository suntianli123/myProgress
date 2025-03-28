import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { arrToTree, deptMapping } from '../../util/index'
import { totalDeptSync } from './totalDept'
import { getAccessToken } from '../common'
import { logger } from '../../ins'
const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function deptSyncTotal(ctx?: Context) {
  let res
  try {
    /* 部门信息 */
    const deptData: any = await getTotalData()
    let deptList = await deptMapping(deptData, {
      departmentId: 'id',
      parentId: 'parentid',
      department: 'name',
      order: 'order'
    })
    logger.info({
      msg: '字段转换后的部门数据量',
      data: deptList?.length
    })
    // 过滤掉原始数据的根部门
    deptList = deptList.filter((item: any) => {
      return (item.departmentId !== '20000270' && item.parentId !== '1')
    })
    // 测试时使用
    // deptList = deptList.filter((item: any) => {
    //   return (item.departmentId !== '1' && item.parentId !== '0')
    // })
    const cpThirdDepts = JSON.parse(JSON.stringify(deptList))
    const depts = await arrToTree(deptList)
    logger.info({
      type: '部门树数量',
      data: depts.length
    })
    // /* 全量同步部门 */
    await totalDeptSync(depts, cpThirdDepts)
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  if (ctx) {
    ctx.status = 200
    /* 加密返回数据 */
    ctx.body = res
    // ctx.body = aesEncryption(res)
    return ctx
  }
}
export async function getTotalData() {
  logger.info({
    msg: '获取三方部门'
  })
  const accessToken = await getAccessToken()
  const thirdDeptUrl = `${config.third.wechat.domain}/cgi-bin/department/list?access_token=${accessToken}&no_fetch_child=0`
  const deptRes = await axios.get(thirdDeptUrl)
  const { errcode, department } = deptRes?.data || {}
  logger.info({
    msg: '三方部门数据量',
    data: department?.length
  })
  let res: any[] = []
  if (errcode === 0) {
    res = department
  } else {
    logger.error({
      msg: '获取三方部门失败，返回值',
      data: deptRes?.data
    })
  }
  return res
}
