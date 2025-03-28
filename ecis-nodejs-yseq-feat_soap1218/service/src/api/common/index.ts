/* eslint-disable camelcase */
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
  putCompanyUsers
} from '../../model/openApi/company'
import config from '../../config'
// import { logger } from '../../server'
import { getAllDeptUser, getUserAll } from './func'
import { MysqlSelResp } from '../../../ecissdk/model/data'
import * as XLSX from 'xlsx'
import { sdkInstance } from '../../grpc/sdk'
import axios from 'axios'
import { logger } from '../../ins'
import { currentTime } from '../../util/momentTime'
import { getThirdUsers } from '../userinit'
const fs = require('fs')
const path = require('path')

export const accountConfig = {
  comp_uid: 'comp_uid',
  user_name: 'user_name',
  login_name: 'login_name'
}
export async function getCompanyRoot(ctx: Context) {
  const rootId = await getCompanyRootDepts()
  ctx.body = { rootId }
}

export async function addUser(ctx: Context) {
  console.log('headers ', ctx.headers)
  console.log('body', ctx.query)
  console.log(ctx.request.body)
  const userParams = {
    login_name: ctx.request.body.loginName,
    password: ctx.request.body.password,
    name: ctx.request.body.name,
    third_union_id: ctx.request.body.id,
    role_id: 3
  }
  // 获取企业Token
  const companyToken = await getCompanyToken()
  // 添加企业用户
  const createCompanyUsers = await companyUsers(companyToken, userParams)
  // 激活用户
  // await batchActiveDepts(companyToken, createCompanyUsers.company_uid)
  ctx.status = 200
  ctx.body = resJson()
  return ctx
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

export async function deleteCookie(ctx: Context) {
  const { url, cookies } = ctx
  const targetUrl: any = ctx.request.query.targetUrl
  logger.info({
    type: 'cookie信息',
    data: cookies.get('wps_sid')
  })
  const wpsSid = cookies.get('wps_sid')
  if (wpsSid) {
    const preWpsSidCache = await sdkInstance.middleware.cache.get('wps_sid')
    const preWpsSid = preWpsSidCache && preWpsSidCache.data && preWpsSidCache.data.data
    ctx.cookies.set('wps_sid', '')
  }
  // wpsSid && (await sdkInstance.middleware.cache.set('wps_sid', wpsSid))
  logger.info({
    type: '重定向地址',
    data: targetUrl
  })
  ctx.redirect(targetUrl)
  ctx.status = 302
}

export async function getAccessToken() {
  const url = `${config.third.wechat.domain}/cgi-bin/gettoken?corpid=${config.third.wechat.corpid}&corpsecret=${config.third.wechat.corpsecret}`
  const res = await axios.get(url)
  let body: any
  // eslint-disable-next-line camelcase
  const { access_token, errcode } = res?.data || {}
  if (errcode !== 0) {
    logger.error('获取access_token失败')
    body = ''
  }
  // eslint-disable-next-line camelcase
  body = access_token
  return body
}

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
 * 加密用户ID
 * @param userId
 */
// wpsopen
export interface OpenGetIdConfuseParams {
  queryStr: string // 格式：a=x&b=y
}
export async function encryptUserId(userId: string) {
  const params: OpenGetIdConfuseParams = {
    queryStr: `raw_text=${userId}`
  }
  const result = await sdkInstance.service.wpsopen.getIdConfuse(params)
  if (
    result &&
    result.result === 'ok' &&
    result.data &&
    result.data.confuse_result
  ) {
    return result.data.confuse_result
  } else {
    throw new Error(`加密用户或部门ID：${userId}失败!${result.msg}`)
  }
}

async function syncAccountByExcel(accountListOrigin: any[]) {
  let res
  try {
    for (const userAccount of accountListOrigin) {
      const compUid = userAccount.comp_uid
      const loginName = userAccount.login_name
      // 加密获得云文档用户ID
      const wpsUserId = await encryptUserId(compUid)
      const updateResult = await sdkInstance.middleware.mysql.update(
        config.dbName,
        'UPDATE match_wps_user SET wps_account = ? WHERE binary wps_user_id = ?',
        [loginName, wpsUserId]
      )
      logger.info(`导入账号 comp_uid：【${compUid}】 login_name：【${loginName}】 wps_user_id：【${wpsUserId}】,updateResult：【${updateResult.result}】`)
    }
    logger.info('账号数据导入成功!数据量：【' + accountListOrigin.length + '】')
    res = resJson({ data: '账号数据导入成功!数据量：【' + accountListOrigin.length + '】' })
  } catch (e) {
    const msg = `账号数据导入异常:${e}`
    logger.error({ msg: `${msg}` })
    res = resErrJson(e)
  }
  return res
}

/**
 * @path /api/v1/uploadExcelAccount
 * @param { Context } ctx
 */
export async function uploadExcelAccount(ctx: Context) {
  let res
  try {
    const fileResource = await fileWriteStream(ctx)
    const excelData = loadDataFromExcel(fileResource)
    const mapData = mapDataExcelResult(excelData, [
      { sheetName: '账号', option: accountConfig }
    ])
    setTimeout(async () => {
      const { 账号: accountList } = mapData
      await syncAccountByExcel(accountList)
      logger.info('账号导入完成')
    }, 0)
    res = resJson({ data: '上传成功，开始同步' })
  } catch (e) {
    res = resErrJson(e)
  }
  ctx.status = 200
  ctx.body = res
  return ctx
}

/**
 * @param {Context} ctx
 * @returns filePath 文件上传后的绝对路径
 */
export function fileWriteStream(ctx: Context): Promise<string> {
  return new Promise((resolve, reject) => {
    const file =
      !Array.isArray(ctx.request.files.file) && ctx.request.files.file
    logger.info(`文件大小:${file.size}`)
    const fileReader = fs.createReadStream(file.path)
    const filePath = path.join(__dirname)
    // 拼接绝对路径
    const fileResource = filePath + `/${file.name}`
    // 判断 /static/upload 文件夹是否存在，不存在的话创建一个
    if (!fs.existsSync(filePath)) {
      fs.mkdir(filePath, (err: any) => {
        if (err) {
          reject(err)
        }
      })
    }
    /* 使用 createWriteStream 写入数据，然后使用管道流pipe拼接 */
    const writeStream = fs.createWriteStream(fileResource)
    if (fs.existsSync(filePath)) {
      fileReader
        .pipe(writeStream, { end: true })
        .on('finish', () => {
          resolve(fileResource)
        })
        .on('error', (err: any) => {
          reject(err)
        })
    }
  })
}

export function loadDataFromExcel(filePath: string, keep = false) {
  /**
   * XLSX.readFile()
   * NODE ONLY! Attempts to read filename and parse
   */
  const workbook = XLSX.readFile(filePath, { type: 'binary' })
  if (!keep) fs.unlink(filePath, () => { })
  const sheetNames = workbook.SheetNames
  // 工作表名称集合
  const draftObj: any = {}
  for (const sheet of sheetNames) {
    // 通过工作表名称来获取指定工作表
    const worksheet = workbook.Sheets[sheet]
    const header = Object.keys(worksheet).filter(
      key =>
        key.indexOf('1') === key.length - 1 &&
        key.slice(0, key.indexOf('1')).length === 1
    )
    // 获取最大行数
    const rows = Math.max(
      ...header.map(head => {
        head = head.replace(/1/, '')
        return Object.keys(worksheet).filter(item => item.indexOf(head) !== -1)
          .length
      })
    )
    // 每个sheet页创建一个数组
    draftObj[sheet] = []
    // 从第二行开始依次遍历
    for (let i = 2; i <= rows; i++) {
      // 每行为一个对象
      const tempObj: any = {}
      // 遍历每个单元格
      header.forEach(head => {
        const key = head.slice(0, head.length - 1)
        if (worksheet[`${key}${i}`]) {
          tempObj[worksheet[`${key}1`].v] = worksheet[`${key}${i}`].v
        } else {
          // 单元格没有数据存为空字符
          tempObj[worksheet[`${key}1`].v] = ''
        }
      })
      draftObj[sheet].push(tempObj)
    }
  }
  return draftObj
}

export function mapDataExcelResult(
  draftObj: any,
  sheetList: Array<{ sheetName: string; option: { [key: string]: string } }>
) {
  const sheetNames = Object.keys(draftObj)
  for (const sheet of sheetList) {
    if (!sheetNames.some(sh => sh === sheet.sheetName)) {
      logger.error(`表格有误,${sheet.sheetName}页不存在`)
      throw new Error(`表格有误,${sheet.sheetName}页不存在`)
    }
    // 根据每个sheet页对应的字段映射关系option处理数据
    draftObj[sheet.sheetName] = draftObj[sheet.sheetName].map((item: any) => {
      const keys = Object.keys(item)
      const resItem = JSON.parse(JSON.stringify(sheet.option))
      keys.forEach(key => {
        const head =
          resItem && Object.keys(resItem).find(opt => resItem[opt] === key)
        head && (resItem[head] = item[key])
      })
      return resItem
    })
  }
  return draftObj
}

/**
 * @name 获取全部企业成员
 */
async function getCompanyUserAll(offset: number, limit: number, status: string, reslut: any[]) {
  /** 获取企业token */
  const companyToken = await getCompanyToken(false)
  const pageDeptUser = await getCompanyUsers(
    companyToken,
    offset,
    limit,
    status
  )
  logger.info('GetCompanyUserAll, offset:【' + offset + '】,length:【' + pageDeptUser.company_users.length + '】')
  if (pageDeptUser.result === 0 && pageDeptUser.company_users.length) {
    reslut.push(...pageDeptUser.company_users)
    offset = offset + limit
    await getCompanyUserAll(offset, limit, status, reslut)
  }
}

/**
 * 存储WPS存量用户
 * @param ctx
 */
export async function matchWpsUser(ctx: Context) {
  let status = ctx.query.status
  if (!status || status === '') {
    status = 'active'
  }
  const wpsUserList: any[] = []
  await getCompanyUserAll(0, 1000, status.toString(), wpsUserList)
  logger.info(`WPS存量用户数据量：【${wpsUserList.length}】`)
  for (const wpsUser of wpsUserList) {
    const SQLResult = await sdkInstance.middleware.mysql.select(
      config.dbName,
      'SELECT * FROM match_wps_user WHERE binary wps_user_id = ?',
      [wpsUser.company_uid]
    )
    const SQLUserList =
      SQLResult.data &&
        SQLResult.data.rows &&
        Array.isArray(SQLResult.data.rows)
        ? SQLResult.data.rows
        : []
    if (SQLUserList.length > 0) {
      logger.info({
        type: 'ID重复的用户',
        data: `【用户名】：${wpsUser.name}, 【ID】: ${wpsUser.company_uid}`
      })
      continue
    }
    /* 存入中间表 */
    const insertWpsUser = await sdkInstance.middleware.mysql.insert(
      config.dbName,
      'INSERT INTO match_wps_user (wps_user_id, wps_user_name) VALUES (?, ?)',
      [
        wpsUser.company_uid,
        wpsUser.name
      ]
    )
    /* 返回结果判断 */
    if (insertWpsUser.result !== 'ok') {
      logger.error({
        type: '存储wps用户失败',
        data: insertWpsUser
      })
      logger.error(`WPS存量用户转储失败！【${wpsUser.company_uid}】【${wpsUser.name}】`)
    }
  }
  ctx.status = 200
  ctx.body = resJson({ msg: `WPS存量用户数据处理完毕，数据量：【${wpsUserList.length}】` })
  return ctx
}

/**
 * 匹配第三方ID
 * @param ctx
 */
export async function matchStart(ctx: Context) {
  /* 查询WPS存量用户 */
  const SQLResult = await sdkInstance.middleware.mysql.select(
    config.dbName,
    'SELECT * FROM match_wps_user WHERE binary third_user_id IS NULL',
    []
  )
  const wpsUserList =
    SQLResult.data && SQLResult.data.rows && Array.isArray(SQLResult.data.rows)
      ? SQLResult.data.rows
      : []
  const companyToken = await getCompanyToken()
  logger.info(`开始匹配第三方ID，数据量：【${wpsUserList.length}】`)
  let matchSuccessCount = 0
  let matchFailedCount = 0
  for (const wpsUser of wpsUserList) {
    const account = wpsUser.wps_account
    const thirdUserData = await getThirdUsers()
    // 三方数据
    const result = thirdUserData.filter((item: any) => {
      return account === item.userid
    })
    if (result.length === 1) {
      const thirdUser = result[0]
      // 更新第三方ID
      await deptsThirdBind(companyToken, wpsUser.wps_user_id, { third_union_id: thirdUser.userid })
      logger.info({ msg: `修改成员WPS接口:用户名：${thirdUser.account_name}, 【云文档ID】${wpsUser.wps_user_id}` })
      const time = currentTime()
      /* 存入中间表的是接口返回的数据 */
      const insertMiddleUser = await sdkInstance.middleware.mysql.insert(
        config.dbName,
        'INSERT INTO middle_users (user_id, nick_name, company_uid, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          thirdUser.userid,
          thirdUser.name,
          wpsUser.wps_user_id,
          time,
          time,
          'admin',
          'admin',
          0
        ]
      )
      if (insertMiddleUser.result !== 'ok') {
        logger.error({ type: '增量用户同步到中间标失败', data: insertMiddleUser })
      }
      logger.info({
        type: '增量用户同步到中间表',
        data: `用户名：${thirdUser.name}, 三方ID: ${thirdUser.userid}, wps用户ID: ${wpsUser.wps_user_id}`
      })
      await sdkInstance.middleware.mysql.update(
        config.dbName,
        'UPDATE match_wps_user SET third_user_id = ? WHERE binary id = ?',
        [thirdUser.userid, wpsUser.id]
      )
      await sdkInstance.middleware.mysql.update(
        config.dbName,
        'UPDATE match_third_user SET wps_user_id = ? WHERE id = ?',
        [wpsUser.wps_user_id, thirdUser.userid]
      )
      matchSuccessCount++
    } else {
      matchFailedCount++
    }
  }
  logger.info(`WPS存量用户第三方ID匹配完毕，总数据量：【${wpsUserList.length}】，匹配成功：【${matchSuccessCount}】，匹配失败：【${matchFailedCount}】`)
  ctx.status = 200
  ctx.body = resJson({ msg: `WPS存量用户第三方ID匹配完毕，总数据量：【${wpsUserList.length}】，匹配成功：【${matchSuccessCount}】，匹配失败：【${matchFailedCount}】` })
  return ctx
}

export async function handleWPSUser(ctx: Context) {
  const wpsUserList: any = []
  await getUserAll(wpsUserList, 0)
  const wpsUserExcludeAdmin = wpsUserList.filter((item: any) => {
    return item.third_union_id !== ''
  })
  setTimeout(async () => {
    for (const item of wpsUserExcludeAdmin) {
      const time = currentTime()
      // wps用户数据落用户中间表
      const insertMiddleUser = await sdkInstance.middleware.mysql.insert(
        config.dbName,
        'INSERT INTO middle_users (user_id, nick_name, company_uid, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          item.third_union_id,
          item.name,
          item.company_uid,
          time,
          time,
          'admin',
          'admin',
          0
        ]
      )
      if (insertMiddleUser.result !== 'ok') {
        logger.error({
          type: '插入用户中间表失败',
          data: insertMiddleUser
        })
      }
    }
  }, 0)
  ctx.status = 200
  ctx.body = '操作成功'
  return ctx
}

export async function UnionMiddleUserDept(ctx: Context) {
  const wpsUserList: any = []
  await getUserAll(wpsUserList, 0)
  const wpsUserExcludeAdmin = wpsUserList.filter((item: any) => {
    return item.third_union_id !== ''
  })
  // const wpsUnionData = wpsUserExcludeAdmin.map((item: any) => {
  //   return {
  //     companyUid: item.company_uid,
  //     depts: item.depts,

  //   }
  // })
  handleUnion(wpsUserExcludeAdmin)
  ctx.status = 200
  ctx.body = {
    msg: '操作成功'
  }
}

async function handleUnion(wpsUnionData: any[]) {
  for (const item of wpsUnionData) {
    const time = currentTime()
    const depts = item?.depts
    const companyUid = item?.company_uid
    const userOrder = item?.order
    const userId = item?.third_union_id
    if (Array.isArray(depts)) {
      for (const dept of depts) {
        const deptId = dept.id
        const SQLRootResult: any = await sdkInstance.middleware.mysql.select(
          config.dbName,
          'SELECT * FROM middle_dept WHERE is_delete=0 AND dept_id=?',
          [deptId]
        )
        const SQLRootDeptList =
          SQLRootResult.data && SQLRootResult.data.rows && Array.isArray(SQLRootResult.data.rows)
            ? SQLRootResult.data.rows
            : []
        if (SQLRootDeptList.length !== 0) {
          for (const sqlDept of SQLRootDeptList) {
            const oriDeptId = sqlDept?.ori_dept_id
            /* 将信息同步到关联表中 */
            const insertMiddleUserDept = await sdkInstance.middleware.mysql.insert(
              config.dbName,
              'INSERT INTO middle_user_dept (user_id, company_uid, ori_dept_id, dept_id, user_order, create_time, update_time, create_user, update_user, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [
                userId,
                companyUid,
                oriDeptId,
                deptId,
                userOrder,
                time,
                time,
                'admin',
                'admin',
                0
              ]
            )
            if (insertMiddleUserDept.result !== 'ok') {
              logger.error({
                type: '插入关联关系表失败',
                error: insertMiddleUserDept,
                data: {
                  userId,
                  companyUid,
                  oriDeptId,
                  deptId,
                  userOrder
                }
              })
            }
          }
        } else {
          logger.info({
            type: '中间表中不存在部门信息',
            data: dept
          })
        }
      }
    } else {
      logger.error({
        type: '用户部门关联关系获取失败',
        data: item
      })
    }
  }
}
