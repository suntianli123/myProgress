import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { logger } from '../../server'
import { getCompanyRootDepts } from '../dept/dept'
import { getAllDeptUser, getUserAll } from '../common/func'
import { mastGetUser } from '../../model/openApi/third'
const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function userContrastSync(ctx: Context) {
  let res
  try {
    /* 查询中间表全部用户 */
    const SQLResult = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_users WHERE is_delete !=1',
      []
    )
    const SQLUserList =
        SQLResult.data && SQLResult.data.rows && Array.isArray(SQLResult.data.rows)
          ? SQLResult.data.rows
          : []
    if (!SQLUserList || SQLUserList.length === 0) {
      logger.warn({ msg: '查询用户中间表失败' })
      return
    }
    // wps云文档中手动创建的用户
    const sqlNotUserList: any[] = []
    await wpsUserContrast(sqlNotUserList, SQLUserList)
    // sql表中比主数据多出的用户列表
    const mastNotUserList: any[] = []
    await mastUserContrast(mastNotUserList, SQLUserList)
    const resultArr = {
      sqlNotUserList: sqlNotUserList,
      mastNotUserList: mastNotUserList
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

// wps云文档用户和表里数据对比
export async function wpsUserContrast(sqlNotUser: any, sqlList: any) {
  // 获取根用户id
  const wpsUserList: any = []
  await getUserAll(wpsUserList, 0)
  // wps云文档对比sql表对比，比sql表中多出的用户列表
  for (const wpsItem of wpsUserList) {
    // eslint-disable-next-line eqeqeq
    const sqlUser = sqlList.filter((sqlItem: any) => sqlItem.company_uid == wpsItem.company_uid)
    if (!sqlUser.length) {
      // 对比sql表中，wps云文档中手动创建的用户
      sqlNotUser.push(wpsItem)
    }
  }
}
// 主数据用户和表里数据对比
export async function mastUserContrast(mastNotUser: any, sqlList: any) {
  const time: any = moment().add('8', 'hours').format('YYYY-MM-DD HH:mm:ss')
  const params: any = {
    systemCode: config.mastedata.userSysCode,
    gdCode: config.mastedata.userGdCode,
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
    msg: `获取主数据全量用户入参,params:${JSON.stringify(params)}`
  })
  const mastUser: any = await mastGetUser(params)
  logger.info({
    msg: `获取主数据全量用户响应结果,mastUser: ${JSON.stringify(mastUser)}`
  })
  if (!mastUser || !mastUser.data || mastUser.data.length === 0) {
    throw resErrJson({ msg: '获取主数据全量用户为空。' })
  }
  const mastUserList = mastUser.data

  // const getDataTotal: any = await axios.get('http://172.21.131.102:3000/mock/11/WPS/WPS/zgxw/userMaster')
  // const mastUserList = getDataTotal.data.data
  // 主数据对比sql表对比，比主数据多出的用户列表
  for (const sqlItem of sqlList) {
    // eslint-disable-next-line eqeqeq
    const mastUser = mastUserList.filter((mastItem: any) => mastItem.emp_code == sqlItem.user_id)
    if (!mastUser.length) {
      // sql表中比主数据多出的用户
      mastNotUser.push(sqlItem)
    }
  }
}
