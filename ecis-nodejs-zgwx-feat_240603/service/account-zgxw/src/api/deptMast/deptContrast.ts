import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { logger } from '../../server'
import { getCompanyRootDepts } from '../dept/dept'
import { getAllDeptUser } from '../common/func'
import { mastGetDept } from '../../model/openApi/third'
const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function deptContrastSync(ctx: Context) {
  let res
  try {
    /* 查询中间表所有部门 */
    const SQLResult = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_dept WHERE is_delete !=1',
      []
    )
    const SQLDeptList =
        SQLResult.data && SQLResult.data.rows && Array.isArray(SQLResult.data.rows)
          ? SQLResult.data.rows
          : []
    if (!SQLDeptList || SQLDeptList.length === 0) {
      logger.warn({ msg: '查询部门中间表失败' })
      return
    }
    // wps云文档中手动创建的部门
    const sqlNotDeptList: any[] = []
    await wpsDeptContrast(sqlNotDeptList, SQLDeptList)
    // sql表中比主数据多出的部门列表
    const mastNotDeptList: any[] = []
    await mastDeptContrast(mastNotDeptList, SQLDeptList)
    const resultArr = {
      sqlNotDeptList: sqlNotDeptList,
      mastNotDeptList: mastNotDeptList
    }
    res = resultArr
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

// wps云文档部门和表里数据对比
export async function wpsDeptContrast(sqlNotDept: any, sqlList: any) {
  // 获取根部门id
  const rootDeptId = await getCompanyRootDepts()
  const wpsDeptList: any = []
  // 获取wps全部部门
  await getAllDeptUser(wpsDeptList, rootDeptId)
  // wps云文档对比sql表对比，比sql表中多出的部门列表
  for (const wpsItem of wpsDeptList) {
    // eslint-disable-next-line eqeqeq
    const sqlDept = sqlList.filter((sqlItem: any) => sqlItem.dept_id == wpsItem.dept_id)
    if (!sqlDept.length) {
      // 对比sql表中，wps云文档中手动创建的部门
      sqlNotDept.push(wpsItem)
    }
  }
}
// 主数据部门和表里数据对比
export async function mastDeptContrast(mastNotDept: any, sqlList: any) {
  const time: any = moment().add('8', 'hours').format('YYYY-MM-DD HH:mm:ss')
  const params: any = {
    systemCode: config.mastedata.orgSysCode,
    gdCode: config.mastedata.orgGdBode,
    pageable: false,
    pageIndex: 1,
    pageSize: 30000,
    conditions: {
      modifytime: [
        'and',
        '<',
        time
      ]
    }
  }
  logger.info({
    msg: `获取主数据全量部门入参，params：${JSON.stringify(params)}`
  })
  const mastDept: any = await mastGetDept(params)
  logger.info({
    msg: `获取主数据全量部门响应结果，mastDept：${JSON.stringify(mastDept)}`
  })
  logger.info({
    msg: `获取主数据全量部门响应结果，mastDept-data：${JSON.stringify(mastDept?.data)}`
  })
  if (!mastDept || !mastDept.data || mastDept.data.length === 0) {
    throw resErrJson({ msg: '获取主数据全量部门为空。' })
  }
  const mastDeptList = mastDept.data


  // const getDataTotal: any = await axios.get('http://172.21.131.102:3000/mock/11/WPS/WPS/zgxw/deptMaster')
  // const mastDeptList = getDataTotal.data.data
  // 主数据对比sql表对比，比主数据多出的部门列表
  for (const sqlItem of sqlList) {
    // eslint-disable-next-line eqeqeq
    const mastDept = mastDeptList.filter((mastItem: any) => mastItem.id == sqlItem.ori_dept_id)
    if (!mastDept.length) {
      // sql表中比主数据多出的部门
      mastNotDept.push(sqlItem)
    }
  }
}
