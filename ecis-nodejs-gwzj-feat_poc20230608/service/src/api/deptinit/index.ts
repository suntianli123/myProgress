import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { arrToTree, deptMapping } from '../../util/index'
import { totalDeptSync } from './totalDept'
import { logger } from '../../server'
import rdsQuery from '../../util/rdsmysql'
import { getUserIdFromWechat } from '../common'
import { getAllDept } from '../../model/openApi/fjdlAPI'

const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function deptSyncTotal(ctx: Context) {
  let res
  try {
    const thirdDeptList: any = []
    await getAllDeptInfoList(1, thirdDeptList)
    logger.info(`获取到三方数据：${thirdDeptList.length}`)
    if (!thirdDeptList || thirdDeptList.length < 1) {
      logger.warn({ msg: '获取组织信息失败！' })
      ctx.status = 200
      ctx.body = resJson()
      return ctx
    }
    // const mockDept: any = await axios.get('https://api.jczxw.cn/mock/11/wps/api/gwzj/deptInit')
    // const thirdDeptList = mockDept.data.data
    // eslint-disable-next-line
    const deptDataAll = thirdDeptList.filter((item: any) => item.state == 'Y')
    const deptList = await deptMapping(deptDataAll, {
      departmentId: 'id',
      parentId: 'parentId',
      department: 'name',
      order: 'orderNo',
      disable: '',
      status: 'state'
    })
    let depts = JSON.parse(JSON.stringify(deptList))
    depts = await arrToTree(depts)
    logger.info({
      msg: 'depts的数量',
      // body: depts,
      bodydeptLength: deptList.length,
      bodyLength: depts.length,
    })
    /* 全量同步部门 */
    if (depts) {
      await totalDeptSync(depts, deptList)
    } else {
      logger.error('当前无组织架构数据！！！')
    }
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
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

// 获取所有部门
export async function getAllDeptInfoList(pageNo: any, thirdDeptList: any[]) {
  const deptsResult = await getAllDept(pageNo, 1000)
  logger.info({ deptsResult: `三方表部门信息-json：${JSON.stringify(deptsResult)}` })
  if (deptsResult.length > 0) {
    thirdDeptList.push(...deptsResult)
    // eslint-disable-next-line eqeqeq
    if (deptsResult.length == 1000) {
      pageNo++
      getAllDeptInfoList(pageNo, thirdDeptList)
    }
  }
}
