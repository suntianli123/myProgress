/* eslint-disable camelcase */
import { Context } from 'koa'
import * as fs from 'fs'
import * as path from 'path'
import {
  arrToTreeWPS,
  deptMapping,
  getAllDeptUser,
  stockDeptMapping,
  stringifyLoop,
  userMap,
  wpsDeptArrToTree
} from './../../util/index'
import config from '../../config'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson, resCheck } from '../../util/msgCode'
import { arrToTree } from '../../util/index'
import { OpenGetIdConfuseParams } from '../../../ecissdk/model/data'
import { getAllDeptWPS } from './../common/index'
import { deptsList, deptsThirdBind, putDepts } from '../../model/openApi/company'
import { getCompanyToken } from '../authToken/func'
import { currentTime } from '../../util/momentTime'
import { getAllDeptFromDB } from '../userinit'
import { getCompanyRootDepts } from '../dept/dept'
import moment = require('moment')
import { cacheData } from './func'
import { logger } from '../../ins'
import { getTotalData } from '../deptinit'

/**
 * @path
 * @param {Context} ctx
 * @returns {Promise<void>}
 */
export async function deptStock(ctx: Context): Promise<any> {
  logger.info({
    type: '存量部门数据处理逻辑'
  })
  let res: any
  try {
    const thirdDeptData: any[] = await getTotalData()
    if (!Array.isArray(thirdDeptData) || !thirdDeptData.length) {
      throw resErrJson({ msg: '获取三方数据失败。' })
    }
    let thirdDeptConvert = await deptMapping(thirdDeptData, {
      departmentId: 'id',
      parentId: 'parentid',
      department: 'name',
      order: 'order'
    })
    logger.info({
      msg: '字段转换后的部门数据量',
      data: thirdDeptConvert?.length
    })
    // 测试环境不用过滤
    // 过滤掉原始数据的根部门
    thirdDeptConvert = thirdDeptConvert.filter((item: any) => {
      return (item.departmentId !== '1' && item.parentId !== '0')
    })
    const thirdDeptTree = await arrToTree(thirdDeptConvert)
    const dataFlat: any[] = []
    /* 树形结构数据需展开成一维数组 */
    arrayFlat(thirdDeptTree, 'children', dataFlat)
    let deptList = dataFlat
    deptList.forEach((item: any) => {
      item.deptPath = item.department
    })
    // deptList = getDeptPath(deptList)
    /* 基于一维数组转tree方法拼接路径 */
    const depts = await arrToTreeWPS(deptList)
    deptList = []
    /* 再将tree展开成一维数组 */
    flatArrWPS(depts, deptList)

    await syncDeptMiddle(deptList)
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
}

/**
 * 同步部门信息到中间表
 * @param deptList 三方部门数据
 */
const syncDeptMiddle = async (deptList: any[]) => {
  logger.info(`三方部门数据: ${deptList.length}条`)
  /* 获取所有wps部门 */
  // const allDeptWPSOri = await getAllDeptWPS([])
  const rootDeptId = await getCompanyRootDepts()
  const allDeptWPSOri: any = []
  await getAllDeptUser(allDeptWPSOri, rootDeptId)
  logger.info(`wps部门数据: ${allDeptWPSOri.length}条`)
  const allDeptWPS = stockDeptMapping(allDeptWPSOri, {
    departmentId: 'dept_id',
    department: 'name',
    parentId: 'dept_pid'
  })
  logger.info({
    type: 'WPS部门字段转换后的数据量',
    data: allDeptWPS.length
  })

  for (const item of allDeptWPS) {
    const { parentId, department } = item || {}
    const path = matchPath(parentId, department, allDeptWPS)
    item.deptPath = path
  }
  const deptWPS = allDeptWPS
  logger.info({
    type: '增量前三方部门数据',
    data: deptList.length
  })
  const time = currentTime()
  // 插入中间表失败的数据
  const syncFaildList = []
  // 插入中间表
  for (const dept of deptWPS) {
    // 跳过wps根部门
    if (!dept.deptPath) {
      logger.error({
        type: '========',
        data: dept
      })
      continue
    }
    const deptTarget = deptList.find(
      origin => origin.deptPath === dept.deptPath
    )
    if (deptTarget) {
      const {
        department: ori_dept_name,
        departmentId: ori_dept_id,
        parentId: ori_dept_pid,
        order
      } = deptTarget
      logger.info({
        type: '增量部门数据同步到中间表',
        data: deptTarget
      })
      logger.info({
        type: '对应wps部门数据',
        data: dept
      })
      const { departmentId: dept_id, parentId: dept_id_pid } = dept
      /* 存中间表 */
      /* 存入中间表的是接口返回的数据 */
      const insertData = await sdkInstance.middleware.mysql.insert(
        config.dbName,
        /* 根据项目具体需求同步order排序字段 */
        'INSERT INTO middle_dept (ori_dept_id, ori_dept_name, ori_dept_pid, dept_id, dept_id_pid, dept_order, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          ori_dept_id,
          ori_dept_name,
          ori_dept_pid,
          dept_id,
          dept_id_pid,
          order,
          time,
          time,
          'system',
          'system',
          0
        ]
      )
      logger.info({
        msg: `创建部门-中间表:${dept.departmentId}`
      })
      /* 返回结果判断 */
      if (insertData.result !== 'ok') {
        logger.error({
          type: '插入部门中间表失败',
          data: insertData
        })
        continue
      }
    } else {
      syncFaildList.push(dept.deptPath)
    }
  }
  const thirdFailedList = []
  for (const thirdDept of deptList) {
    const deptTarget = deptWPS.find(
      (origin: any) => origin.deptPath === thirdDept.deptPath
    )
    if (!deptTarget) {
      thirdFailedList.push(thirdDept.deptPath)
    }
  }
  if (syncFaildList.length > 0) {
    logger.error({
      type: '同步中间表失败的WPS部门路径',
      data: syncFaildList
    })
    logger.error(`同步中间表失败${syncFaildList.length}条`)
  }
  if (thirdFailedList.length > 0) {
    logger.error({
      type: '同步中间表失败的三方部门路径',
      data: thirdFailedList
    })
  }
}

/**
 * 关联用户三方id并同步中间表
 * 关于 sdkInstance.service.wpsopen.getIdConfuse
 * 1. 更新ecissdk和src/api/grpc/index.ts
 * 2. 在服务器上运行以下命令
 * comp_id,ak,sk 替换对应应用的appID, appKey
 * 加密用户的comp_uid获得company_uid
 * 加密部门id得到部门的wpsid
 * @param userList
 */
const userUnionAndMiddle = async (userList: any[]) => {
  const time = currentTime()
  const companyToken = await getCompanyToken()
  const sqlDeptList = await getAllDeptFromDB()
  for (const user of userList) {
    let companyUid: string
    const params: OpenGetIdConfuseParams = {
      queryStr: `raw_text=${user.id}`
    }
    // 加密comp_uid获得company_uid
    const result = await sdkInstance.service.wpsopen.getIdConfuse(params)
    if (
      result &&
      result.result === 'ok' &&
      result.data &&
      result.data.confuse_result
    ) {
      companyUid = result.data.confuse_result
    } else {
      logger.error(`加密用户ID失败! ${user.id} errMsg: ${result.msg}`)
      continue
    }
    if (user.unionId) {
      logger.info(
        `用户已同步: company_uid: ${companyUid} unionId: ${user.unionId}`
      )
    } else {
      // 关联三方id
      const thirdBindResult = await deptsThirdBind(companyToken, companyUid, {
        third_union_id: user.loginName
      })
      if (thirdBindResult.result !== 0) {
        logger.info(
          `同步企业成员union_id失败! company_uid: ${companyUid} unionId: ${user.unionId
          } result: ${stringifyLoop(thirdBindResult)}`
        )
        continue
      }
    }
    // 同步中间表
    const insertMiddleUser = await sdkInstance.middleware.mysql.insert(
      config.dbName,
      'INSERT INTO middle_users (user_id, third_id, nick_name, company_uid, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [user.loginName, user.third_id, user.name, companyUid, time, time, 'admin', 'admin', 0]
    )
    logger.info({ msg: `同步存量用户-中间表:${user.loginName} ${companyUid}` })
    /* 返回结果判断 */
    if (insertMiddleUser.result !== 'ok') {
      throw resErrJson({ msg: '新增存量用户中间表失败。' })
    }
    // 同步部门用户关联表
    for (const dept of user.dept) {
      const params: OpenGetIdConfuseParams = {
        queryStr: `raw_text=${dept.id}`
      }
      // 加密depts.id获得dept_id
      const result = await sdkInstance.service.wpsopen.getIdConfuse(params)
      if (
        result &&
        result.result === 'ok' &&
        result.data &&
        result.data.confuse_result
      ) {
        const deptId = result.data.confuse_result
        const sqlDept = sqlDeptList.find(
          (itemSql: any) => itemSql.dept_id === deptId
        )
        if (!sqlDept) {
          logger.error(`部门数据不存在${dept.abs_path}`)
        } else {
          /* 新增用户、部门关联表 */
          const insertMiddleUserDept =
            await sdkInstance.middleware.mysql.insert(
              config.dbName,
              'INSERT INTO middle_user_dept (user_id, company_uid, ori_dept_id, dept_id, user_order, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [
                user.loginName,
                companyUid,
                sqlDept.ori_dept_id,
                sqlDept.dept_id,
                0,
                time,
                time,
                'admin',
                'admin',
                0
              ]
            )
          logger.info({
            msg: `新增用户、部门关联表－中间表:${user.company_uid}`
          })
          /* 返回结果判断 */
          if (insertMiddleUserDept.result !== 'ok') {
            throw resErrJson({ msg: '新增用户关联表失败。' })
          }
        }
      } else {
        // 加密失败
        throw Error(`加密部门ID失败! ${dept.id} errMsg: ${result.msg}`)
      }
    }
  }
}

const flatArrWPS = (data: any[], target: any[]) => {
  // const _data = JSON.parse(JSON.stringify(data))
  data.forEach((_d: any) => {
    target.push(_d)
    if (Array.isArray(_d.children) && _d.children.length > 0) {
      flatArrWPS(_d.children, target)
    }
    delete _d.children
  })
}

export function arrayFlat(data: any[], childrenKey: string, flat: any[]) {
  data.forEach(el => {
    if (Array.isArray(el[childrenKey])) {
      const elCp = JSON.parse(JSON.stringify(el))
      delete elCp[childrenKey]
      flat.push(elCp)
      arrayFlat(el[childrenKey], childrenKey, flat)
    } else {
      flat.push(el)
    }
  })
}

function matchPath(parentOrgId: string, path: string, orgList: any) {
  const parentOrg = orgList.find((org: any) => org.departmentId === parentOrgId)
  if (parentOrg) {
    path = parentOrg.deptPath + '/' + path
    matchPath(parentOrg.parentId, path, orgList)
  }
  return path
}
