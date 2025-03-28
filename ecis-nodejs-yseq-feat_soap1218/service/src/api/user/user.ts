import { Context } from 'koa'
import { sdkInstance } from '../../grpc/sdk'
import { resJson, resErrJson } from '../../util/msgCode'
import config from '../../config'
import {
  companyUsers,
  usersAddCompany,
  usersDelCompany,
  delCompanyUsers,
  companyUsersEnable,
  batchActiveDepts,
  batchPutDeptsOrder,
  getCompanyUsers,
  putCompanyUsers,
  batchDisableCompanyUsers
} from '../../model/openApi/company'
import { getCompanyToken } from '../authToken/func'
import { currentTime } from '../../util/momentTime'
import { logger } from '../../ins'

export async function handleUserSync(userList: any): Promise<any> {
  /* 同步用户 */
  for (const user of userList) {
    /* 查询中间表所有用户 */
    logger.info({
      msg: `在handleUserSync中查询用户之前:${JSON.stringify(user)}`
    })
    const SQLResult = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_users WHERE is_delete !=1 AND user_id=?',
      [user.id]
    )
    const SQLUserList =
      SQLResult.data &&
        SQLResult.data.rows &&
        Array.isArray(SQLResult.data.rows)
        ? SQLResult.data.rows
        : []
    logger.info({ msg: `查询中间表后的数据:${JSON.stringify(SQLUserList)}` })
    const disableList = [] // 中间表状态为：禁用
    const activeList = [] // 中间表状态为：正常
    for (const SQLUser of SQLUserList) {
      // eslint-disable-next-line eqeqeq
      if (SQLUser.is_delete == '0') {
        activeList.push(SQLUser) // 中间表状态为：正常
      // eslint-disable-next-line eqeqeq
      } else if (SQLUser.is_delete == '2') {
        disableList.push(SQLUser) // 中间表状态为：禁用
      }
    }
    logger.info({
      msg: `查询中间表后状态为正常的:${JSON.stringify(activeList)}`
    })
    logger.info({
      msg: `查询中间表后状态为禁用的:${JSON.stringify(disableList)}`
    })
    if (disableList && disableList.length !== 0) {
      /* 状态为禁用需要启用 */
      user.company_uid = disableList[0].company_uid
      /* 启用前需要更新下用户信息 */
      await handleUserUpdate(user, disableList[0])
      /* 启用用户 */
      // eslint-disable-next-line eqeqeq
      if (user.status != '2') await handleActiveUpdate(user)
    } else {
      if (activeList.length === 0) {
        /* 新增用户 */
        await handleUserInsert(user)
      // eslint-disable-next-line eqeqeq
      } else if (user.status != '2') {
        /* 表中存在状态为正常 */
        user.company_uid = activeList[0].company_uid
        await handleUserUpdate(user, activeList[0])
      // eslint-disable-next-line eqeqeq
      } else if (user.status == '2') {
        /* 禁用前先更新用户信息 */
        /* 表中存在状态为正常 */
        user.company_uid = activeList[0].company_uid
        await handleUserUpdate(user, activeList[0])
        /* 禁用用户 */
        await handleUserDisable(user) // 禁用
        // await handleUserDelete(user) // 删除
      }
    }
  }
  return resJson()
}

/* 更新用户信息 */
async function handleUserUpdate(user: any, SQLUser: any) {
  const time = await currentTime()
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  /* 修改企业成员名称 */
  if (user.name !== SQLUser.name && user.name !== '') {
    /* 修改企业成员名称 */
    const putUserParams = {
      name: user.name
    }
    /* 修改企业成员信息 */
    const putUsers = await putCompanyUsers(
      companyToken,
      user.company_uid,
      putUserParams
    )
    logger.info({ msg: `修改成员WPS接口:${user.company_uid}` })
    /* 如果错误，抛出错误 */
    if (putUsers.result !== 0) {
      logger.warn({ msg: `修改企业成员失败。putUsers:${JSON.stringify(putUsers)}, user: ${JSON.stringify(user)}` })
    } else {
      /* 更新用户表 */
      const delMiddleUser = await sdkInstance.middleware.mysql.update(
        config.dbName,
        'UPDATE middle_users SET nick_name=?, update_time=? WHERE is_delete=0 AND user_id=?',
        [user.name, time, user.id]
      )
      logger.info({ msg: `修改成员－中间表:${user.company_uid}` })
      /* 返回结果判断 */
      if (delMiddleUser.result !== 'ok') {
        logger.warn({ msg: `更新用户表失败。delMiddleUser:${JSON.stringify(delMiddleUser)}, user: ${JSON.stringify(user)}` })
      }
    }
  }
  /* 查询中间表用户的部门数据 */
  const SQLResult = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_user_dept WHERE is_delete=0 AND user_id=?',
    [user.id]
  )
  const SQLUserDeptList =
    SQLResult.data && SQLResult.data.rows && Array.isArray(SQLResult.data.rows)
      ? SQLResult.data.rows
      : []
  let insertList = []
  const deleteList = []
  if (!SQLUserDeptList || SQLUserDeptList.length === 0) {
    insertList = user.dept
  } else {
    /* 判断是否需要新添加部门 */
    for (const userDept of user.dept) {
      const isNeedAdd = SQLUserDeptList.some(
        (sqlUserDept: any) => userDept.ori_dept_id === sqlUserDept.ori_dept_id
      )
      /* 需要新添加的部门list */
      if (!isNeedAdd) insertList.push(userDept)
    }
    /* 判断是否需要从部门中删除 */
    for (const sqlUserDept of SQLUserDeptList) {
      const isNeedAdd = user.dept.some(
        (userDept: any) => userDept.ori_dept_id === sqlUserDept.ori_dept_id
      )
      /* 需要从部门中删除list */
      if (!isNeedAdd) deleteList.push(sqlUserDept)
    }
  }
  user.insertUserDept = insertList && insertList.length !== 0 ? insertList : []
  user.deleteUserDept = deleteList && deleteList.length !== 0 ? deleteList : []
  /* 成员部门下新增 */
  user.insertUserDept.length !== 0 && (await handleUserDeptInsert(user))
  /* 成员部门下移出 */
  user.deleteUserDept.length !== 0 && (await handleUserDeptDelete(user))
  /* 修改用户order */
  /* 查询中间表用户的部门数据 */
  const SQLDeptResult = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_user_dept WHERE is_delete=0 AND user_id=?',
    [user.id]
  )
  const SQLUserDeptLists =
    SQLDeptResult.data && SQLDeptResult.data.rows && Array.isArray(SQLDeptResult.data.rows)
      ? SQLDeptResult.data.rows
      : []
  if (SQLUserDeptLists.length !== 0) {
    const order = user.order
    const orderUserInDept = await batchPutDeptsOrder(companyToken, {
      depts: [
        {
          company_uid: user.company_uid,
          dept_id: SQLUserDeptLists[0].dept_id,
          order
        }
      ]
    })
    logger.info({ msg: `修改成员order排序，WPS接口:${user.company_uid}` })
    /* 如果错误，抛出错误 */
    if (orderUserInDept.result !== 0) {
      logger.warn({ msg: `修改企业成员order失败,user: ${JSON.stringify(user)},SQLUserDeptLists: ${JSON.stringify(SQLUserDeptLists)},orderUserInDept: ${JSON.stringify(orderUserInDept)}` })
      return
    }
    const delMiddleUser = await sdkInstance.middleware.mysql.update(
      config.dbName,
      'UPDATE middle_user_dept SET user_order=? WHERE is_delete=0 AND company_uid=?',
      [user.order, user.company_uid]
    )
    logger.info({ msg: `更新用户表-中间表:${user.company_uid}` })
    /* 返回结果判断 */
    if (delMiddleUser.result !== 'ok') {
      logger.warn({ msg: `更新用户表失败,user: ${JSON.stringify(user)},delMiddleUser: ${JSON.stringify(delMiddleUser)}` })
    }
  }
}

/* 成员部门下新增 */
async function handleUserDeptInsert(user: any) {
  const time = await currentTime()
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  for (const userDept of user.insertUserDept) {
    /* WPS 添加企业成员 接口 */
    if (userDept.dept_id !== '' && user.company_uid !== '') {
      const insertUserDeptInfo = await usersAddCompany(
        companyToken,
        userDept.dept_id,
        user.company_uid
      )
      logger.info({ msg: `添加企业成员:${user.company_uid}` })
      /* 如果错误，抛出错误 */
      if (insertUserDeptInfo.result !== 0) {
        logger.warn({ msg: `在该部门下添加成员失败,user: ${JSON.stringify(user)},userDept: ${JSON.stringify(userDept)},insertUserDeptInfo: ${JSON.stringify(insertUserDeptInfo)}` })
        continue
      }
      /* 新增用户、部门关联表 */
      const insertMiddleUserDept = await sdkInstance.middleware.mysql.insert(
        config.dbName,
        'INSERT INTO middle_user_dept (user_id, company_uid, ori_dept_id, dept_id, user_order, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          user.id,
          user.company_uid,
          userDept.ori_dept_id,
          userDept.dept_id,
          user.order,
          time,
          time,
          'admin',
          'admin',
          0
        ]
      )
      logger.info({ msg: `新增用户、部门关联表－中间表:${user.company_uid}` })
      /* 返回结果判断 */
      if (insertMiddleUserDept.result !== 'ok') {
        logger.warn({ msg: `新增用户、部门关联表失败,user: ${JSON.stringify(user)},userDept: ${JSON.stringify(userDept)},insertMiddleUserDept: ${JSON.stringify(insertMiddleUserDept)}` })
      }
    }
  }
}

/* 成员部门下移出 */
async function handleUserDeptDelete(user: any) {
  const time = await currentTime()
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  for (const userDept of user.deleteUserDept) {
    /* WPS 移出企业成员 接口 */
    const deleteUserDeptInfo = await usersDelCompany(
      companyToken,
      userDept.dept_id,
      user.company_uid
    )
    logger.info({ msg: `删除成员:${user.company_uid}` })
    /* 如果错误，抛出错误 */
    if (deleteUserDeptInfo.result !== 0) {
      logger.warn({ msg: `该部门下移出成员失败,user: ${JSON.stringify(user)},userDept: ${JSON.stringify(userDept)},deleteUserDeptInfo: ${JSON.stringify(deleteUserDeptInfo)}` })
      continue
    }
    /* 更新用户、部门关联表 */
    /* 删除部门中间表修改 isDelete状态 为 1 */
    const delMiddleUserDept = await sdkInstance.middleware.mysql.delete(
      config.dbName,
      'DELETE FROM middle_user_dept WHERE is_delete=0 AND user_id=? AND dept_id=?',
      [user.id, userDept.dept_id]
    )
    logger.info({ msg: `删除用户、部门关联表－中间表:${user.company_uid}` })
    /* 返回结果判断 */
    if (delMiddleUserDept.result !== 'ok') {
      logger.warn({ msg: `删除用户、部门关联表－中间表失败,user: ${JSON.stringify(user)},userDept: ${JSON.stringify(userDept)},delMiddleUserDept: ${JSON.stringify(delMiddleUserDept)}` })
    }
  }
}

/* 新增企业成员 */
async function handleUserInsert(user: any) {
  const time = await currentTime()
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  const userParams = {
    login_name: user.loginName,
    password: user.password,
    name: user.name,
    third_union_id: user.id,
    role_id: 3
  }
  /* 调用创建企业成员WPS接口 */
  const createCompanyUsers = await companyUsers(companyToken, userParams)
  logger.info({ msg: `创建成员:${user.id}` })
  if (createCompanyUsers.result !== 0) {
    logger.warn({ msg: `创建成员失败,user: ${JSON.stringify(user)},userParams: ${JSON.stringify(userParams)}` })
    return
  }
  /* 激活成员 - 注释激活接口 */
  const activeuser = await batchActiveDepts(companyToken, createCompanyUsers.company_uid)
  // logger.info({ msg: `激活成员:${user.id}` })
  /* 存入中间表的是接口返回的数据 */
  // eslint-disable-next-line eqeqeq
  const insertMiddleUser = await sdkInstance.middleware.mysql.insert(
    config.dbName,
    'INSERT INTO middle_users (user_id, nick_name, company_uid, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      user.id,
      user.name,
      createCompanyUsers.company_uid,
      time,
      time,
      'admin',
      'admin',
      0
    ]
  )
  logger.info({ msg: `创建成员-中间表:${user.id}` })
  /* 返回结果判断 */
  if (insertMiddleUser.result !== 'ok') {
    logger.warn({ msg: `新增同步用户表失败,user: ${JSON.stringify(user)},insertMiddleUser: ${JSON.stringify(insertMiddleUser)}` })
    return
  }
  /* 如果用户状态为禁用的话需要禁用操作 */
  // eslint-disable-next-line eqeqeq
  const isNormal = user.status != '2'
  // eslint-disable-next-line eqeqeq
  if (!isNormal) {
    user.company_uid = createCompanyUsers.company_uid
    await handleUserDisable(user)
  }
  for (const userDept of user.dept) {
    /* 将企业成员同步到部门下 */
    const pushUserDept = await usersAddCompany(
      companyToken,
      userDept.dept_id,
      createCompanyUsers.company_uid
    )
    logger.info({ msg: `将企业成员同步到部门下:${user.company_uid}` })
    /* 如果错误，抛出错误 */
    if (pushUserDept.result !== 0) {
      logger.warn({ msg: `将企业成员同步到部门下失败。,user: ${JSON.stringify(user)},userDept: ${JSON.stringify(userDept)},pushUserDept: ${JSON.stringify(pushUserDept)}` })
      continue
    }
    /* 将信息同步到关联表中 */
    const insertMiddleUserDept = await sdkInstance.middleware.mysql.insert(
      config.dbName,
      'INSERT INTO middle_user_dept (user_id, company_uid, ori_dept_id, dept_id, user_order, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        user.id,
        createCompanyUsers.company_uid,
        userDept.ori_dept_id,
        userDept.dept_id,
        user.order,
        time,
        time,
        'admin',
        'admin',
        0
      ]
    )
    logger.info({ msg: `新增用户同步到关联表中:${user.id}` })
    /* 返回结果判断 */
    if (insertMiddleUserDept.result !== 'ok') {
      logger.warn({ msg: `新增同步用户部门关联表失败,user: ${JSON.stringify(user)},userDept: ${JSON.stringify(userDept)},insertMiddleUserDept: ${JSON.stringify(insertMiddleUserDept)}` })
    }
    /* 用户在部门下进行排序 */
    const order = user.order
    const orderUserInDept = await batchPutDeptsOrder(companyToken, {
      depts: [
        {
          company_uid: createCompanyUsers.company_uid,
          dept_id: userDept.dept_id,
          order
        }
      ]
    })
    if (pushUserDept.result !== 0) logger.warn({ msg: `用户在部门下进行排序失败:${JSON.stringify(user)}` })
    // eslint-disable-next-line eqeqeq
    if (user.status == '2') {
      /* 禁用用户 */
      user.company_uid = createCompanyUsers.company_uid
      await handleUserDisable(user) // 禁用
    }
  }
}

/* 删除用户 */
async function handleUserDelete(user: any) {
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  /* 遍历当前用户下的部门 */
  for (const userDept of user.dept) {
    /* 将成员从部门里移除 */
    const delUserDept = await usersDelCompany(
      companyToken,
      userDept.dept_id,
      user.company_uid
    )
    logger.info({ msg: `将成员从部门里移出:${user.company_uid}` })
    /* 如果错误，抛出错误 */
    if (delUserDept.result !== 0) {
      throw resErrJson({ msg: '从部门里移出失败。' })
    }
    /* 删除中间表 */
    const delMiddleUserDept = await sdkInstance.middleware.mysql.delete(
      config.dbName,
      'DELETE FROM middle_user_dept WHERE is_delete=0 AND user_id=? AND dept_id=?',
      [user.id, userDept.dept_id]
    )
    logger.info({ msg: `删除用户、部门关联表－中间表:${user.company_uid}` })
    /* 返回结果判断 */
    if (delMiddleUserDept.result !== 'ok') {
      throw resErrJson({ msg: '删除用户部门关联表失败。' })
    }
  }
  /* 先把成员从部门关系接触后删除成员 （单个删除） */
  const delUser = await delCompanyUsers(companyToken, user.company_uid)
  logger.info({ msg: `删除用户:${user.company_uid}` })
  /* 如果错误，抛出错误 */
  if (delUser.result !== 0) throw resErrJson({ msg: '删除用户失败' })
  /* 更新用户表 */
  const delMiddleUser = await sdkInstance.middleware.mysql.update(
    config.dbName,
    'UPDATE middle_users SET is_delete=1 WHERE is_delete=0 AND company_uid=?',
    [user.company_uid]
  )
  logger.info({ msg: `更新用户表-中间表:${user.company_uid}` })
  /* 返回结果判断 */
  if (delMiddleUser.result !== 'ok') {
    throw resErrJson({ msg: '更新用户表失败。' })
  }
}

/* 启用用户 */
async function handleActiveUpdate(user: any) {
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  const time = await currentTime()
  logger.info({ msg: `启用用户接口：${user.company_uid}` })
  const enableUser = await companyUsersEnable(companyToken, user.company_uid)
  logger.info({ msg: `启用用户接口返回状态:${user.company_uid}` })
  if (enableUser.result !== 0) {
    logger.warn({ msg: `启用用户接口失败,user: ${JSON.stringify(user)},enableUser: ${JSON.stringify(enableUser)}` })
    return
  }
  /* 更新用户表 */
  logger.info({ msg: `启用更新用户表:${user.company_uid}` })
  const enableMiddleUser = await sdkInstance.middleware.mysql.update(
    config.dbName,
    'UPDATE middle_users SET is_delete=0, update_time=? WHERE company_uid=?',
    [time, user.company_uid]
  )
  logger.info({ msg: `启用用户表-中间表结果:${user.company_uid}` })
  /* 返回结果判断 */
  if (enableMiddleUser.result !== 'ok') {
    logger.warn({ msg: `启用更新用户表失败,user: ${JSON.stringify(user)},enableMiddleUser: ${JSON.stringify(enableMiddleUser)}` })
  }
}
/* 禁用用户 */
async function handleUserDisable(user: any) {
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  const time = await currentTime()
  /* 禁用WPS企业用户 */
  const disableUserDept = await batchDisableCompanyUsers(
    companyToken,
    user.company_uid
  )
  logger.info({ msg: `禁用用户接口:${user.company_uid}` })
  /* 如果错误，抛出错误 */
  if (disableUserDept.result !== 0) {
    logger.warn({ msg: `禁用用户失败,user: ${JSON.stringify(user)},disableUserDept: ${JSON.stringify(disableUserDept)}` })
    return
  }
  /* 更新用户表 */
  const delMiddleUser = await sdkInstance.middleware.mysql.update(
    config.dbName,
    'UPDATE middle_users SET is_delete=2, update_time=? WHERE is_delete=0 AND company_uid=?',
    [time, user.company_uid]
  )
  logger.info({ msg: `禁用用户表-中间表:${user.company_uid}` })
  /* 返回结果判断 */
  if (delMiddleUser.result !== 'ok') {
    logger.warn({ msg: `用户表禁用修改失败,user: ${JSON.stringify(user)},delMiddleUser: ${JSON.stringify(delMiddleUser)}` })
  }
}
