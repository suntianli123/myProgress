import { Context } from 'koa'
import { resErrJson, sdkCheck, resJson } from '../../util/msgCode'
import { getCompanyRootDepts } from '../dept/dept'
import { getCompanyToken } from '../authToken/func'
import {
  deptsList,
  delDepts,
  getDeptsCompanyUsers,
  batchDeleteCompanyUsers,
  getCompanyUsers,
  companyUsers,
  deptsThirdBind,
  batchActiveDepts,
  batchThirdBindDepts,
  delCompanyUsers,
  putDepts
} from '../../model/openApi/company'
import config from '../../config'
import { logger } from '../../server'
import { getAllDeptUser, getUserAll } from './func'
import { MysqlSelResp } from '../../../ecissdk/model/data'

// import sdkInstance from '../../util/sdk'
import { sdkInstance } from '../../grpc/sdk'
import { deptSyncTotal } from '../deptinit'
import { userSyncTotal } from '../userinit'
import { currentTime } from '../../util/momentTime'
import { sqlArrToTree, treeToArr } from '../../util'

const fs = require('fs')

export async function getCompanyRoot(ctx: Context) {
  const rootId = await getCompanyRootDepts()
  ctx.body = { rootId }
}

export async function addUser(ctx: Context) {
  const rootId = await getCompanyRootDepts()
  /** 获取企业token */
  const companyToken = await getCompanyToken()

  // eslint-disable-next-line camelcase
  const { login_name, password, name, third_union_id, role_id } = ctx.query

  // const userParams = {
  //   login_name: 'CD11111111',
  //   password: 'password',
  //   name: 'kevin.Feng',
  //   third_union_id: 'CD11111111',
  //   role_id: 3
  // }

  const userParams: any = {
    login_name,
    password,
    name,
    third_union_id,
    role_id: Number(role_id)
  }

  // 添加用户
  const result = await companyUsers(companyToken, userParams)

  // 激活账号
  // const result = await batchActiveDepts(companyToken, '1YLMDE')

  // const result = await batchThirdBindDepts(companyToken, {
  //   third_union_ids: 'CD11111111'
  // })

  console.log(result)
  ctx.body = { result }
}

/**
 * @path /api/v1/removeAll 测试-删除部门和数据
 * @param {object} Context
 * @returns {object}
 */
export async function removeAll(ctx: Context) {
  let res
  try {
    const rootDeptId = await getCompanyRootDepts()
    /** 递归删除部门-异步 */
    // ctx.query.name 传入根节点下子级部门名称，以删除其所有子部门，且不影响其他部门
    const { name } = ctx.request.body
    if (name) {
      const deptName = name as string
      const companyToken = await getCompanyToken()
      const { result, depts } = await deptsList(companyToken, rootDeptId, 0, 1000)
      if (result !== 0) throw new Error('获取wps部门列表失败')
      const target = depts.find(item => item.name === deptName)
      if (!target) throw new Error('目标部门不存在')
      res = resJson({ msg: `开始删除${deptName}及子级部门和成员` })
      setTimeout(async () => {
        await removeDeptUserAllByDept(target.dept_id)
        await removeMiddle()
      }, 0)
    } else {
      await removeDeptUserAll(0, rootDeptId)
      res = resJson()
    }
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}

/**
 * @name 递归删除所有 部门 用户 部门用户关联
 * @param { string } deptId 部门id
 * @param { string } rootDeptId 根部门id 判断根部门阻止删除
 */
async function removeDeptUserAll(deptId: any, rootDeptId: any) {
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  /** 获取wps部门列表 */
  // @ts-ignore
  const res = await deptsList(companyToken, `${deptId}`, 0, 1000)
  const { result, depts } = res
  if (result !== 0) {
    throw Error('获取wps部门列表失败')
  }
  /* 没有子级 可以删除 */
  if (!depts.length) {
    /* 根部门不可以删除 */
    if (deptId !== rootDeptId) {
      const companyToken = await getCompanyToken()
      /* 获取当前部门下所有用户 */
      const reslut: any[] = []
      await getDeptUserAll(deptId, -1, reslut)
      const ids = reslut.map(el => el.company_uid)
      let offset = 0
      while (offset * 50 < ids.length) {
        await batchDeleteCompanyUsers(
          companyToken,
          ids.slice(offset * 50, (offset + 1) * 50).join()
        )
        logger.info(`删除部门下的用户=${deptId} = ${JSON.stringify(ids)}`)
        offset++
      }
      /** 删除部门 */
      const dept = await delDepts(companyToken, deptId)
      logger.info(`删除部门=${deptId}`)

      /* 递归从顶部开始删除 */
      await removeDeptUserAll(0, rootDeptId)
    } else {
      /** 删除中间表 */
      const delDept = await sdkInstance.middleware.mysql.delete(
        config.dbName,
        'DELETE FROM middle_dept',
        []
      )
      sdkCheck(delDept)
      const delDeptUser = await sdkInstance.middleware.mysql.delete(
        config.dbName,
        'DELETE FROM middle_user_dept',
        []
      )
      sdkCheck(delDeptUser)
      const delUser = await sdkInstance.middleware.mysql.delete(
        config.dbName,
        'DELETE FROM middle_users',
        []
      )
      sdkCheck(delUser)
      logger.info('删除中间表数据')
    }
  } else {
    // 递归查找子级
    for (const itemDep of depts) {
      await removeDeptUserAll(itemDep.dept_id, rootDeptId)
    }
  }
}

async function removeDeptUserAllByDept(deptId: string) {
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  /** 获取wps部门列表 */
  // @ts-ignore
  const res = await deptsList(companyToken, `${deptId}`, 0, 1000)
  const { result, depts } = res
  if (result !== 0) {
    throw Error('获取wps部门列表失败')
  }
  /* 没有子级 可以删除 */
  if (!depts.length) {
    /* 根部门不可以删除 */
    const companyToken = await getCompanyToken()
    /* 获取当前部门下所有用户 */
    const reslut: any[] = []
    await getDeptUserAll(deptId, -1, reslut)
    const ids = reslut.map(el => el.company_uid)
    let offset = 0
    while (offset * 50 < ids.length) {
      await batchDeleteCompanyUsers(
        companyToken,
        ids.slice(offset * 50, (offset + 1) * 50).join()
      )
      logger.info(`删除部门下的用户=${deptId} = ${JSON.stringify(ids)}`)
      offset++
    }
    /** 获取企业token */
    const dept = await delDepts(companyToken, deptId)
    logger.info(`删除部门=${deptId}`)
  } else {
    // 递归查找子级
    for (const itemDep of depts) {
      await removeDeptUserAllByDept(itemDep.dept_id)
    }
    await removeDeptUserAllByDept(deptId)
  }
}
/**
 * @name 获取部门下成员
 */
async function getDeptUserAll(deptId: any, offset: number, reslut: any[]) {
  offset = offset + 1
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  const pageDeptUser = await getDeptsCompanyUsers(
    companyToken,
    deptId,
    offset * 1000,
    1000,
    'active,notactive,disabled'
  )
  if (pageDeptUser.result === 0 && pageDeptUser.company_users.length) {
    reslut.push(...pageDeptUser.company_users)
    await getDeptUserAll(deptId, offset, reslut)
  }
}

/**
 * @name 获取全量部门
 */
export async function getAllDept(ctx: Context) {
  let res = {}
  try {
    setTimeout(async () => {
      const rootDeptId = await getCompanyRootDepts()
      const deptList: any = []
      await getAllDeptUser(deptList, rootDeptId)
      console.log(deptList.length)
      const temp = { deptList }
      const data = JSON.stringify(temp)
      fs.writeFile('./dataDept.json', data, (err: any) => {
        if (err) {
          console.log(err)
        } else {
          console.log('写入成功')
        }
      })
    }, 0)
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}

/**
 * @name 获取全部成员
 */
export async function getAllUser(ctx: Context) {
  let res = {}
  try {
    res = resJson()
    setTimeout(async () => {
      const userList: any = []
      await getUserAll(userList, 0)
      const temp = { userList }
      const data = JSON.stringify(temp)
      fs.writeFile('./dataUser.json', data, (err: any) => {
        if (err) {
          console.log(err)
        } else {
          console.log('写入成功')
        }
      })
    }, 0)
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}

/**
 * @sqlResult sql查询接口返回信息
 * @return {result} sql结果list
 */

export async function getSQLSelResult(
  sqlResult: MysqlSelResp
): Promise<Array<any>> {
  return sqlResult.data &&
    sqlResult.data.rows &&
    Array.isArray(sqlResult.data.rows)
    ? sqlResult.data.rows
    : []
}

// 移除中间表数据
async function removeMiddle() {
  /** 删除中间表 */
  const delDept = await sdkInstance.middleware.mysql.delete(
    config.dbName,
    'DELETE FROM middle_dept',
    []
  )
  sdkCheck(delDept)
  const delUser = await sdkInstance.middleware.mysql.delete(
    config.dbName,
    'DELETE FROM middle_users',
    []
  )
  sdkCheck(delUser)
  const delDeptUser = await sdkInstance.middleware.mysql.delete(
    config.dbName,
    'DELETE FROM middle_user_dept',
    []
  )
  sdkCheck(delDeptUser)
  logger.info('删除中间表数据')
}

// 获取wps中所有部门信息
export const getAllDeptWPS = async (depts: Array<{
  dept_pid: string // 父部门id
  dept_id: string // 部门id
  name: string // 部门名
  ctime: number // 部门创建时间，秒为单位的时间戳
  order: number | string // 部门排序字段，值越大排序优先级越高
}>, offset = -1) => {
  offset++
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  const deptResult = await deptsList(companyToken, 0, offset * 1000, 1000, true)
  if (Array.isArray(deptResult.depts) && deptResult.depts.length > 0) {
    depts.push(...deptResult.depts)
    await getAllDeptWPS(depts, offset)
  }
  return depts
}

export async function removeuUserAll(ctx: Context) {
  let res
  try {
    const paramSize = ctx.query.size || '900'
    const companyToken = await getCompanyToken()
    const userResult = await getCompanyUsers(companyToken, 0, Number(paramSize), 'notactive')
    if (userResult.result !== 0) {
      throw Error('获取wps用户列表失败')
    }
    if (Array.isArray(userResult.company_users) && userResult.company_users.length > 0) {
      userResult.company_users.forEach((item) => {
        if (item.name !== 'admin') {
          delCompanyUsers(companyToken, item.company_uid)
        }
      })
    }
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}

export async function manualDeptUser(ctx: Context) {
  let res
  try {
    logger.info('开始手动执行任务')
    const arr: any = {}
    await deptSyncTotal(arr)
    await userSyncTotal(arr)
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    logger.info('修改手动执行失败', e)
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  /* 返回数据 */
  ctx.body = res
  // ctx.body = aesEncryption(res)
  return ctx
}

// 移动部门
export async function moveDebtWps(ctx: Context) {
  let res
  try {
    /* 获取表里当前部门数据 */
    const deptSQLResult: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_dept WHERE is_delete=0 and ori_dept_id=?',
      [ctx.query.deptId]
    )
    const movedeptSQL =
    deptSQLResult.data && deptSQLResult.data.rows && Array.isArray(deptSQLResult.data.rows)
      ? deptSQLResult.data.rows
      : []
    /* 获取表里父部门数据 */
    const pIdSQLResult: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_dept WHERE is_delete=0 and ori_dept_id=?',
      [ctx.query.pId]
    )
    const movePidSQL =
    pIdSQLResult.data && pIdSQLResult.data.rows && Array.isArray(pIdSQLResult.data.rows)
      ? pIdSQLResult.data.rows
      : []
    const companyToken = await getCompanyToken()
    if (!movedeptSQL || movedeptSQL.length === 0 || !movePidSQL || movePidSQL.length === 0) {
      throw Error('移动部门失败')
    }
    const userResult = await putDepts(companyToken, movedeptSQL[0].dept_id, {
      dept_pid: movePidSQL[0].dept_id,
      order: 0
    })
    if (userResult.result !== 0) {
      throw Error('移动部门失败')
    }
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}
// 添加二级部门更新部门表
export async function addDeptSqlSecDeptId(ctx: Context) {
  let res
  try {
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
    // eslint-disable-next-line eqeqeq
    if (SQLDeptList.length == 0) {
      logger.warn({ msg: `获取部门表数据失败,SQLDeptList: ${JSON.stringify(SQLDeptList)}` })
      throw resErrJson({ msg: '获取部门表数据失败。' })
    }
    const treeList = await sqlArrToTree(SQLDeptList)
    const arrList = await treeToArr(treeList, [])
    arrList.forEach((item: any) => {
      const pidData = arrList.filter((secItem: any) => secItem.ori_dept_id === item.ori_dept_pid)
      logger.info({ msg: `父部门信息,pidData: ${JSON.stringify(pidData)}` })
      if (pidData.length === 0) {
        item.org_dept_second_id = `${item.ori_dept_name}:_${item.ori_dept_id}`
      } else {
        item.org_dept_second_id = `${pidData[0].org_dept_second_id};_${item.ori_dept_name}:_${item.ori_dept_id}`
      }
    })
    logger.info({ msg: `添加二级部门结果,SQLDeptList: ${JSON.stringify(arrList)}` })
    const time = await currentTime()
    for (const deptItem of arrList) {
      if (!deptItem?.org_dept_second_id) {
        logger.warn(`未获取到二级部门信息,deptItem: ${JSON.stringify(deptItem)}`)
        continue
      }
      const secList = deptItem?.org_dept_second_id.split(';_')
      if (secList.length > 3) {
        const secPid = secList[2].split(':_')
        logger.info({ msg: `部门信息,SQLDeptList: ${JSON.stringify(deptItem)}, secPid: ${secPid[0]}--${secPid[1]}` })
        const delData = await sdkInstance.middleware.mysql.update(
          config.dbName,
          'UPDATE middle_dept SET org_dept_second_id=?, update_time=? WHERE is_delete=0 AND dept_id=?',
          [secPid[1], time, deptItem.dept_id]
        )
        logger.info({ msg: `添加二级父部门信息-中间表,delData: ${JSON.stringify(delData)}` })
        /* 如果错误，抛出错误 */
        if (delData.result !== 'ok') {
          logger.warn(`添加二级父部门信息失败,deptItem: ${JSON.stringify(deptItem)}, delData: ${JSON.stringify(delData)}`)
        }
      }
    }
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}

// 通过company_uid获取部门信息
export async function uidGetDeptInfo(ctx: Context) {
  let res
  try {
    const { companyUid } = ctx.query
    if (!companyUid) {
      logger.warn(`未获取用户company_uid,companyUid: ${companyUid}`)
      throw resErrJson({ message: '用户company_uid为空' })
    }
    const companyList: any = companyUid.toString().split(',')
    const deptList: any[] = []
    for (const item of companyList) {
      /* 获取表里当前部门数据 */
      const userDeptSQLResult: any = await sdkInstance.middleware.mysql.select(
        config.dbName,
        'SELECT * FROM middle_user_dept WHERE is_delete=0 and company_uid=?',
        [item]
      )
      const userDeptSQL =
      userDeptSQLResult.data && userDeptSQLResult.data.rows && Array.isArray(userDeptSQLResult.data.rows)
        ? userDeptSQLResult.data.rows
        : []
      if (!userDeptSQL || userDeptSQL.length === 0) {
        logger.warn(`用户部门表中数据为空,companyUid: ${item}`)
        deptList.push({ company_uid: item })
        continue
      }
      /* 获取表里部门数据 */
      const deptSQLResult: any = await sdkInstance.middleware.mysql.select(
        config.dbName,
        'SELECT * FROM middle_dept WHERE is_delete=0 and dept_id=?',
        [userDeptSQL[0].dept_id]
      )
      const deptSQL =
      deptSQLResult.data && deptSQLResult.data.rows && Array.isArray(deptSQLResult.data.rows)
        ? deptSQLResult.data.rows
        : []
      if (!deptSQL || deptSQL.length === 0) {
        deptList.push({ company_uid: item })
        logger.warn(`部门表中数据为空,companyUid: ${item}, userDeptSQL: ${JSON.stringify(userDeptSQL)}`)
      } else {
        const deptInfo = deptSQL[0]
        deptList.push({ ...deptInfo, company_uid: item })
      }
    }

    res = {
      data: deptList,
      result: '200'
    }
    // res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}

// 添加三级部门更新部门表
export async function addThirdDeptId(ctx: Context) {
  let res
  try {
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
    // eslint-disable-next-line eqeqeq
    if (SQLDeptList.length == 0) {
      logger.warn({ msg: `获取部门表数据失败,SQLDeptList: ${JSON.stringify(SQLDeptList)}` })
      throw resErrJson({ msg: '获取部门表数据失败。' })
    }
    const treeList = await sqlArrToTree(SQLDeptList)
    const arrList = await treeToArr(treeList, [])
    arrList.forEach((item: any) => {
      const pidData = arrList.filter((secItem: any) => secItem.ori_dept_id === item.ori_dept_pid)
      logger.info({ msg: `父部门信息,pidData: ${JSON.stringify(pidData)}` })
      if (pidData.length === 0) {
        item.org_dept_second_id = `${item.ori_dept_name}:_${item.ori_dept_id}`
      } else {
        item.org_dept_second_id = `${pidData[0].org_dept_second_id};_${item.ori_dept_name}:_${item.ori_dept_id}`
      }
    })
    logger.info({ msg: `添加二级部门结果,SQLDeptList: ${JSON.stringify(arrList)}` })
    const time = await currentTime()
    for (const deptItem of arrList) {
      if (!deptItem?.org_dept_second_id) {
        logger.warn(`未获取到二级部门信息,deptItem: ${JSON.stringify(deptItem)}`)
        continue
      }
      const secList = deptItem?.org_dept_second_id.split(';_')
      if (secList.length > 3) {
        const secPid = secList[3].split(':_')
        logger.info({ msg: `部门信息,SQLDeptList: ${JSON.stringify(deptItem)}, thirdPid: ${secPid[0]}--${secPid[1]}` })
        const delData = await sdkInstance.middleware.mysql.update(
          config.dbName,
          'UPDATE middle_dept SET org_dept_third_id=?, update_time=? WHERE is_delete=0 AND dept_id=?',
          [secPid[1], time, deptItem.dept_id]
        )
        logger.info({ msg: `添加三级父部门信息-中间表,delData: ${JSON.stringify(delData)}` })
        /* 如果错误，抛出错误 */
        if (delData.result !== 'ok') {
          logger.warn(`添加三级父部门信息失败,deptItem: ${JSON.stringify(deptItem)}, delData: ${JSON.stringify(delData)}`)
        }
      }
    }
    res = resJson()
  } catch (e) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(e)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}
