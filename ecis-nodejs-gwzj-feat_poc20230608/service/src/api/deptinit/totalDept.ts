// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import config from '../../config'
import { resJson, resErrJson, resCheck } from '../../util/msgCode'
import {
  depts,
  putDepts,
  delDepts,
  deptsList,
  usersDelCompany
} from '../../model/openApi/company'
import { getCompanyToken } from '../authToken/func'
import { currentTime } from '../../util/momentTime'
import { logger } from '../../server'
import { getSQLSelResult } from '../common'
import { getAllDeptFromDB } from '../user'

interface checkNeedHandle {
  insertList: any[]
  updateList: any[]
  deleteList: any[]
}

/**
 * @name  部门同步
 * @param {Array} deptList 第三方全量Tree结构部门列表
 * @returns {object} object
 */
export async function totalDeptSync(deptList: any[], deptListOrigin: any[]): Promise<any> {
  /* 递归同步部门 */
  await handleRecursionDeptSync(deptList, deptListOrigin)
  return resJson()
}

/* 递归同步部门 */
async function handleRecursionDeptSync(deptList: any[], deptListOrigin: any[]): Promise<any> {
  /* 获取表里部门数据 */
  const SQLResult: any = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_dept WHERE is_delete=0',
    []
  )
  const SQLDeptList =
    SQLResult.data && SQLResult.data.rows && Array.isArray(SQLResult.data.rows)
      ? SQLResult.data.rows
      : []
  /* 同步根部门 */
  // eslint-disable-next-line eqeqeq
  const isRootList = deptList.filter((dept: any) => `${dept.parentId}` == `${config.department.parentId}`)
  if (isRootList && isRootList.length > 0) {
    logger.info('当前同步根部门')
    /* 获取wps根部门 */
    for (const dept of isRootList) {
      const sqlDeptExist: any = await sdkInstance.middleware.mysql.select(
        config.dbName,
        'SELECT * FROM middle_dept WHERE ori_dept_id=?',
        [dept.departmentId]
      )
      const existResult =
      sqlDeptExist.data && sqlDeptExist.data.rows && Array.isArray(sqlDeptExist.data.rows)
        ? sqlDeptExist.data.rows
        : []
      // eslint-disable-next-line eqeqeq
      if (existResult.length == 0) {
        const rootDeptId = await getCompanyRootDepts()
        logger.info({
          msg: `同步根部门:${JSON.stringify(dept)}, rootDeptId: ${rootDeptId}`
        })
        /* 插入根部门 */
        await handleDeptInsert([{ ...dept, dept_id_pid: rootDeptId }])
      }
    }
  }
  logger.info('根部门同步完成')
  // if (!Array.isArray(SQLDeptList) || !SQLDeptList.length) {
  //   throw Error('数据错误,当前父部门不存在')
  // }
  /* 对比差异 */
  const diff = await handleCheckNeedHandle(deptList, SQLDeptList, deptListOrigin)
  /* 删除 */
  diff.deleteList &&
    diff.deleteList.length !== 0 &&
    (await handleDeptDelete(diff.deleteList))
  /* 新增 */
  diff.insertList &&
    diff.insertList.length !== 0 &&
    (await handleDeptInsert(diff.insertList))
  /* 更新 */
  diff.updateList &&
    diff.updateList.length !== 0 &&
    (await handleDeptUpdate(diff.updateList))
  for (const dept of deptList) {
    /*
      如果三方数据直接将子部门全部删除，导致children为空，这里递归就无法进入
      所以需要查询中间表部门进一步确认是否有要删除的子部门
    */
    if (dept && dept.children && dept.children.length > 0) {
      // 如果存在子部门 走递归
      await handleRecursionDeptSync(dept.children, deptListOrigin)
    } else {
      // 确认中间表是否有子部门存在
      const SQLDeptResult: any = await sdkInstance.middleware.mysql.select(
        config.dbName,
        'SELECT * FROM middle_dept WHERE ori_dept_pid=?',
        [dept.departmentId]
      )
      logger.info({
        msg: `获取该部门的子部门:${dept.departmentId}`
      })
      const vChildDepts = await getSQLSelResult(SQLDeptResult)
      if (vChildDepts.length > 0) {
        const moveList = []
        const deleteList = []
        for (const child of vChildDepts) {
          /**
           * deptListOrigin：字段映射后、处理成tree前的三方数据
           * 判断三方数据是否存在此部门，不存在 -> 删除，存在 -> 移动部门
           */
          const isExist = deptListOrigin.find(
            dept => dept.departmentId === child.ori_dept_id
          )
          if (!isExist) {
            deleteList.push(child)
          } else {
            const parentDept = SQLDeptList.find(
              (sqlDept: any) => isExist.parentId === sqlDept.ori_dept_id
            )
            if (parentDept && parentDept?.dept_id) {
              moveList.push({
                ...child,
                department: isExist.department,
                ori_dept_pid: isExist.parentId,
                _dept_pid: parentDept.dept_id
              })
            }
          }
        }
        moveList.length && (await handleDeptUpdate(moveList))
        deleteList.length && (await handleDeptDelete(deleteList))
      }
    }
  }
}

/* 对比差异 */
async function handleCheckNeedHandle(
  deptList: any[],
  SQLDeptList: any[],
  deptListOrigin: any[]
): Promise<checkNeedHandle> {
  if (!Array.isArray(deptList)) deptList = []
  if (!Array.isArray(SQLDeptList)) SQLDeptList = []

  /* 获取当前部门列表  部门id集合 */
  const ids = deptList.map((dept: any) => dept.parentId)
  /* 获取表里部门数据 */
  const curDeptSQLResult: any = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_dept WHERE is_delete=0 and ori_dept_pid IN(?)',
    [ids]
  )
  const curSQLDeptList = await getSQLSelResult(curDeptSQLResult)
  /* 新增 */
  const insertList: any[] = []
  /* 删除 */
  const deleteList: any[] = []
  /* 更新 */
  const updateList: any[] = []
  /* 对比出新增的数据 */
  for (const dept of deptList) {
    logger.info({
      msg: `第三方全量部门-待同步-单个部门:${JSON.stringify(dept)}`
    })
    /* 先判断是否在中间表 */
    const isNeedAdd = curSQLDeptList.some(
      // eslint-disable-next-line eqeqeq
      (sqlDept: any) => dept.departmentId == sqlDept.ori_dept_id
    )
    /* 再查找父级的中间表数据得到父级 WPSID 来创建当前部门 */
    const isNeedAddParent = SQLDeptList.filter(
      // eslint-disable-next-line eqeqeq
      (sqlDept: any) => sqlDept.ori_dept_id == dept.parentId
    )
    if (!isNeedAdd && isNeedAddParent.length !== 0) {
      const allIsNeedAdd = SQLDeptList.filter(
        // eslint-disable-next-line eqeqeq
        (sqlDept: any) => dept.departmentId == sqlDept.ori_dept_id
      )
      if (allIsNeedAdd.length) {
        const parentDept = SQLDeptList.filter(
          // eslint-disable-next-line eqeqeq
          (sqlDept: any) => dept.parentId == sqlDept.ori_dept_id
        )
        if (parentDept.length) {
          updateList.push({
            ...allIsNeedAdd[0],
            department: dept.department,
            ori_dept_pid: dept.parentId,
            _dept_pid: parentDept[0].dept_id
          })
        }
      } else {
        insertList.push({ ...dept, dept_id_pid: isNeedAddParent[0].dept_id })
      }
    }
  }

  /* 查询判断是否需要更新 */
  for (const sqlDept of curSQLDeptList) {
    for (const dept of deptList) {
      if (dept.departmentId === sqlDept.ori_dept_id && dept.department !== sqlDept.ori_dept_name) {
        updateList.push({ ...sqlDept, department: dept.department })
      }
    }
  }

  /* 对比出需要删除的数据 */
  for (const sqlDept of curSQLDeptList) {
    /* 查询是否需要删除 */
    const isNeedDel = deptList.some(
      (dept: any) => dept.departmentId === sqlDept.ori_dept_id
    )
    // 判断是否在三方数据里
    const isNeedMove = deptListOrigin.find(
      (dept: any) => dept.departmentId === sqlDept.ori_dept_id
    )
    // 不需要删除并且在三方数据里，进行移动操作
    if (!isNeedDel && isNeedMove) {
      const parentDept = SQLDeptList.filter(
        (item: any) => isNeedMove.parentId === item.ori_dept_id
      )
      if (parentDept.length) {
        updateList.push({
          ...sqlDept,
          department: isNeedMove.department,
          ori_dept_pid: isNeedMove.parentId,
          _dept_pid: parentDept[0].dept_id
        })
      }
    }
    /* 没有查询到就是需要删除表里的数据 */
    if (!isNeedDel && !isNeedMove) deleteList.push(sqlDept)
  }
  return {
    insertList,
    updateList,
    deleteList
  }
}

/* 创建部门 */
async function handleDeptInsert(insertList: any): Promise<any> {
  /* 遍历插入WPS 创建部门 */
  for (const dept of insertList) {
    /** 获取企业token */
    const companyToken = await getCompanyToken()
    /* 获取当前时间 */
    const time = await currentTime()
    let order: number = 0
    if (dept.order && dept.order !== '0') {
      // 权重
      order = 10000 - dept.order
    }
    /* WPS创建部门 */
    const pushDepts = await depts(companyToken, {
      name: dept.department,
      dept_pid: dept.dept_id_pid,
      order
    })
    logger.info({
      msg: `创建部门:${dept.departmentId}`
    })
    if (pushDepts.result !== 0) {
      logger.warn(`创建部门,dept: ${JSON.stringify(dept)},pushDepts: ${JSON.stringify(pushDepts)}`)
      continue
    }
    /* 存中间表 */
    /* 存入中间表的是接口返回的数据 */
    const insertData = await sdkInstance.middleware.mysql.insert(
      config.dbName,
      'INSERT INTO middle_dept (ori_dept_id, ori_dept_name, ori_dept_pid, dept_id, dept_id_pid, dept_order, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        dept.departmentId,
        dept.department,
        dept.parentId,
        pushDepts.dept_id,
        dept.dept_id_pid,
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
      logger.warn(`插入部门中间表失败。,dept: ${JSON.stringify(dept)},insertData: ${JSON.stringify(insertData)}`)
    }
  }
}

/* 修改部门 */
async function handleDeptUpdate(updateList: any): Promise<any> {
  /** 获取企业token */
  const companyToken = await getCompanyToken()

  const time = await currentTime()
  /* 遍历更新WPS 修改部门 */
  for (const dept of updateList) {
    const parms: any = {
      name: dept.department,
      order: dept.dept_order,
    }
    if (dept._dept_pid) {
      logger.info({
        msg: `移动-部门:${dept.department}, ${dept._dept_pid}`
      })
      parms.dept_pid = dept._dept_pid
    }
    const updateDept = await putDepts(companyToken, dept.dept_id, parms)
    logger.info({
      msg: `修改部门:${dept.ori_dept_name}`
    })
    if (updateDept.result !== 0) {
      logger.warn(`wps侧修改部门失败,dept: ${JSON.stringify(dept)},updateDept: ${JSON.stringify(updateDept)}`)
      continue
    }
    /* 更新中间表 */
    if (dept._dept_pid) {
      const delData = await sdkInstance.middleware.mysql.update(
        config.dbName,
        'UPDATE middle_dept SET ori_dept_name=?, update_time=?, ori_dept_pid=?, dept_id_pid=?, dept_order=? WHERE is_delete=0 AND dept_id=?',
        [dept.department, time, dept.ori_dept_pid, dept._dept_pid, dept.dept_order, dept.dept_id]
      )
      logger.info({
        msg: `修改部门-中间表:${dept.departmentId}`
      })
      /* 如果错误，抛出错误 */
      if (delData.result !== 'ok') {
        logger.warn(`更新部门中间表失败,dept: ${JSON.stringify(dept)},delData: ${JSON.stringify(delData)}`)
      }
    } else {
      const delData = await sdkInstance.middleware.mysql.update(
        config.dbName,
        'UPDATE middle_dept SET ori_dept_name=?, update_time=?, dept_order=? WHERE is_delete=0 AND dept_id=?',
        [dept.department, time, dept.dept_order, dept.dept_id]
      )
      logger.info({
        msg: `修改部门-中间表:${dept.departmentId}`
      })
      /* 如果错误，抛出错误 */
      if (delData.result !== 'ok') {
        logger.warn(`更新部门中间表失败,dept: ${JSON.stringify(dept)},delData: ${JSON.stringify(delData)}`)
      }
    }
  }
}

/* 删除部门 */
async function handleDeptDelete(deleteList: any): Promise<any> {
  /* 进来通过部门id先去关系表里查询改部门是否存在成员。
      如果存在需要对成员进行解绑，移出部门
   */
  for (const dept of deleteList) {
    /* 查询该部门是否还有子部门 child */
    const SQLDeptResult: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_dept WHERE is_delete=0 AND ori_dept_pid=?',
      [dept.ori_dept_id]
    )
    logger.info({
      msg: `获取该部门用户:${dept.departmentId}`
    })
    const childDepts =
      SQLDeptResult.data &&
      SQLDeptResult.data.rows &&
      Array.isArray(SQLDeptResult.data.rows)
        ? SQLDeptResult.data.rows
        : []
    /* 如果在关联表内查询的数据没空就跳出循环进行下一条数据 */
    if (childDepts.length > 0) await handleDeptDelete(childDepts)
  }
  for (const dept of deleteList) {
    /** 获取企业token */
    const companyToken = await getCompanyToken()
    /* 通过部门id查询当前部门的用户数组 */
    const SQLResult: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_user_dept WHERE is_delete=0 AND ori_dept_id=?',
      [dept.ori_dept_id]
    )
    logger.info({
      msg: `获取该部门用户:${dept.dept_id} ${dept.ori_dept_id}`
    })
    const deptUsers =
      SQLResult.data &&
      SQLResult.data.rows &&
      Array.isArray(SQLResult.data.rows)
        ? SQLResult.data.rows
        : []
    /* 遍历部门下所有用户，进行解绑 */
    for (const deptUser of deptUsers) {
      logger.info({
        msg: `需要删除用户的每一项:${JSON.stringify(deptUser)}`
      })
      const delDeptUser = await usersDelCompany(
        companyToken,
        dept.dept_id,
        deptUser.company_uid
      )
      logger.info({
        msg: `对该部门下用户解绑:${dept.dept_id} ${dept.ori_dept_id}`
      })
      if (!delDeptUser || delDeptUser.result !== 0) {
        logger.warn(`移出部门失败,dept: ${JSON.stringify(dept)},deptUser: ${JSON.stringify(deptUser)},delDeptUser: ${JSON.stringify(delDeptUser)}`)
        continue
      }
      /* 删除部门用户关联中间表 isDelete状态 为 1 */
      const delDeptuserData = await sdkInstance.middleware.mysql.update(
        config.dbName,
        'UPDATE middle_user_dept SET is_delete=1 WHERE is_delete=0 AND ori_dept_id=? AND company_uid=?',
        [dept.ori_dept_id, deptUser.company_uid]
      )
      logger.info({
        msg: `删除部门用户关联中间表:${dept.dept_id} ${dept.ori_dept_id}`
      })
      /* 如果错误，抛出错误 */
      if (delDeptuserData.result !== 'ok') {
        logger.warn(`删除用户部门关联表失败。,dept: ${JSON.stringify(dept)},deptUser: ${JSON.stringify(deptUser)},delDeptuserData: ${JSON.stringify(delDeptuserData)}`)
      }
    }
    /* 调用删除部门接口 */
    const delDeptInfo = await delDepts(companyToken, dept.dept_id)
    logger.info({
      msg: `删除部门:${dept.dept_id} ${dept.ori_dept_id}`
    })
    /* 如果错误，抛出错误 */
    if (delDeptInfo.result !== 0) {
      logger.warn(`wps侧删除部门失败。,dept: ${JSON.stringify(dept)},delDeptInfo: ${JSON.stringify(delDeptInfo)}`)
      continue
    }
    /* 删除部门中间表修改 isDelete状态 为 1 */
    const delDeptData = await sdkInstance.middleware.mysql.delete(
      config.dbName,
      'DELETE FROM middle_dept WHERE is_delete=0 AND dept_id=?',
      [dept.dept_id]
    )
    logger.info({
      msg: `删除部门中间表:${dept.dept_id} ${dept.ori_dept_id}`
    })
    /* 如果错误，抛出错误 */
    if (delDeptData.result !== 'ok') {
      logger.warn(`删除部门中间表失败。,dept: ${JSON.stringify(dept)},delDeptData: ${JSON.stringify(delDeptData)}`)
    }
  }
}

/**
 * @name 获取企业根 部门id
 * @return {result} 部门id
 */
export async function getCompanyRootDepts() {
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  /* 获取根部门id */
  const result: any = await deptsList(companyToken)
  resCheck(result)
  return result.depts[0].dept_id
}
