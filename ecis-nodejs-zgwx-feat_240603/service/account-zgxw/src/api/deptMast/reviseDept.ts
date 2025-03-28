import { Context } from 'koa'
import axios from 'axios'
import config from '../../config'
// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import { logger } from '../../server'
import { getThirdOrgs } from '../../model/openApi/third'
import { currentTime } from '../../util/momentTime'
import { getOnce32 } from '../common'
import { sha256 } from 'js-sha256'
import { fileWriteStream, loadDataFromExcel, mapDataExcelResult } from '../excel'
import * as path from 'path'
import * as fs from 'fs'
const moment = require('moment')

/**
 * @path /api/userinfo
 * @param {object} Context
 * @returns {object}
 */
export async function reviseDeptSync(ctx: Context) {
  let res
  try {
    logger.info({ msg: '进行校正部门id' })
    // 接收文件 返回文件路径
    // const fileResource = await fileWriteStream(ctx)
    let fileResource = path.join(__dirname, '../../public/temporary/202305221407.xls')
    if (!fs.existsSync(fileResource)) {
      fileResource = path.join(__dirname, '../../public/temporary/202305221407.xlsx')
    }
    if (!fs.existsSync(fileResource)) {
      throw Error('excel文件不存在')
    }
    // 解析excel
    const excelData = loadDataFromExcel(fileResource, true)
    // 映射字段
    const mapData = mapDataExcelResult(excelData, [
      {
        sheetName: 'IAM与HR部门对应',
        option: {
          id: 'IAM_ID',
          name: '组织名称',
          path: '全路径',
          result: '匹配结果',
          hr_id: 'HR_ID',
          hr_name: 'HR组织名称',
          hr_pid: 'HR上级组织ID'
        }
      }
    ])
    const { IAM与HR部门对应: thirdDeptList } = mapData
    const deptList = thirdDeptList.filter((dept: any) => dept.hr_id && dept.id)
    // 获取三方部门数据
    // await getOrgListFun(0, thirdDeptList)
    // if (!thirdDeptList || thirdDeptList?.length === 0) {
    //   throw resErrJson({ msg: '获取三方全量部门数据失败' })
    // }

    const notReviseDept: any[] = []
    // 校正三方id
    await checkDeptId(deptList, notReviseDept)
    // 表中没有校正三方id的数据
    const resultArr = {
      notReviseDept: notReviseDept,
      thirdDeptList,
      deptList
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

// 获取三方数据
export async function getOrgListFun(syncNum: any, orgArr: any) {
  const pwd = config.third.clientSecret
  const appKey = config.third.clientId
  const once = await getOnce32()
  const signMethod = 'SHA-256'
  const ts = moment().format('x')
  const signInfo = '' + pwd + ':' + 'appKey=' + appKey + '&once=' + once + '&signMethod=' + signMethod + '&syncSequence=' + syncNum + '&ts=' + ts + ':' + pwd
  logger.info({ msg: `全量部门signInfo参数拼接:${signInfo}` })
  const signData = sha256(signInfo)
  logger.info({ msg: `全量部门sha256:${signData}` })
  const getTotalData: any = await getThirdOrgs(syncNum, appKey, once, signMethod, ts, signData)
  if (getTotalData && getTotalData?.result && getTotalData?.result?.length > 0) {
    syncNum = getTotalData?.result[getTotalData?.result.length - 1]?.syncSequence
    orgArr.push(...getTotalData?.result)
    // eslint-disable-next-line eqeqeq
    if (getTotalData?.result?.length == 500) {
      await getOrgListFun(syncNum, orgArr)
    }
  } else if (getTotalData && getTotalData?.result && getTotalData?.result.length === 0) {
    logger.warn({
      msg: `三方接口全量部门为空,signInfo: ${signInfo}, 全量部门sha256: ${signData}}`
    })
  } else {
    logger.warn({
      msg: `三方接口全量部门异常,signInfo: ${signInfo}, 全量部门sha256: ${signData}}`
    })
  }
}

// 校正三方id
export async function checkDeptId(thirdList: any, notReviseDept: any): Promise<any> {
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
  const time = await currentTime()
  for (const sqlItem of SQLDeptList) {
    // 修改部门表中ori_dept_id
    /* {
          id: 'IAM_ID',
          name: '组织名称',
          path: '全路径',
          result: '匹配结果',
          hr_id: 'HR_ID',
          hr_name: 'HR组织名称',
          hr_pid: 'HR上级组织ID'
        } */
    // eslint-disable-next-line eqeqeq
    const thirdDept = thirdList.filter((thirdItem: any) => thirdItem.id == sqlItem.ori_dept_id)
    // 在表中没有找到此部门
    if (!thirdDept.length) {
      logger.info({ msg: `在表中没有找到此部门,sqlItem:${JSON.stringify(sqlItem)}` })
      notReviseDept.push(sqlItem)
      continue
    }
    /* 更新中间表，替换部门id */
    const changeData = await sdkInstance.middleware.mysql.update(
      config.dbName,
      'UPDATE middle_dept SET ori_dept_id=?, update_time=? WHERE is_delete=0 AND ori_dept_id=?',
      [thirdDept[0].hr_id, time, sqlItem.ori_dept_id]
    )
    logger.info({ msg: `修改部门-中间表:${sqlItem.ori_dept_id}` })
    /* 如果错误，抛出错误 */
    if (changeData.result !== 'ok') {
      logger.warn(`替换部门ori_dept_id-中间表失败,thirdDept: ${JSON.stringify(thirdDept)},sqlItem: ${JSON.stringify(sqlItem)},changeData: ${JSON.stringify(changeData)}`)
    }

    // 修改部门表中ori_dept_pid,先获取当前部门的子部门列表
    // eslint-disable-next-line eqeqeq
    const pidSQLResult: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_dept WHERE is_delete=0 and ori_dept_pid=?',
      [sqlItem.ori_dept_id]
    )
    const pidSqlDeptList = pidSQLResult.data && pidSQLResult.data.rows &&
      Array.isArray(pidSQLResult.data.rows)
      ? pidSQLResult.data.rows
      : []
    if (!pidSqlDeptList.length) {
      logger.info({ msg: `子部门查询为空,sqlItem: ${JSON.stringify(sqlItem)}` })
      continue
    }

    for (const pidItem of pidSqlDeptList) {
      /* 更新中间表，替换子部门的ori_dept_pid */
      const changePid = await sdkInstance.middleware.mysql.update(
        config.dbName,
        'UPDATE middle_dept SET ori_dept_pid=?, update_time=? WHERE is_delete=0 AND ori_dept_id=?',
        [thirdDept[0].hr_id, time, pidItem.ori_dept_id]
      )
      logger.info({ msg: `修改子部门-中间表:${pidItem.ori_dept_id}` })
      /* 如果错误，抛出错误 */
      if (changePid.result !== 'ok') {
        logger.info(`替换子部门的ori_dept_pid-中间表失败,pidItem: ${JSON.stringify(pidItem)},changePid: ${JSON.stringify(changePid)}`)
      }
    }
  }

  // 更新用户部门关联表中部门id
  /* 查询中间表所有部门 */
  const SQLUserDeptResult = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_user_dept WHERE is_delete !=1',
    []
  )
  const SQLUserDeptList =
    SQLUserDeptResult.data && SQLUserDeptResult.data.rows && Array.isArray(SQLUserDeptResult.data.rows)
      ? SQLUserDeptResult.data.rows
      : []
  if (!SQLDeptList || SQLDeptList.length === 0) {
    logger.warn({ msg: '查询用户部门中间表失败' })
    return
  }
  for (const userDept of SQLUserDeptList) {
    // 找到三方数据中的部门信息
    // eslint-disable-next-line eqeqeq
    const thirdUserDept = thirdList.filter((thirdItem: any) => thirdItem.id == userDept.ori_dept_id)
    if (!thirdUserDept.length) {
      logger.info({ msg: `用户部门关联表查询失败,userDept: ${JSON.stringify(userDept)}` })
      continue
    }
    /* 更新中间表，替换部门id */
    const changeUserDept = await sdkInstance.middleware.mysql.update(
      config.dbName,
      'UPDATE middle_user_dept SET ori_dept_id=?, update_time=? WHERE is_delete=0 AND ori_dept_id=?',
      [thirdUserDept[0].hr_id, time, thirdUserDept[0].id]
    )
    logger.info({ msg: `修改部门-中间表:${thirdUserDept[0].id}` })
    /* 如果错误，抛出错误 */
    if (changeUserDept.result !== 'ok') {
      logger.warn(`替换部门ori_dept_id-用户部门中间表失败,thirdUserDept: ${JSON.stringify(thirdUserDept)},changeUserDept: ${JSON.stringify(changeUserDept)}`)
    }
  }
}
