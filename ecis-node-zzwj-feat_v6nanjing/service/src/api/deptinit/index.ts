import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { arrToTree, deptMapping, treeToArr } from '../../util/index'
import { totalDeptSync } from './totalDept'
import { logger } from '../../server'
import { getDeptTotal } from '../../model/openApi/third'
const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function deptSyncTotal(ctx: Context) {
  let res
  try {
    const param = { pageNum: 0, pageSize: 0 }
    logger.info({ msg: `部门入参系统5:${JSON.stringify(param)}` })
    const getTotalData: any = await getDeptTotal(param)
    // const getTotalData: any = await axios.get('https://api.jczxw.cn/mock/11/wps/api/zzwj/deptInit')
    logger.info({ msg: `获取部门所以数据:${JSON.stringify(getTotalData.data)}` })
    if (!getTotalData || !getTotalData.data || !getTotalData.data.data || !getTotalData.data.data.list) {
      throw resErrJson({ msg: '获取三方部门数据失败。' })
    }
    const addTop: any = {
      orgId: 'root',
      orgName: '全部',
      parentOrgId: 'allPidroot',
      sort: 1,
      useFlag: 1,
    }
    getTotalData.data.data.list.unshift(addTop)

    const deptList = await deptMapping(getTotalData.data.data.list, {
      departmentId: 'orgId',
      parentId: 'parentOrgId',
      department: 'orgName',
      status: 'useFlag',
      order: 'order'
    })

    // 处理只要部门状态orgStatus为1
    // const deptList = proDeptData.filter((item: any) => item.status === '1')
    const treeList = await arrToTree(deptList)
    const arrList = await treeToArr(treeList, [])
    arrList.forEach((item: any) => {
      const pidData = arrList.filter((secItem: any) => secItem.departmentId === item.parentId)
      logger.info({ msg: `父部门信息,pidData: ${JSON.stringify(pidData)}` })
      if (pidData.length === 0) {
        item.org_dept_second_id = `${item.department}:_${item.departmentId}`
      } else {
        item.org_dept_second_id = `${pidData[0].org_dept_second_id};_${item.department}:_${item.departmentId}`
      }
    })

    let depts = JSON.parse(JSON.stringify(arrList))
    depts = await arrToTree(depts)

    /* 全量同步部门 */
    await totalDeptSync(depts, arrList)
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
