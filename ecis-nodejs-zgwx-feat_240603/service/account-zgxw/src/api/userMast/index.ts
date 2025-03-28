import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { userMap } from '../../util/index'
import { logger } from '../../server'
import { getSQLSelResult } from '../common'
import { mastGetUser } from '../../model/openApi/third'
import { mastUserTotal } from './mastUser'

const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function userMastInit(ctx: Context) {
  let res
  try {
    // 获取三方用户数据
    // const time: any = moment().add('8', 'hours').format('YYYY-MM-DD HH:mm:ss')
    // const params: any = {
    //   systemCode: config.mastedata.userSysCode,
    //   gdCode: config.mastedata.userGdCode,
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
    //   msg: `获取主数据全量用户入参,params:${JSON.stringify(params)}`
    // })
    // const mastUser: any = await mastGetUser(params)
    // logger.info({
    //   msg: `获取主数据全量用户响应结果,mastUser: ${JSON.stringify(mastUser)}`
    // })
    // if (!mastUser || !mastUser.data || mastUser.data.length === 0) {
    //   throw resErrJson({ msg: '获取主数据全量用户为空。' })
    // }
    const getDataTotal: any = await axios.get('https://api.jczxw.cn/mock/11/wps/api/zgxw/userInit')
    const mastUser = getDataTotal.data
    const userList = await getUserFormat(mastUser.data)
    logger.info({ msg: `获取全量用户数据JSON-userList:${JSON.stringify(userList)}` })
    await mastUserTotal(userList)
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

/**
 *
 * @returns 中间表的全量部门数据
 */
export async function getAllDeptFromDB(): Promise<any[]> {
  const SQLResult = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_dept',
    []
  )
  return await getSQLSelResult(SQLResult)
}

async function getUserFormat(userList: any) {
  const sqlDeptList = await getAllDeptFromDB()
  for (const user of userList) {
    if (user?.dept_id) {
      const dept = []
      const deptTemp = sqlDeptList.filter(
        (sqlDept: any) => user?.dept_id === sqlDept.ori_dept_id
      )
      if (deptTemp.length !== 0) {
        for (const deptItem of deptTemp) {
          dept.push({
            ...deptItem,
            departmentId: deptItem.ori_dept_id
            // usable_status: user?.usable_status
          })
        }
        user.dept = dept
      }
    }
  }
  const userData = await userMap(userList, {
    id: 'emp_code',
    loginName: 'emp_code',
    name: 'emp_name',
    password: 'emp_name',
    status: 'usable_status', // 是否删除
    order: 'display_sort',
    dept: 'dept'
  })
  return userData
}



// 一人多部门
export async function mastMoreUser(ctx: Context) {
  let res
  try {
    const getDataTotal: any = await axios.get('https://api.jczxw.cn/mock/11/wps/api/zgxw/userMore')
    const mastUser = getDataTotal.data
    const userList = await getMoreFormat(mastUser.data)
    logger.info({ msg: `获取全量用户数据JSON-userList:${JSON.stringify(userList)}` })
    await mastUserTotal(userList)
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

async function getMoreFormat(userList: any) {
  const sqlDeptList = await getAllDeptFromDB()
  for (const user of userList) {
    if (user.sub_positioninfo.length) {
      const dept = []
      for (const group of user.sub_positioninfo) {
        const deptTemp = sqlDeptList.filter(
          (sqlDept: any) => '' + group.postion_dept_id === sqlDept.ori_dept_id
        )
        if (deptTemp.length !== 0) {
          for (const deptItem of deptTemp) {
            dept.push({
              ...deptItem,
              departmentId: deptItem.ori_dept_id,
              usable_status: group?.usable_status
            })
          }
          user.dept = dept
        }
      }
    }
  }
  const userData = await userMap(userList, {
    id: 'emp_code',
    loginName: 'emp_code',
    name: 'emp_name',
    password: 'emp_name',
    status: 'usable_status', // 是否删除
    order: 'display_sort',
    dept: 'dept'
  })
  return userData
}