// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import { resErrJson } from '../../util/msgCode'
import config from '../../config'
import {
  companyUsers,
  usersAddCompany,
  usersDelCompany,
  delCompanyUsers,
  batchActiveDepts,
  batchPutDeptsOrder,
  batchDisableCompanyUsers,
  companyUsersEnable,
  putCompanyUsers
} from '../../model/openApi/company'
import { logger } from '../../server'
import { getCompanyToken } from '../authToken/func'
import { currentTime } from '../../util/momentTime'

/**
 * @name  用户同步
 * @param {Array} userList 第三方全量用户列表
 * @returns {object} object
 */
/* 用户同步 */
export async function totalUserSync(userList: any): Promise<any> {
  /* 查询中间表所有用户 */
  const SQLUserCount: any = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT COUNT(0) FROM middle_users WHERE is_delete !=1',
    []
  )
  logger.info({ SQLUserCount: `用户数量：${JSON.stringify(SQLUserCount)}` })
  let count =
      SQLUserCount.data && SQLUserCount.data.rows && Array.isArray(SQLUserCount.data.rows)
        ? SQLUserCount.data.rows
        : []
  count = count[0] && count[0]['COUNT(0)']
  let SQLUserList: any[] = []
  if (count < 5000) {
    /* 查询中间表所有用户 */
    const SQLResult = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_users WHERE is_delete !=1',
      []
    )
    SQLUserList =
        SQLResult.data && SQLResult.data.rows && Array.isArray(SQLResult.data.rows)
          ? SQLResult.data.rows
          : []
  } else {
    let temp: any[] = []
    const size = 5000
    for (let page = 0; page < count / size; page++) {
      const SQLResult = await sdkInstance.middleware.mysql.select(
        config.dbName,
        'SELECT * FROM middle_users WHERE is_delete !=1 LIMIT ?,?',
        [page * size, size]
      )
      temp =
          SQLResult.data && SQLResult.data.rows && Array.isArray(SQLResult.data.rows)
            ? SQLResult.data.rows
            : []
      SQLUserList.push(...temp)
      temp = []
    }
  }
  logger.info({ msg: `获取sql用户数据:${JSON.stringify(SQLUserList)}` })
  /* 第一次同步中间表为空 */
  if (SQLUserList.length === 0) {
    /* 新增用户方法 */
    userList && userList.length !== 0 && (await handleAddUser(userList))
  } else {
    if (SQLUserList && SQLUserList.length !== 0) {
      /* 对比差异 */
      const diff = await handleCheckNeed(userList, SQLUserList)
      /* 新增用户方法 */
      diff.needInsert &&
        diff.needInsert.length !== 0 &&
        (await handleAddUser(diff.needInsert))
      /* 删除用户方法 */
      diff.needDelete &&
        diff.needDelete.length !== 0 &&
        (await handleDelUser(diff.needDelete))
      /* 修改用户方法 */
      diff.needUpDate &&
        diff.needUpDate.length !== 0 &&
        (await handleUpdateUser(diff.needUpDate))
    }
  }
  return { result: 200, msg: '同步用户完成' }
}

/* 对比差异 */
export async function handleCheckNeed(
  userList: any,
  SQLUserList: any
): Promise<any> {
  const needInsert: any[] = []
  const needDelete: any[] = []
  let needUpDate: any[] = []
  /* 遍历对比需要新增的用户 */
  for (const user of userList) {
    /* 使用三方用户account去SQL表的用户数据里查询，返回boolean值 */
    const isNeedAdd = SQLUserList.some(
      (sqlUser: any) => sqlUser.user_id === user.id
    )
    /* 没有查询到，push进新增的数组里 */
    if (!isNeedAdd) needInsert.push(user)
  }
  /* 遍历对比需要删除的用户 */
  for (const sqlUser of SQLUserList) {
    /* 使用三方用户account去SQL表的用户数据里查询，返回boolean值 */
    const isNeedDel = userList.some((user: any) => user.id === sqlUser.user_id)
    /* 没有查询到，push进删除的数组里 */
    if (!isNeedDel) needDelete.push(sqlUser)
  }
  /* 遍历对比出需要修改的用户 */
  needUpDate = await handleCheckNeedDept(userList, SQLUserList)
  return {
    needDelete,
    needInsert,
    needUpDate
  }
}

/* 对比需要修改的用户下部门是否有修改 */
async function handleCheckNeedDept(userList: any, SQLUserList: any) {
  /* 获取企业token */
  const companyToken = await getCompanyToken()
  /* 第一次同步，如果中间表里不存在数据直接 */
  if (!SQLUserList || SQLUserList.length === 0) return []
  /* 定义一个需要更新的用户数组 */
  const updateUser = []
  for (const user of userList) {
    logger.info({ msg: `三方用户和部门信息:${JSON.stringify(user)}` })
    for (let i = 0; i < user.dept.length; i++) {
      /* 查询中间表所有用户 */
      const SQLResult = await sdkInstance.middleware.mysql.select(
        config.dbName,
        'SELECT * FROM middle_dept WHERE is_delete=0 AND ori_dept_id=?',
        [user.dept[i].departmentId]
      )
      const SQLUserDepts =
        SQLResult.data &&
        SQLResult.data.rows &&
        Array.isArray(SQLResult.data.rows)
          ? SQLResult.data.rows
          : []
      if (!SQLUserDepts || SQLUserDepts.length === 0) {
        throw resErrJson({
          msg: `中间表部门不存在！请新同步部门后重试。 ${JSON.stringify(
            user.dept[i]
          )}`
        })
      }
      user.dept[i].dept_id = SQLUserDepts[0].dept_id
    }
    for (const sqlUser of SQLUserList) {
      /* 判断用户名称是否相同 */
      if (user.id === sqlUser.user_id) {
        /* 将sql用户的WPSid 赋值给三方用户信息下 */
        user.company_uid = sqlUser.company_uid
        /* 名字不一样的需要修改 */
        const isNameNotSame = user.name !== sqlUser.nick_name
        if (isNameNotSame) user.newName = user.name
        /* 再查一边该用户在表中所有部门 */
        /* 查询中间表所有用户 */
        const SQLResult = await sdkInstance.middleware.mysql.select(
          config.dbName,
          'SELECT * FROM middle_user_dept WHERE is_delete=0 AND user_id=?',
          [user.id]
        )
        const SQLUserDeptList =
          SQLResult.data &&
          SQLResult.data.rows &&
          Array.isArray(SQLResult.data.rows)
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
              (sqlUserDept: any) =>
                // eslint-disable-next-line eqeqeq
                userDept.departmentId == sqlUserDept.ori_dept_id
            )
            /* 需要新添加的部门list */
            if (!isNeedAdd) insertList.push(userDept)
          }
          /* 判断是否需要从部门中删除 */
          for (const sqlUserDept of SQLUserDeptList) {
            const isNeedAdd = user.dept.some(
              (userDept: any) =>
              // eslint-disable-next-line eqeqeq
                userDept.departmentId == sqlUserDept.ori_dept_id
            )
            /* 需要从部门中删除list */
            if (!isNeedAdd) deleteList.push(sqlUserDept)
          }
        }
        user.insertUserDept =
          insertList && insertList.length !== 0 ? insertList : []
        user.deleteUserDept =
          deleteList && deleteList.length !== 0 ? deleteList : []
        /* 满足修改条件的 */
        if (
          isNameNotSame ||
          user.insertUserDept.length !== 0 ||
          user.deleteUserDept.length !== 0
        ) {
          updateUser.push(user)
        }
      }
    }
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
      user.company_uid = SQLUserDeptLists[0].company_uid
      updateUser.push(user)
    }
  }
  /*
   * 此时返回需要更新修改的用户信息里包含需要部门新增成员和部门删除成员
   * 返回需要更新的用户 */
  /* 需要过滤下update列表 */
  const updateList = updateUser.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
  return updateList
}

/* 创建企业成员 */
async function handleAddUser(insertUserList: any): Promise<any> {
  const time = await currentTime()
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  for (const user of insertUserList) {
    /* 调用创建企业成员WPS接口 */
    const userParams = {
      login_name: user.loginName,
      password: user.password,
      name: user.name,
      third_union_id: user.id,
      role_id: 3
    }
    logger.info({ msg: `创建人员入参:${JSON.stringify(userParams)}` })
    const createCompanyUsers = await companyUsers(companyToken, userParams)
    logger.info({ msg: `创建人员返回结果:${JSON.stringify(createCompanyUsers)}` })
    logger.info({ msg: `创建成员:${user.id}, name:${user.name} ` })
    if (createCompanyUsers.result !== 0) {
      logger.warn({ msg: `创建成员失败,user: ${JSON.stringify(user)},createCompanyUsers: ${JSON.stringify(createCompanyUsers)}` })
      continue
    }
    /* 存入中间表的是接口返回的数据 */
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
      logger.warn({ msg: `新增同步用户表失败,user: ${JSON.stringify(user)},insertMiddleUser:${JSON.stringify(insertMiddleUser)}` })
    }
    /* todo: 创建完用户后需要激活一下用户，注释激活接口 */
    await batchActiveDepts(companyToken, createCompanyUsers.company_uid)
    /* 将企业成员同步到部门下 */
    for (const userDept of user.dept) {
      /* 获取表里部门数据 */
      const curUserDeptSQLResult: any =
        await sdkInstance.middleware.mysql.select(
          config.dbName,
          'SELECT * FROM middle_dept WHERE is_delete=0 and ori_dept_id=?',
          [userDept.departmentId]
        )
      const curSQLDeptList =
        curUserDeptSQLResult.data &&
        curUserDeptSQLResult.data.rows &&
        Array.isArray(curUserDeptSQLResult.data.rows)
          ? curUserDeptSQLResult.data.rows
          : []
      if (curSQLDeptList.length === 0) {
        logger.warn({ msg: `用户关联部门中间表不存在,userDept: ${JSON.stringify(userDept)}` })
        continue
      }
      const deptId = curSQLDeptList[0].dept_id
      /* 将企业成员同步到部门下 */
      const pushUserDept = await usersAddCompany(
        companyToken,
        deptId,
        createCompanyUsers.company_uid
      )
      logger.info({ msg: `将企业成员同步到部门下,user:${JSON.stringify(user)}` })
      /* 如果错误，抛出错误 */
      if (pushUserDept.result !== 0) {
        logger.warn({ msg: `同步部门失败,user:${JSON.stringify(user)},pushUserDept:${JSON.stringify(pushUserDept)}` })
        continue
      }
      /* 将信息同步到关联表中 */
      const insertMiddleUserDept = await sdkInstance.middleware.mysql.insert(
        config.dbName,
        'INSERT INTO middle_user_dept (user_id, company_uid, ori_dept_id, dept_id, user_order, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          user.id,
          createCompanyUsers.company_uid,
          userDept.departmentId,
          deptId,
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
        logger.warn({ msg: `增同步用户部门关联表失败,user:${JSON.stringify(user)},userDept: ${JSON.stringify(userDept)},insertMiddleUserDept:${JSON.stringify(insertMiddleUserDept)}` })
      }
      const order = 1000000 - user.order
      const orderUserInDept = await batchPutDeptsOrder(companyToken, {
        depts: [
          {
            company_uid: createCompanyUsers.company_uid,
            dept_id: deptId,
            order
          }
        ]
      })
      logger.info({ msg: `修改成员order排序，WPS接口,createCompanyUsers: ${JSON.stringify(createCompanyUsers)}` })
      /* 如果错误，抛出错误 */
      if (orderUserInDept.result !== 0) {
        logger.warn({ msg: `修改企业成员order失败,createCompanyUsers: ${JSON.stringify(createCompanyUsers)},orderUserInDept: ${JSON.stringify(orderUserInDept)}` })
      }
    }
    /* 用户是需要禁用的。 */
    // eslint-disable-next-line
    // if (user.status != '1') {
    //   user.company_uid = createCompanyUsers.company_uid
    //   /* 禁用用户 */
    //   await handleUserDisable(user) // 禁用
    // }
  }
}

/* 删除用户方法 */
async function handleDelUser(delUserList: any) {
  for (const delUser of delUserList) {
    logger.info({ msg: `将成员从部门里移出每一项:${JSON.stringify(delUser)}` })
    /* 查询中间表所有用户 */
    const SQLResult = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_user_dept WHERE is_delete=0 AND user_id=?',
      [delUser.user_id]
    )
    const SQLUserDeptList =
      SQLResult.data &&
      SQLResult.data.rows &&
      Array.isArray(SQLResult.data.rows)
        ? SQLResult.data.rows
        : []
    delUser.dept = SQLUserDeptList
  }
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  for (const user of delUserList) {
    for (const userDept of user.dept) {
      logger.info({
        msg: `将成员从部门里移出之前: userDept=${JSON.stringify(
          userDept
        )}, user=${JSON.stringify(user)}`
      })
      /* 将成员从部门里移除 */
      const delUserDept = await usersDelCompany(
        companyToken,
        userDept.dept_id,
        user.company_uid
      )
      logger.info({ msg: `将成员从部门里移出:${user.company_uid}` })
      /* 如果错误，抛出错误 */
      if (delUserDept.result !== 0) {
        logger.warn({ msg: `将成员从部门里移除失败,user: ${JSON.stringify(user)},userDept: ${JSON.stringify(userDept)},delUserDept: ${JSON.stringify(delUserDept)}` })
        continue
      }
      const delMiddleUserDept = await sdkInstance.middleware.mysql.delete(
        config.dbName,
        'DELETE FROM middle_user_dept WHERE is_delete=0 AND user_id=? AND dept_id=?',
        [user.user_id, userDept.dept_id]
      )
      logger.info({ msg: `删除用户、部门关联表－中间表:${user.company_uid}` })
      /* 返回结果判断 */
      if (delMiddleUserDept.result !== 'ok') {
        logger.warn({ msg: `删除用户部门关联表失败,user: ${JSON.stringify(user)},userDept: ${JSON.stringify(userDept)},delMiddleUserDept: ${JSON.stringify(delMiddleUserDept)}` })
      }
    }
    /* 先把成员从部门关系接触后删除成员 （单个删除） */
    const delUser = await delCompanyUsers(companyToken, user.company_uid)
    logger.info({ msg: `删除用户:${user.company_uid}` })
    /* 如果错误，抛出错误 */
    if (delUser.result !== 0) {
      logger.warn({ msg: `wps侧删除用户失败,user: ${JSON.stringify(user)},delUser: ${JSON.stringify(delUser)}` })
      continue
    }
    /* 更新用户表 */
    const delMiddleUser = await sdkInstance.middleware.mysql.update(
      config.dbName,
      'UPDATE middle_users SET is_delete=1 WHERE is_delete=0 AND company_uid=?',
      [user.company_uid]
    )
    logger.info({ msg: `更新用户表-中间表:${user.company_uid}` })
    /* 返回结果判断 */
    if (delMiddleUser.result !== 'ok') {
      logger.warn({ msg: `删除用户更新用户表失败。,user: ${JSON.stringify(user)},delMiddleUser: ${JSON.stringify(delMiddleUser)}` })
    }
  }
}

/* 修改用户信息 */
async function handleUpdateUser(updateUserList: any) {
  /* 当前时间 */
  const time = await currentTime()

  /** 获取企业token */
  const companyToken = await getCompanyToken()
  /* 是否只对用户的名称做修改其他的信息是否需要判断 */
  for (const user of updateUserList) {
    /* 如果用户的名称有修改 */
    if (user.newName && user.newName !== '') {
      /* 批量将成员添加到部门 */
      const putUserParams = {
        name: user.newName
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
        logger.warn({ msg: `wps侧修改企业成员失败。,user: ${JSON.stringify(user)},putUsers: ${JSON.stringify(putUsers)}` })
        continue
      }
      /* 更新用户表 */
      const delMiddleUser = await sdkInstance.middleware.mysql.update(
        config.dbName,
        'UPDATE middle_users SET nick_name=?, update_time=? WHERE is_delete=0 AND user_id=?',
        [user.newName, time, user.id]
      )
      logger.info({ msg: `修改成员－中间表:${user.company_uid}` })
      /* 返回结果判断 */
      if (delMiddleUser.result !== 'ok') {
        logger.warn({ msg: `更新用户表失败。,user: ${JSON.stringify(user)},delMiddleUser: ${JSON.stringify(delMiddleUser)}` })
      }
    }

    /* 判断用户信息里是否有需要新增的部门数据 */
    if (user.insertUserDept && user.insertUserDept.length !== 0) {
      /* 遍历用户信息里需要添加成员的部门，在部门下添加企业成员 */
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
          const insertMiddleUserDept =
            await sdkInstance.middleware.mysql.insert(
              config.dbName,
              'INSERT INTO middle_user_dept (user_id, company_uid, ori_dept_id, dept_id, user_order, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [
                user.id,
                user.company_uid,
                userDept.departmentId,
                userDept.dept_id,
                user.order,
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
            logger.warn({ msg: `新增用户关联表失败,user: ${JSON.stringify(user)},userDept: ${JSON.stringify(userDept)},insertMiddleUserDept: ${JSON.stringify(insertMiddleUserDept)}` })
          }
        }
      }
    }

    /* 判断用户信息里是否有需要移出的部门数据 */
    if (user.deleteUserDept && user.deleteUserDept.length !== 0) {
      /* 遍历用户信息里需要移出成员的部门，在部门下移出企业成员 */
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
    /* 用户是需要禁用的。 */
    // eslint-disable-next-line
    // if (user.status != '1') {
    //   /* 禁用用户 */
    //   await handleUserDisable(user) // 禁用
    // }
    for (const userDept of user.dept) {
      const order = 1000000 - user.order
      const orderUserInDept = await batchPutDeptsOrder(companyToken, {
        depts: [
          {
            company_uid: user.company_uid,
            dept_id: userDept.dept_id,
            order
          }
        ]
      })
      logger.info({ msg: `修改成员order排序，WPS接口:${user.company_uid}` })
      /* 如果错误，抛出错误 */
      if (orderUserInDept.result !== 0) {
        logger.info({ msg: `修改企业成员order失败,user: ${JSON.stringify(user)},userDept: ${JSON.stringify(userDept)},orderUserInDept: ${JSON.stringify(orderUserInDept)}` })
        continue
      }
      const delMiddleUser = await sdkInstance.middleware.mysql.update(
        config.dbName,
        'UPDATE middle_user_dept SET user_order=? WHERE is_delete=0 AND company_uid=?',
        [user.order, user.company_uid]
      )
      logger.info({ msg: `更新用户表-中间表:${user.company_uid}` })
      /* 返回结果判断 */
      if (delMiddleUser.result !== 'ok') {
        logger.warn({ msg: `修改企业成员order更新用户表失败,user: ${JSON.stringify(user)},delMiddleUser: ${JSON.stringify(delMiddleUser)}` })
      }
    }
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
  /* 查询中间表用户的部门数据 */
  const SQLDeptResult = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_user_dept WHERE user_id=?',
    [user.user_id]
  )
  const SQLUserDeptLists =
    SQLDeptResult.data && SQLDeptResult.data.rows && Array.isArray(SQLDeptResult.data.rows)
      ? SQLDeptResult.data.rows
      : []
  if (SQLUserDeptLists.length !== 0) {
    const order = 1000000 - user.order
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
      logger.warn({ msg: `修改企业成员order失败,user: ${JSON.stringify(user)},orderUserInDept: ${JSON.stringify(orderUserInDept)}` })
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
    logger.info({ msg: '从部门里移出失败。' })
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
    logger.info({ msg: '更新用户表失败。' })
  }
}
