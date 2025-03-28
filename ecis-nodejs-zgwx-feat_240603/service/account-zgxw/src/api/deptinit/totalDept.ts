import { Context } from 'koa'
import { sdkInstance } from '../../grpc/sdk'
import { resErrJson, resCheck, resJson } from '../../util/msgCode'
import config from '../../config'
import {
  depts,
  putDepts,
  delDepts,
  deptsList,
  usersDelCompany
} from '../../model/openApi/company'
import { logger } from '../../server'
import { getCompanyToken } from '../authToken/func'
import { currentTime } from '../../util/momentTime'

export async function totalDeptSync(deptList: any): Promise<any> {
  logger.info({
    msg: '进入同步方法'
  })
  /* 判断锁状态 */
  const lockStatus = await sdkInstance.middleware.etcd.getLock('async-dept', 10)
  if (lockStatus.result !== 'ok') {
    throw resErrJson({ msg: '设置锁失败' })
  }
  logger.info({
    msg: '设置锁'
  })
  /* 同步部门 */
  for (const dept of deptList) {
    await handleDept(dept)
  }
  /* 释放锁状态 */
  const res = await sdkInstance.middleware.etcd.releaseLock(
    'async-dept',
    lockStatus.data
  )
  if (lockStatus.result !== 'ok') {
    throw resErrJson({ msg: '清除锁失败' })
  }

  return resJson()
}

export async function handleDept(dept: any): Promise<any> {
  logger.info({
    msg: `当前部门信息,dept: ${JSON.stringify(dept)}`
  })
  /* 同步部门 */
  // eslint-disable-next-line eqeqeq
  if (dept.status != '2000') {
    logger.info({
      msg: `进入部门删除: dept: ${JSON.stringify(dept)}`
    })
    /* 删除部门 */
    await handleDeptDelete(dept)
  // eslint-disable-next-line eqeqeq
  } else if (dept.status == '2000') {
    logger.info({
      msg: `进入部门修改新增: dept: ${JSON.stringify(dept)}`
    })
    /* 新增修改部门部门 */
    await handleDeptEdit(dept)
  }
}

/* 判断新增和修改 */
export async function handleDeptEdit(dept: any) {
  /* 获取表里部门数据 */
  const curDeptSQLResult: any = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_dept WHERE is_delete=0 and ori_dept_id=?',
    [dept.departmentId]
  )
  const curSQLDeptList =
    curDeptSQLResult.data &&
    curDeptSQLResult.data.rows &&
    Array.isArray(curDeptSQLResult.data.rows)
      ? curDeptSQLResult.data.rows
      : []
  logger.info({
    msg: `获取表里部门数据: curDeptSQLResult: ${JSON.stringify(curDeptSQLResult.data)}, curSQLDeptList: ${curSQLDeptList.length}`
  })
  if (!curSQLDeptList || curSQLDeptList.length === 0) {
    /* 获取表里父部门数据 */
    const parentDeptSQLResult: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_dept WHERE is_delete=0 and ori_dept_id=?',
      [dept.parentId]
    )
    const parentSQLDeptList =
      parentDeptSQLResult.data &&
      parentDeptSQLResult.data.rows &&
      Array.isArray(parentDeptSQLResult.data.rows)
        ? parentDeptSQLResult.data.rows
        : []
    logger.info({
      msg: `获取表里父部门数据: parentSQLDeptList: ${JSON.stringify(parentSQLDeptList)}`
    })
    if (
      parentSQLDeptList.length === 0 &&
      // eslint-disable-next-line eqeqeq
      `${dept.parentId}` == `${config.department.parentId}`
    ) {
      /* 获取wps根部门 */
      const rootDeptId = await getCompanyRootDepts()
      /* 插入根部门 */
      await handleDeptInsert({ ...dept, dept_id_pid: rootDeptId })
    } else if (parentSQLDeptList.length === 0) {
      logger.warn(`该部门不存在父级部门,dept: ${JSON.stringify(dept)}`)
    } else {
      /* 表里没有查询到需要新增 */
      await handleDeptInsert({
        ...dept,
        dept_id_pid: parentSQLDeptList[0].dept_id
      })
    }
  } else if (dept.parentId !== curSQLDeptList[0].ori_dept_pid) {
    dept.dept_id = curSQLDeptList[0].dept_id
    await handleDeptMove(dept)
  } else {
    dept.dept_id = curSQLDeptList[0].dept_id
    // 部门名称和排序修改时更新
    if (dept.department !== curSQLDeptList[0].ori_dept_name || (dept.order && Number(10000 - dept.order) !== curSQLDeptList[0].dept_order)) {
      await handleDeptUpdate(dept)
    }
  }
}

/* 移动部门 */
async function handleDeptMove(dept: any): Promise<any> {
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  /* 获取当前时间 */
  const time = await currentTime()
  /* 获取表里父部门数据 */
  const deptSQLResult: any = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_dept WHERE is_delete=0 and ori_dept_id=?',
    [dept.parentId]
  )
  const moveSQLDept =
    deptSQLResult.data &&
    deptSQLResult.data.rows &&
    Array.isArray(deptSQLResult.data.rows)
      ? deptSQLResult.data.rows
      : []
  let order: number = 0
  if (dept?.order !== '0') {
    // 权重
    order = 10000 - dept.order
  }
  if (!moveSQLDept || moveSQLDept.length === 0) {
    // /* 获取wps根部门 */
    // const rootDeptId = await getCompanyRootDepts()
    // const editDept = await putDepts(companyToken, dept.dept_id, {
    //   name: dept.department,
    //   dept_pid: rootDeptId,
    //   order
    // })
    // if (editDept.result !== 0) {
    //   logger.warn({ msg: `获取wps根部门失败, editDept: ${JSON.stringify(editDept)}` })
    //   return
    // }
    // /* 更新中间表 */
    // const delData = await sdkInstance.middleware.mysql.update(
    //   config.dbName,
    //   'UPDATE middle_dept SET ori_dept_name=?, ori_dept_pid=?, dept_id_pid=?, dept_order=?, update_time=?, syncSequence=?, maxSyncSequence=? WHERE is_delete=0 AND dept_id=?',
    //   [dept.department, dept.parentId, rootDeptId, order, time, dept.syncSequence, dept.maxSyncSequence, dept.dept_id]
    // )
    // logger.info({
    //   msg: `修改部门-中间表,dept: ${JSON.stringify(dept)}`
    // })
    // /* 如果错误，抛出错误 */
    // if (delData.result !== 'ok') {
    //   logger.warn(`更新部门中间表失败,dept: ${JSON.stringify(dept)},delData: ${JSON.stringify(delData)}`)
    // }
    logger.info({ msg: `移动部门-当前部门无父部门-不可移动, dept: ${JSON.stringify(dept)}` })
  } else {
    const editDept = await putDepts(companyToken, dept.dept_id, {
      name: dept.department,
      dept_pid: moveSQLDept[0].dept_id,
      order,
    })
    /* 更新中间表 */
    const moveData = await sdkInstance.middleware.mysql.update(
      config.dbName,
      'UPDATE middle_dept SET ori_dept_name=?, ori_dept_pid=?, dept_id_pid=?, dept_order=?, update_time=?, syncSequence=?, maxSyncSequence=? WHERE is_delete=0 AND dept_id=?',
      [dept.department, dept.parentId, moveSQLDept[0].dept_id, order, time, dept.syncSequence, dept.maxSyncSequence, dept.dept_id]
    )
    logger.info({
      msg: `修改部门-中间表:${dept.departmentId}`
    })
    /* 如果错误，抛出错误 */
    if (moveData.result !== 'ok') {
      logger.warn(`更新部门中间表失败,,dept: ${JSON.stringify(dept)},moveData: ${JSON.stringify(moveData)}`)
    }
  }
}

/* 创建部门 */
async function handleDeptInsert(dept: any): Promise<any> {
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  /* 获取当前时间 */
  const time = await currentTime()
  /* 遍历插入WPS 创建部门 */
  let order: number = 0
  if (dept.order && dept.order !== '0') {
    // 权重
    order = 10000 - dept.order
  }
  /* 是否需要查询父级id */
  const pushDepts = await depts(companyToken, {
    name: dept.department,
    dept_pid: dept.dept_id_pid,
    order: order
  })
  logger.info({
    msg: `查询父部门:${dept.departmentId}`
  })
  if (pushDepts.result !== 0) {
    logger.warn(`wps侧创建部门失败,dept: ${JSON.stringify(dept)},pushDepts: ${JSON.stringify(pushDepts)}`)
    return
  }
  /* 存中间表 */
  /* 存入中间表的是接口返回的数据 */
  const insertData = await sdkInstance.middleware.mysql.insert(
    config.dbName,
    'INSERT INTO middle_dept (ori_dept_id, ori_dept_name, ori_dept_pid, dept_id, dept_id_pid, dept_order,create_time, update_time, create_user, update_user, syncSequence, maxSyncSequence, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
      dept.syncSequence,
      dept.maxSyncSequence,
      0
    ]
  )
  logger.info({
    msg: `创建部门-中间表:${dept.departmentId}`
  })
  /* 返回结果判断 */
  if (insertData.result !== 'ok') {
    logger.warn(`插入部门中间表失败,,dept: ${JSON.stringify(dept)},insertData: ${JSON.stringify(insertData)}`)
  }
}

/* 修改部门 */
async function handleDeptUpdate(dept: any): Promise<any> {
  /** 获取企业token */
  const companyToken = await getCompanyToken()

  const time = await currentTime()
  let order: number = 0
  if (dept?.order !== '0') {
    // 权重
    order = 10000 - dept.order
  }
  /* 遍历更新WPS 修改部门 */
  const updateDept = await putDepts(companyToken, dept.dept_id, {
    name: dept.department,
    order: order
  })
  logger.info({
    msg: `修改部门:${dept.departmentId}`
  })
  if (updateDept.result !== 0) {
    logger.warn(`wps侧修改部门失败,dept: ${JSON.stringify(dept)},updateDept: ${JSON.stringify(updateDept)}`)
    return
  }
  /* 更新中间表 */
  const changeData = await sdkInstance.middleware.mysql.update(
    config.dbName,
    'UPDATE middle_dept SET ori_dept_name=?, dept_order=?, update_time=?, syncSequence=?, maxSyncSequence=? WHERE is_delete=0 AND dept_id=?',
    [dept.department, order, time, dept.syncSequence, dept.maxSyncSequence, dept.dept_id]
  )
  logger.info({
    msg: `修改部门-中间表:${dept.departmentId}`
  })
  /* 如果错误，抛出错误 */
  if (changeData.result !== 'ok') {
    logger.warn(`修改部门-中间表失败,dept: ${JSON.stringify(dept)},changeData: ${JSON.stringify(changeData)}`)
  }
}

/* 删除部门 */
export async function handleDeptDelete(dept: any): Promise<any> {
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  if (!dept.ori_dept_id) {
    /* 通过部门id查询当前部门 */
    const SQLDeptResult: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_dept WHERE ori_dept_id=?',
      [dept.departmentId]
    )
    const depts =
      SQLDeptResult.data &&
      SQLDeptResult.data.rows &&
      Array.isArray(SQLDeptResult.data.rows)
        ? SQLDeptResult.data.rows
        : []
    // depts[0] 可能为undefined, 即该部门已被删除
    if (!depts[0]) {
      logger.warn({ msg: `该部门不存在部门中间表中,dept: ${JSON.stringify(dept)}` })
      return
    } else {
      dept = depts[0]
    }
  }
  /* 查询 部门中间表 */
  /* 查询该部门是否还有子部门 child */
  const SQLChildDeptResult: any = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_dept WHERE ori_dept_pid=?',
    [dept.ori_dept_id]
  )
  logger.info({
    msg: `获取该部门子部门,dept: ${JSON.stringify(dept)}`
  })
  const childDepts =
    SQLChildDeptResult.data &&
    SQLChildDeptResult.data.rows &&
    Array.isArray(SQLChildDeptResult.data.rows)
      ? SQLChildDeptResult.data.rows
      : []
  if (childDepts.length > 0) {
    for (const dept of childDepts) {
      await handleDeptDelete(dept)
    }
  }
  /* 通过部门id查询当前部门的用户数组 */
  const SQLDeptUsersResult: any = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_user_dept WHERE is_delete=0 AND ori_dept_id=?',
    [dept.ori_dept_id]
  )
  logger.info({
    msg: `获取该部门用户:${dept.ori_dept_id}`
  })
  const deptUsers =
    SQLDeptUsersResult.data &&
    SQLDeptUsersResult.data.rows &&
    Array.isArray(SQLDeptUsersResult.data.rows)
      ? SQLDeptUsersResult.data.rows
      : []
  for (const deptUser of deptUsers) {
    const delDeptUser = await usersDelCompany(
      companyToken,
      dept.dept_id,
      deptUser.company_uid
    )
    logger.info({
      msg: `对该部门下用户解绑:${dept.ori_dept_id}`
    })
    if (delDeptUser.result !== 0) {
      logger.warn(`wps侧人员移出部门失败,dept: ${JSON.stringify(dept)},deptUser: ${JSON.stringify(deptUser)},delDeptUser: ${JSON.stringify(delDeptUser)}`)
      continue
    }
    /* 删除部门用户关联中间表 isDelete状态 为 1 */
    const delMiddleUserDept = await sdkInstance.middleware.mysql.delete(
      config.dbName,
      'DELETE FROM middle_user_dept WHERE is_delete=0 AND company_uid=? AND dept_id=?',
      [deptUser.company_uid, deptUser.dept_id]
    )
    logger.info({
      msg: `删除部门用户关联中间表:${dept.ori_dept_id}`
    })
    /* 如果错误，抛出错误 */
    if (delMiddleUserDept.result !== 'ok') {
      logger.warn(`删除用户部门关联表失败,dept: ${JSON.stringify(dept)},deptUser: ${JSON.stringify(deptUser)},delMiddleUserDept: ${JSON.stringify(delMiddleUserDept)}`)
      continue
    }
  }
  /* 调用删除部门接口 */
  const delDeptInfo = await delDepts(companyToken, dept.dept_id)
  logger.info({
    msg: `删除部门:${dept.dept_id}`
  })
  /* 如果错误，抛出错误 */
  if (delDeptInfo.result !== 0) logger.warn({ msg: `wps侧删除部门失败,dept: ${JSON.stringify(dept)}delDeptInfo: ${JSON.stringify(delDeptInfo)}` })
  /* 删除部门中间表修改 isDelete状态 为 1 */
  const delDeptData = await sdkInstance.middleware.mysql.delete(
    config.dbName,
    'DELETE FROM middle_dept WHERE dept_id=?',
    [dept.dept_id]
  )
  logger.info({
    msg: `删除部门中间表:${dept.dept_id}`
  })
  /* 如果错误，抛出错误 */
  if (delDeptData.result !== 'ok') {
    logger.warn(`删除部门中间表失败,dept: ${JSON.stringify(dept)},delDeptData: ${JSON.stringify(delDeptData)}`)
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
