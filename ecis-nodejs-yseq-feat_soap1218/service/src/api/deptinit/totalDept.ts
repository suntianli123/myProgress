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
import { logger } from '../../ins'

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
export async function totalDeptSync(deptList: any, originDeptList: any): Promise<any> {
  /* 递归同步部门 */
  // for (const dept of deptList) {
  //   await handleRecursionDeptSync([dept], originDeptList)
  // }
  const rootDeptId = await getCompanyRootDepts()
  const SQLRootResult: any = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_dept WHERE is_delete=0 AND dept_id=?',
    [rootDeptId]
  )
  const SQLRootDeptList =
  SQLRootResult.data && SQLRootResult.data.rows && Array.isArray(SQLRootResult.data.rows)
    ? SQLRootResult.data.rows
    : []

  if (!SQLRootDeptList.length) {
    const time = await currentTime()
    const insertData = await sdkInstance.middleware.mysql.insert(
      config.dbName,
      'INSERT INTO middle_dept (ori_dept_id, ori_dept_name, ori_dept_pid, dept_id, dept_id_pid, dept_order, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        config.department.departmentId,
        '',
        config.department.parentId,
        rootDeptId,
        '-1',
        1,
        time,
        time,
        'system',
        'system',
        0
      ]
    )
  }
  await handleRecursionDeptSync(deptList, originDeptList)
}

/* 递归同步部门 */
async function handleRecursionDeptSync(deptList: any, originDeptList: any): Promise<any> {
  // const rootDept = deptList.filter((item: any) => {
  //   return item.parentId === '1'
  // })
  // const rootId = rootDept[0]?.departmentId
  // let isDeptExist = false
  // if (rootId) {
  //   const SQLResult: any = await sdkInstance.middleware.mysql.select(
  //     config.dbName,
  //     'SELECT * FROM middle_dept WHERE is_delete=0 AND ori_dept_id = ?',
  //     [rootId]
  //   )
  //   const SQLDeptList =
  //     SQLResult.data && SQLResult.data.rows && Array.isArray(SQLResult.data.rows)
  //       ? SQLResult.data.rows
  //       : []
  //   SQLDeptList.length !== 0 && (isDeptExist = true)
  // }
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
  /* 第一次同步根部门 */
  // 部门ID为‘1’则无父部门
  // TO DO 已存在根部门，不会执行
  if (!SQLDeptList.length) {
    /* 获取wps根部门 */
    const rootDeptId = await getCompanyRootDepts()
    const dept = deptList[0]
    logger.info({
      msg: `第一次同步根部门:${JSON.stringify(dept)}, rootDeptId: ${rootDeptId}`
    })
    /* 插入根部门 */
    await handleDeptInsert([{ ...dept, dept_id_pid: rootDeptId }])
    /** 递归子部门 */
    dept.children &&
      dept.children.length !== 0 &&
      (await handleRecursionDeptSync(dept.children, originDeptList))
    return
  }
  const thirdDepts: any[] = originDeptList
  /* 对比差异 */
  const diff = await handleCheckNeedHandle(deptList, SQLDeptList, thirdDepts)
  logger.info({
    type: '差异数据',
    inc: `需要新增的部门数： ${diff.insertList.length}`,
    upd: `需要更新的部门数： ${diff.updateList.length}`,
    del: `需要删除的部门数： ${diff.deleteList.length}`,
  })
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
    if (dept?.children?.length > 0) {
      // 如果存在子部门 走递归
      await handleRecursionDeptSync(dept.children, originDeptList)
    } else {
      // 确认中间表是否有子部门存在
      const SQLDeptResult: any = await sdkInstance.middleware.mysql.select(
        config.dbName,
        'SELECT * FROM middle_dept WHERE ori_dept_pid=?',
        [dept.departmentId]
      )
      logger.info({
        msg: `获取该部门用户:${dept.departmentId}`
      })
      const vChildDepts = SQLDeptResult?.data?.rows ?? []
      if (vChildDepts?.length > 0) {
        let isNeedMove: any
        const needDelete: any[] = []
        const needMove: any[] = []
        for (const item of vChildDepts) {
          isNeedMove = originDeptList.find((third: any) => {
            return third.departmentId === item.ori_dept_id
          })
          const parentDept = SQLDeptList.filter(
            (sqlDept: any) => dept.parentId === sqlDept.ori_dept_id
          )
          isNeedMove && needMove.push({
            ...item,
            department: isNeedMove.department,
            ori_dept_pid: isNeedMove.parentId,
            _dept_pid: parentDept[0].dept_id,
            order: isNeedMove.order || item?.dept_order
          })
          !isNeedMove && needDelete.push(item)
        }
        needDelete.length && (await handleDeptDelete(needDelete))
        needMove.length && (await handleDeptUpdate(needMove))
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

  const curSQLDeptList =
    curDeptSQLResult.data &&
      curDeptSQLResult.data.rows &&
      Array.isArray(curDeptSQLResult.data.rows)
      ? curDeptSQLResult.data.rows
      : []

  /* 新增 */
  const insertList: any[] = []
  /* 删除 */
  const deleteList: any[] = []
  /* 更新 */
  const updateList: any[] = []
  /* 对比出新增的数据 */
  for (const dept of deptList) {
    /* 先判断是否在中间表 */
    const isNeedAdd = curSQLDeptList.some(
      (sqlDept: any) => dept.departmentId === sqlDept.ori_dept_id
    )
    /* 再查找父级的中间表数据得到父级 WPSID 来创建当前部门 */
    const isNeedAddParent = SQLDeptList.filter(
      (sqlDept: any) => sqlDept.ori_dept_id === dept.parentId
    )
    if (!isNeedAdd && isNeedAddParent.length !== 0) {
      const allIsNeedAdd = SQLDeptList.filter(
        (sqlDept: any) => dept.departmentId === sqlDept.ori_dept_id
      )
      if (allIsNeedAdd.length) {
        const parentDept = SQLDeptList.filter(
          (sqlDept: any) => dept.parentId === sqlDept.ori_dept_id
        )
        updateList.push({
          ...allIsNeedAdd[0],
          department: dept.department,
          ori_dept_pid: dept.parentId,
          _dept_pid: parentDept[0].dept_id,
          order: dept.order || allIsNeedAdd[0]?.dept_order
        })
      } else {
        insertList.push({ ...dept, dept_id_pid: isNeedAddParent[0].dept_id })
      }
    }
  }

  /* 查询判断是否需要更新 */
  for (const sqlDept of curSQLDeptList) {
    for (const dept of deptList) {
      if (dept.departmentId === sqlDept.ori_dept_id) {
        if (dept.department !== sqlDept.ori_dept_name || (dept.order && Number(dept.order) !== sqlDept.dept_order)) {
          updateList.push({ ...sqlDept, department: dept.department, order: dept.order })
        }
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
    if (!isNeedDel && isNeedMove) {
      const parentDept = SQLDeptList.filter(
        (item: any) => isNeedMove.parentId === item.ori_dept_id
      )
      parentDept[0] && updateList.push({
        ...sqlDept,
        department: isNeedMove.department,
        ori_dept_pid: isNeedMove.parentId,
        _dept_pid: parentDept[0].dept_id,
        order: isNeedMove?.order || sqlDept?.dept_order
      })
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
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  /* 获取当前时间 */
  const time = await currentTime()
  /* 遍历插入WPS 创建部门 */
  for (const dept of insertList) {
    let order: number = 0
    if (dept.order && dept.order !== '0') {
      // 权重
      order = dept.order
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
    if (pushDepts.result !== 0) throw Error(pushDepts.msg)
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
    if (insertData.result !== 'ok') throw Error('插入部门中间表失败。')
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
      order: dept.order,
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
    if (updateDept.result !== 0) throw Error(updateDept.msg)
    /* 更新中间表 */
    if (dept._dept_pid) {
      const delData = await sdkInstance.middleware.mysql.update(
        config.dbName,
        'UPDATE middle_dept SET ori_dept_name=?, update_time=?, ori_dept_pid=?, dept_id_pid=?, dept_order=? WHERE is_delete=0 AND dept_id=?',
        [dept.department, time, dept.ori_dept_pid, dept._dept_pid, dept.order, dept.dept_id]
      )
      logger.info({
        msg: `修改部门-中间表:${dept.ori_dept_id}`
      })
      /* 如果错误，抛出错误 */
      if (delData.result !== 'ok') throw Error('更新部门中间表失败。')
    } else {
      const delData = await sdkInstance.middleware.mysql.update(
        config.dbName,
        'UPDATE middle_dept SET ori_dept_name=?, update_time=?, dept_order=? WHERE is_delete=0 AND dept_id=?',
        [dept.department, time, dept.order, dept.dept_id]
      )
      logger.info({
        msg: `修改部门-中间表:${dept.ori_dept_id}`
      })
      /* 如果错误，抛出错误 */
      if (delData.result !== 'ok') throw Error('更新部门中间表失败。')
    }
  }
}

/* 删除部门 */
async function handleDeptDelete(deleteList: any): Promise<any> {
  /** 获取企业token */
  const companyToken = await getCompanyToken()

  const time = new Date()
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
        throw resErrJson('移出部门失败')
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
        throw Error('删除用户部门关联表失败。')
      }
    }
    /* 调用删除部门接口 */
    const delDeptInfo = await delDepts(companyToken, dept.dept_id)
    logger.info({
      msg: `删除部门:${dept.dept_id} ${dept.ori_dept_id}`
    })
    /* 如果错误，抛出错误 */
    if (delDeptInfo.result !== 0) throw Error(delDeptInfo.msg)
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
    if (delDeptData.result !== 'ok') throw Error('删除部门中间表失败。')
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
