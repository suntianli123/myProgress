import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
import { resJson, resErrJson } from '../../util/msgCode'
import { arrToTree, deptMapping, treeToArr } from '../../util/index'
import { logger } from '../../server'
import { mastGetDept } from '../../model/openApi/third'
import { mastDeptTotal } from './mastDept'
const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function deptMastInit(ctx: Context) {
  let res
  try {
    // 获取三方部门数据
    logger.info({ msg: '进行部门全量同步' })
    // const time: any = moment().add('8', 'hours').format('YYYY-MM-DD HH:mm:ss')
    // const params: any = {
    //   systemCode: config.mastedata.orgSysCode,
    //   gdCode: config.mastedata.orgGdBode,
    //   pageable: false,
    //   pageIndex: 1,
    //   pageSize: 30000,
    //   conditions: {
    //     modifytime: [
    //       'and',
    //       '<',
    //       time
    //     ]
    //   }
    // }
    // logger.info({
    //   msg: `获取主数据全量部门入参，params：${JSON.stringify(params)}`
    // })
    // const mastDept: any = await mastGetDept(params)
    // logger.info({
    //   msg: `获取主数据全量部门响应结果，mastDept：${JSON.stringify(mastDept)}`
    // })
    // logger.info({
    //   msg: `获取主数据全量部门响应结果，mastDept-data：${JSON.stringify(mastDept?.data)}`
    // })
    // if (!mastDept || !mastDept.data || mastDept.data.length === 0) {
    //   throw resErrJson({ msg: '获取主数据全量部门为空。' })
    // }
    const getDataTotal: any = 
    await axios.get('https://api.jczxw.cn/mock/11/wps/api/zgxw/deptInit')
    const mastDept = getDataTotal.data
    const proDeptData = await deptMapping(mastDept.data, {
      departmentId: 'id',
      parentId: 'parent_org_code',
      department: 'org_name',
      status: 'usable_status',
      order: 'org_sort',
    })
    // eslint-disable-next-line eqeqeq
    const deptList = proDeptData.filter(item => item.departmentId != 'null')
    // 部门数据排序
    const treeList = await arrToTree(deptList)
    const arrList = await treeToArr(treeList, [])
    logger.info({
      msg: `树状结构组织长度,treeList: ${treeList.length}, 一维数组长度arrList: ${arrList.length}, arrList: ${JSON.stringify(arrList)}`
    })
    await mastDeptTotal(arrList)
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志1 */
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
