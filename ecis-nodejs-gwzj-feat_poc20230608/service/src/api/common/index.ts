import { Context } from 'koa'
import { resErrJson, sdkCheck, resJson } from '../../util/msgCode'
import { getCompanyRootDepts } from '../dept/dept'
import { getCompanyToken } from '../authToken/func'
import {
  deptsList,
  delDepts,
  getDeptsCompanyUsers,
  batchDeleteCompanyUsers,
  companyUsers
} from '../../model/openApi/company'
import config from '../../config'
import { logger } from '../../server'
import { getAllDeptUser, getUserAll } from './func'
import { MysqlSelResp } from '../../../ecissdk/model/data'
import { diffData } from '../../util/index'

import { sdkInstance } from '../../grpc/sdk'
import { getISCAccessToken, getUsersByCode } from '../../model/openApi/third'
import { sm4GetMessage } from '../../util/smCrypto'
import request from '../../util/request'
const https = require('https')
const agent = new https.Agent({
  rejectUnauthorized: false
})

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
    if (ctx.query.name) {
      const deptName = ctx.query.name as string
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
    const rootDeptId = await getCompanyRootDepts()
    const deptList: any = []
    await getAllDeptUser(deptList, rootDeptId)
    console.log(deptList.length)
    const temp = { deptList }
    const data = JSON.stringify(temp)
    res = data
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
    const userList: any = []
    await getUserAll(userList, 0)
    const temp = { userList }
    const data = JSON.stringify(temp)
    res = data
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
  if (sqlResult.result !== 'ok') logger.error({ msg: JSON.stringify(sqlResult) })
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

/**
 * 用户：中间表和wps表对比
 * wps数据和中间表数据比对,针对用户在wps后台操作用户表，中间表没有更新
*/
export async function diffAllUser (ctx: Context) {
  let res = {}
  try {
    // 获取wps 所有用户
    const userList: any = []
    await getUserAll(userList, 0)
    console.log(userList.length)
    // 获取中间表所有用户
    const SQLResultAllUser: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_users WHERE is_delete!=1',
      []
    )
    const users: any =
      SQLResultAllUser.data &&
      SQLResultAllUser.data.rows &&
      Array.isArray(SQLResultAllUser.data.rows)
        ? SQLResultAllUser.data.rows
        : []
    console.log(users.length)
    res = await diffData(users, 'user_id', ['user_id', 'nick_name'], userList, 'third_union_id', ['third_union_id', 'name'])
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
 * 部门：中间表和wps表对比
 * wps数据和中间表数据比对,针对用户在wps后台操作用户表，中间表没有更新
*/
export async function diffAllDept (ctx: Context) {
  let res = {}
  try {
    const rootDeptId = await getCompanyRootDepts()
    const deptList: any = []
    await getAllDeptUser(deptList, rootDeptId)
    console.log(deptList.length)
    // 获取中间表所有部门
    const SQLResultAllDept: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_dept WHERE is_delete!=1',
      []
    )
    const depts: any =
    SQLResultAllDept.data &&
    SQLResultAllDept.data.rows &&
    Array.isArray(SQLResultAllDept.data.rows)
      ? SQLResultAllDept.data.rows
      : []
    console.log(depts.length)
    res = await diffData(depts, 'dept_id', ['dept_id', 'ori_dept_name', 'dept_id_pid'], deptList, 'dept_id', ['dept_id', 'name', 'dept_pid'])
  } catch (error) {
    /** 格式化错误信息-记录错误日志 */
    const errJson = resErrJson(error)
    // 错误返回值
    res = errJson
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}

/**
 * 用户：中间表和wps表对比
 * wps数据和中间表数据比对,针对用户在wps后台操作用户表，中间表没有更新
*/
export async function diffAllUserDept (ctx: Context) {
  let res = {}
  try {
    // 获取wps 所有用户
    const userList: any = []
    await getUserAll(userList, 0)
    // 组合用户部门数据
    const tempUserDept: any = []

    for (let i = 0; i < userList.length; i++) {
      const userItem = userList[i]
      // 如果当前人存在部门,再拼装数据
      if (userItem.depts.length && userItem.third_union_id) {
        const t = {
          user_id: userItem.third_union_id,
          company_uid: userItem.company_uid,
          dept_id: '',
        }
        for (let k = 0; k < userItem.depts.length; k++) {
          t.dept_id = userItem.depts[k].id
          tempUserDept.push(t)
        }
      }
    }
    console.log('wps用户和部门关系条数', tempUserDept.length)

    // 获取中间表所有用户
    const SQLResultAllUserDept: any = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM middle_user_dept WHERE is_delete!=1',
      []
    )
    const usersDept: any =
      SQLResultAllUserDept.data &&
      SQLResultAllUserDept.data.rows &&
      Array.isArray(SQLResultAllUserDept.data.rows)
        ? SQLResultAllUserDept.data.rows
        : []
    console.log('中间表用户和部门关系条数', usersDept.length)
    res = await diffData(usersDept, 'user_id', ['user_id', 'company_uid', 'dept_id'], tempUserDept, 'user_id', ['user_id', 'company_uid', 'dept_id'])
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

export async function doDecryptSm2(enStr: any) {
  // eslint-disable-next-line no-undef
  const objData = sm4GetMessage(enStr, config.wechat.sm2PriKey, config.wechat.sm4Key)
  console.log('sm2和sm4解析结果：--', objData)
  return objData
}

export const getUserIdFromWechat = async (params: any) => {
  logger.info({ message: `企业微信i国网接口入参:${JSON.stringify(params)}` })
  const wechatUserInfo: any = await request({
    url: `${config.wechat.thirdDomin}/proxy/getUserCodeByWechatCode`,
    method: 'post',
    httpsAgent: agent,
    headers: {
      delWpsSign: true,
      'Content-Type': 'application/json;charset=utf-8',
    },
    data: params
  })
  logger.info({ msg: `企业微信用户数据, wechatUserInfo: ${wechatUserInfo}` })
  logger.info({ msg: `企业微信用户数据, wechatUserInfo-JSON: ${wechatUserInfo?.data}` })
  // eslint-disable-next-line
  if (!wechatUserInfo|| !wechatUserInfo?.data) {
    throw Error('企业微信获取成员信息失败')
  }
  const sm2UserData: any = await doDecryptSm2(wechatUserInfo.data)

  // const wechatUserInfo = { data: '308201D502206923663A90758BD54582A3A34F4463ECC7AE94C86443BCC37C0E480051A69633022100903FEF9562307E8C16E5A7201F9ACDEDC13218C20868ACB023067D489AB341E80420ECEC02A4253BCE201456AB7712594C2DFD15791D32A7849F7053C4B6FE4E4E820482016AD84351EA2F0863FAA54DABC90BAA1945425DDEC5DE8E57929F7168F701770C3D4F5B0970658AD4191AFB61456C0ECCE58AD9C8F6203A4DF93AE738F0B7E24B2565646B296B7154D66DCB53FD51F0D50092F7FC37552EAFFD1A6C73CE3F1539965186198570E0666CB9E3D9C2969864C4582DF6BFA52597E701906B294C6E41BDFCC9F4EFFECF110F45A73CB85AAA5F5AC6AC5E7A3E004C78A5562D42E8A1AF98D55257097B9CBBD2206C76944CD50DE9561CE54C75E1A0F5D3B34A3491CF83E5B717E0D7132AE3291A971EE3B58952AE69586CBCFB920D92143BE195AFC681CBFBB18A57004217B5D9B033696D467EBE6352AFD748E8FAE202239D102E18D41DA5B0D400746DC2EF0687DE665833D4152C704B2D448891884514D67DC8AE20228117172B86A1932AD07E48B189A2897DBDBECB5FFC0706C7F964307FC2FC14A773AE76CEBD28307945CECE4E4BE34BC642C09A9F91DD020178E8AF5AFA69523D4616DB97A862CDDF42EA' }
  // const sm2UserData = await sm4GetMessage(wechatUserInfo?.data, config.wechat.sm2PriKey, config.wechat.sm4Key)

  logger.info('sm2和sm4解析结果：--', sm2UserData)
  if (!sm2UserData) {
    logger.warn({ msg: `sm2UserData解密失败: ${sm2UserData}` })
    throw Error('未获取到用户信息')
  }
  const sm2doResult = JSON.parse(sm2UserData)
  if (!sm2doResult?.code) {
    logger.warn({ msg: `未获取用户信息: ${sm2UserData}` })
    throw Error('未获取到用户信息')
  }
  logger.info({ msg: `sm2Result解析: ${sm2doResult}` })

  const accessParam: any = {
    appId: config.wechat.iscAppId,
    clientSecret: config.wechat.sm4Key
  }
  const iscAccessToken = await getISCAccessToken(accessParam)
  logger.info({ msg: `获取icstoken解密结果: ${JSON.stringify(iscAccessToken)}` })
  const userParam = { code: sm2doResult?.code }
  const userData = await getUsersByCode(userParam, iscAccessToken?.data?.accessToken)
  logger.info({ message: `查询i国网用户信息返回数据:${JSON.stringify(userData)}` })

  if (!userData || !userData?.data || !userData?.data?.unicode) {
    logger.warn({ msg: `查询i国网用户接口返回失败: ${JSON.stringify(userData)}` })
    throw Error('未获取到用户信息')
  }

  const curWhiteSQLResult: any = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM middle_white_users WHERE is_delete=0 and user_id=?',
    [userData?.data?.unicode]
  )
  const curSQLWhiteList =
  curWhiteSQLResult.data &&
  curWhiteSQLResult.data.rows &&
    Array.isArray(curWhiteSQLResult.data.rows)
    ? curWhiteSQLResult.data.rows
    : []
  if (!curSQLWhiteList || curSQLWhiteList.length === 0) {
    logger.info({ msg: `白名单中不存在此用户, userLily: ${JSON.stringify(userData?.data)}` })
    throw Error('白名单未获取到此用户信息')
  } else {
    return curSQLWhiteList[0]
  }
}
