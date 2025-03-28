import { Context } from 'koa'
import { resErrJson } from '../../util/msgCode'
import { arrToTree, deptMapping, treeToArr, userMap } from '../../util/index'
import { logger } from '../../server'
import { mastDeptSync } from './mastDept'
import { getAllDeptFromDB } from '../user'
import { mastUserSync } from './mastUser'
import axios from 'axios'
import config from '../../config'
import { sdkInstance } from '../../grpc/sdk'
const moment = require('moment')

// 主数据更新订阅接收接口
export async function mastUpdataSub(ctx: Context) {
  let res: any
  try {
    logger.info({ message: `订阅参数,query: ${JSON.stringify(ctx?.request?.body)}` })
    // const { masterData, mdType } = ctx.request.body
    // if (!masterData.length || !mdType) {
    //   throw Error('未获取更新方式，更新失败')
    // }
    // logger.info({ msg: `订阅方式:${mdType}` })
    // logger.info({ msg: `订阅数据,masterData: ${JSON.stringify(masterData)}` })
    // // eslint-disable-next-line eqeqeq
    // const thirdData = JSON.parse(masterData)
    // logger.info({ msg: `转义后订阅数据长度,updataData: ${thirdData.length}` })
    

    const getDataTotal: any = await axios.get('https://api.jczxw.cn/mock/11/wps/api/zgxw/user')
    const mdType = getDataTotal.data.mdType
    const thirdData = getDataTotal.data.masterData

    const defeatsList: any = [] // 不存在云文档中无法同步的数据
    const mastUpdataList: any = [] // 可以进行同步的数组
    // 筛选不存在云文档中的数据
    for (const thirdItem of thirdData) {
      await handleFail(thirdItem, mastUpdataList, defeatsList, mdType)
    }

    if (mdType === 'empbaseinfo') {
      logger.info({ msg: '进入用户增量同步' })
      const userList = await getUserFormat(mastUpdataList)
      logger.info({ msg: `用户组织后数据, userList: ${JSON.stringify(userList)}` })
      await mastUserSync(userList)
    } else if (mdType === 'orginfo') {
      logger.info({ msg: '进入部门增量同步' })
      const proDeptData = await deptMapping(mastUpdataList, {
        departmentId: 'id',
        parentId: 'parent_org_code',
        department: 'org_name',
        status: 'usable_status',
        order: 'org_sort',
      })
      // 部门数据排序
      const treeList = await arrToTree(proDeptData)
      const arrList = await treeToArr(treeList, [])
      logger.info({ msg: `部门组织后数据, arrList: ${JSON.stringify(arrList)}` })
      await mastDeptSync(arrList)
    }
    logger.info({ msg: `同步失败的数组, ${defeatsList.length}个, mdMapping: ${JSON.stringify(defeatsList)}` })
    // 组织响应结果
    const mdMapping: any[] = []
    await responseDept(mdMapping, mastUpdataList, mdType)
    logger.info({ msg: `订阅通知响应结果, mdMapping: ${JSON.stringify(mdMapping)}` })
    res = {
      success: true,
      message: '消费系统消费这批数据成功',
      mdMapping: mdMapping,
    }
    if (defeatsList.length) {
      const failList: any[] = []
      await responsefail(failList, defeatsList, mdType)
      res.message = `消费系统消费这批数据完成，有${defeatsList.length}条数据消费失败`
      res.failMapping = failList
    }
    ctx.status = 200
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = {
      success: false,
      message: '消费系统消费这批数据失败'
    }
    ctx.status = 9999
  }
  ctx.body = res
  return ctx
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

export async function responseDept(mdMapping: any, updataData: any, mdType: any) {
  if (!updataData || !updataData.length) {
    logger.error({ msg: '三方数据为空' })
    return
  }
  for (const masterItem of updataData) {
    const mdItem = {
      mdmCode: masterItem.emp_code,
      entityCode: mdType,
      busiDataId: masterItem.id,
      message: '该条主数据消费成功',
      success: true
    }
    mdMapping.push(mdItem)
  }
}

export async function responsefail(mdMapping: any, updataData: any, mdType: any) {
  if (!updataData || !updataData.length) {
    logger.error({ msg: '三方数据为空' })
    return
  }
  for (const masterItem of updataData) {
    const mdItem = {
      mdmCode: masterItem.emp_code,
      entityCode: mdType,
      busiDataId: masterItem.id,
      message: '该条主数据消费失败',
      success: false
    }
    mdMapping.push(mdItem)
  }
}

// thirdData:三方数据；mastUpdataList：处理后可以进行同步的数据；defeatsList：处理后不能同步的数据；
// mdType: 类型（empbaseinfo：用户，orginfo：部门）
export async function handleFail(thirdItem: any, mastUpdataList: any, defeatsList: any, mdType: any) {
  if (mdType === 'empbaseinfo') {
    const SQLuserResult = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_users WHERE is_delete !=1 AND user_id=?',
      [thirdItem.emp_code]
    )
    const userSql =
      SQLuserResult.data &&
        SQLuserResult.data.rows &&
          Array.isArray(SQLuserResult.data.rows)
        ? SQLuserResult.data.rows
        : []
    // eslint-disable-next-line eqeqeq
    if (userSql.length === 0 && thirdItem.usable_status != '1') {
      defeatsList.push(thirdItem)
    } else {
      mastUpdataList.push(thirdItem)
    }
  } else if (mdType === 'orginfo') {
    const SQLDeptResult: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_dept WHERE ori_dept_id=?',
      [thirdItem.id]
    )
    const deptSql =
      SQLDeptResult.data &&
      SQLDeptResult.data.rows &&
      Array.isArray(SQLDeptResult.data.rows)
        ? SQLDeptResult.data.rows
        : []
    // eslint-disable-next-line eqeqeq
    if (deptSql.length === 0 && thirdItem.usable_status != '1') {
      defeatsList.push(thirdItem)
    } else {
      mastUpdataList.push(thirdItem)
    }
  }
}
