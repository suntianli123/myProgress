import { getCompanyToken } from '../api/authToken/func'
import { logger } from '../ins'
import { mdEncryption16 } from './md5'
import { sleep } from './utils'
import { batchDeleteCompanyUsers, deptsList } from '../model/openApi/company/index'
import { Context } from 'koa'
import { getUserAll } from '../api/common/func'
import config from '../config'

interface DeptItem {
  departmentId: string // 部门id
  parentId: string // 父部门id
  department: string // 部门名称
  order?: string // 排序字段
  disable?: string
  status?: string
}

interface UserItem {
  id: string
  loginName: string // 登录名
  name: string // 昵称
  password?: string // 用密码-必填字段 如果没有 随机生成
  dept: string
  status?: string // 是否删除
  disable?: string // 是否禁用
  deptId?: string
  order?: string | number // 排序
}

interface UserDeptItem {
  departmentId: string
  name?: string
  // eslint-disable-next-line camelcase
  parent_id?: string
}

/**
 * @name 一维数组转换成多维数组
 * @param {Array} data 一维数组
 * @return {Array} 多维数组
 */
export const arrToTree = async (data: any) => {
  const res: any[] = []
  const map = {}
  if (!Array.isArray(data)) {
    return res
  }
  // @ts-ignore
  // eslint-disable-next-line no-return-assign
  data.forEach(item => (map[item.departmentId] = item))

  data.forEach(el => {
    // @ts-ignore
    // eslint-disable-next-line no-return-assign
    const parent = map[el.parentId]
    if (parent) {
      if (!Array.isArray(parent.children)) {
        parent.children = []
      }
      parent.children.push(el)
    } else {
      res.push(el)
    }
  })
  return res
}

/**
 * @name 部门字段转换
 * @param {Array} data 一维数组
 * @param {Object} keys 映射的字段对象
 * @return {Array} 转换后的一维数组
 */
export const deptMapping = async (data: any, keys: DeptItem) => {
  let res: any[] = []
  const { departmentId, department, parentId, disable, status, order } = keys
  if (!Array.isArray(data)) {
    return res
  }
  res = data.map(el => {
    const temp = {
      ...el,
      departmentId: `${el[departmentId]}`,
      department: `${el[department]}`,
      parentId: `${el[parentId] === 1 ? config.department.departmentId : el[parentId]}`,
      order: el[order] || 0,
      disable: `${el[disable]}`,
      status: `${el[status]}`
    }
    // 特殊字符需要处理  \ / ; : * ? " < > | % &
    temp.department = temp.department
      .replace(/\//g, '-')
      .replace(/\\/g, '-')
      .replace(/;/g, '-')
      .replace(/:/g, '-')
      .replace(/\*/g, '-')
      .replace(/\?/g, '-')
      .replace(/"/g, '-')
      .replace(/</g, '-')
      .replace(/>/g, '-')
      .replace(/\|/g, '-')
      .replace(/%/g, '-')
      .replace(/&/g, '-')
    delete temp[departmentId]
    delete temp[department]
    delete temp[disable]
    delete temp[status]
    return temp
  })
  return res
}

/**
 * @name 部门字段转换
 * @param {Array} data 一维数组
 * @param {Object} keys 映射的字段对象
 * @return {Array} 转换后的一维数组
 */
export const deptUpdataMap = async (data: any, keys: DeptItem) => {
  let res: any[] = []
  const { departmentId, department, parentId, status, order } = keys
  if (!Array.isArray(data)) {
    return res
  }
  res = data.map(el => {
    const temp = {
      ...el,
      departmentId: `${el[departmentId]}`,
      department: `${el[department]}`,
      parentId: `${el[parentId] === 1 ? config.department.departmentId : el[parentId]}`,
      order: el[order] || 0,
      status: `${el[status]}`
    }
    // 特殊字符需要处理  \ / ; : * ? " < > | % &
    temp.department = temp.department
      .replace(/\//g, '-')
      .replace(/\\/g, '-')
      .replace(/;/g, '-')
      .replace(/:/g, '-')
      .replace(/\*/g, '-')
      .replace(/\?/g, '-')
      .replace(/"/g, '-')
      .replace(/</g, '-')
      .replace(/>/g, '-')
      .replace(/\|/g, '-')
      .replace(/%/g, '-')
      .replace(/&/g, '-')
    delete temp[departmentId]
    delete temp[department]
    return temp
  })
  return res
}

/**
 * @name  用户字段转换
 * @param {Array} data 一维数组
 * @param {Object} keys 映射的字段对象
 * @return {Array} 转换后的一维数组
 */
export const userMapping = async (
  data: any,
  user: UserItem,
  depts: UserDeptItem
) => {
  let result: any[] = []
  if (!Array.isArray(data)) return result

  const { id, loginName, name, password, dept, order, status } = user
  // eslint-disable-next-line camelcase
  const { departmentId, parent_id } = depts
  const deptsName = depts.name

  result = data.map(el => {
    const userOrder = el[order]?.[0] || 0
    const temp: any = {
      id: `${el[id]}`,
      loginName: `${el[loginName]}`, // 登录名
      name: `${el[name]}`, // 昵称
      password: `${el[password] || 'Wps@123456'}`, // 用密码-必填字段
      order: userOrder,
      status: `${el[status]}`,
      dept: []
    }
    temp.dept = el[dept].map((itemDept: any) => {
      itemDept = {
        departmentId: `${itemDept}`
      }
      return itemDept
    })
    return temp
  })
  return result
}

/**
 * @name  用户字段转换
 * @param {Array} data 一维数组
 * @param {Object} keys 映射的字段对象
 * @return {Array} 转换后的一维数组
 */
export const userMap = async (data: any, user: UserItem) => {
  let result: any[] = []
  if (!Array.isArray(data)) return result

  const { id, loginName, name, status, disable, password, order } =
    user
  // eslint-disable-next-line camelcase

  result = data.map(el => {
    const temp: any = {
      // id: `${mdEncryption16(el[id])}`, // 第三方企业用户unionid md5加密
      id: `${el[id]}`, // 第三方企业用户unionid
      loginName: `${el[loginName]}`, // 登录名
      name: `${el[name]}`, // 昵称
      password: `${el[password] || 'Wps@123456'}`,
      status: `${el[status]}`,
      disable: `${el[disable]}`,
      order: el[order],
      dept: Array.isArray(el.dept) ? el.dept : []
    }
    return temp
  })
  return result
}

/**
 * @name  用户字段转换
 * @param {Array} data 一维数组
 * @param {Object} keys 映射的字段对象
 * @return {Array} 转换后的一维数组
 */
export const userUpdataMap = async (data: any, user: UserItem) => {
  let result: any[] = []
  if (!Array.isArray(data)) return result

  const { id, loginName, name, status, disable, password, order } =
    user
  // eslint-disable-next-line camelcase

  result = data.map(el => {
    const userOrder = el[order]?.[0] || 0
    const temp: any = {
      // id: `${mdEncryption16(el[id])}`, // 第三方企业用户unionid md5加密
      id: `${el[id]}`, // 第三方企业用户unionid
      loginName: `${el[loginName]}`, // 登录名
      name: `${el[name]}`, // 昵称
      password: `${el[password] || 'Wps@123456'}`,
      status: `${el[status]}`,
      order: userOrder,
      dept: Array.isArray(el.dept) ? el.dept : []
    }
    return temp
  })
  return result
}

export function editUserId(userId: string) {
  /* 去掉- */
  const filterId = userId.replace(/-/g, '')
  /* 取id后三十位 */
  const id = filterId.slice(filterId.length - 30)
  return id
}

export const parallelDemo = async (ctx: any) => {
  const proArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  await parallel(proArr, 2, _ => sleep(_ * 1000))
  ctx.body = {}
}

/**
 * 简易并发程序
 * @param paramsList function所需参数组成的数组
 * @param max 并发量
 * @param promiseFun function 返回promise实例
 */
export const parallel = async (
  paramsList: any[],
  max: number,
  promiseFun: (params: any) => Promise<any>
) => {
  let step = 0
  async function syncQueue() {
    step++
    if (step <= max && paramsList.length > 0) {
      const item = paramsList.shift()
      await promiseFun(item)
      // console.log(item)
      step--
      syncQueue()
    }
  }
  for (let i = 0; i < max; i++) {
    syncQueue()
  }
}

export const arrToTreeWPS = async (data: any) => {
  const res: any[] = []
  const map = {}
  if (!Array.isArray(data)) {
    return res
  }
  // @ts-ignore
  // eslint-disable-next-line no-return-assign
  data.forEach(item => (map[item.departmentId] = item))

  data.forEach(el => {
    // @ts-ignore
    // eslint-disable-next-line no-return-assign
    const parent = map[el.parentId]
    if (parent) {
      if (!Array.isArray(parent.children)) {
        parent.children = []
      }
      if (typeof el.deptPath !== 'string') {
        el.deptPath = ''
      }
      el.deptPath = `${parent.deptPath}/${el.deptPath}`
      parent.children.push(el)
    } else {
      logger.info({
        type: '不存在的父部门ID',
        data: el.parentId,
        path: el.department
      })
      el.deptPath = `${el.department}`
      res.push(el)
    }
  })
  return res
}

export const stockDeptMapping = (data: any, keys: DeptItem) => {
  let res: any[] = []
  const { departmentId, department, parentId, disable, status, order } = keys
  if (!Array.isArray(data)) {
    return res
  }
  res = data.map(el => {
    const temp = {
      ...el,
      departmentId: `${el[departmentId]}`,
      department: `${el[department]}`,
      parentId: `${el[parentId]}`,
      order: `${el[order]}`,
      disable: `${el[disable]}`,
      status: `${el[status]}`
    }
    // 特殊字符需要处理  \ / ; : * ? " < > | % &
    temp.department = temp.department
      .replace(/\//g, '-')
      .replace(/\\/g, '-')
      .replace(/;/g, '-')
      .replace(/:/g, '-')
      .replace(/\*/g, '-')
      .replace(/\?/g, '-')
      .replace(/"/g, '-')
      .replace(/</g, '-')
      .replace(/>/g, '-')
      .replace(/\|/g, '-')
      .replace(/%/g, '-')
      .replace(/&/g, '-')
    // delete temp[departmentId]
    // delete temp[department]
    // delete temp[disable]
    // delete temp[status]
    return temp
  })
  return res
}

/**
 * JSON.stringify()时，判断参数是否是存在循环引用的对象并处理
 * @param params
 * @returns
 */
export const stringifyLoop = (params: any) =>
  hasLoop(params) ? jsonSerial(params) : JSON.stringify(params)

// 判断参数是否是存在循环引用
const hasLoop = (obj: any): boolean => {
  const findLoop = (target: any, src: any): boolean => {
    const source = src.slice().concat([target])
    return Object.values(target).some(
      v =>
        typeof v === 'object' &&
      (source.indexOf(v) !== -1 || findLoop(v, target))
    )
  }
  return typeof obj === 'object' ? findLoop(obj, []) : false
}

// 将存在循环引用的对象转换为json字符串
const jsonSerial = (data: any): string => {
  let cache: any[] = []
  const copyData = JSON.stringify(data, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
      // Circular reference found, discard key
        return
      }
      // Store value in our collection
      cache.push(value)
    }
    return value
  })
  cache = null
  return copyData
}

export const wpsDeptArrToTree = (data: any) => {
  const res: any[] = []
  const map = {}
  if (!Array.isArray(data)) {
    return res
  }
  // @ts-ignore
  // eslint-disable-next-line no-return-assign
  data.forEach(item => (map[item.departmentId] = item))

  data.forEach(el => {
    // @ts-ignore
    // eslint-disable-next-line no-return-assign
    const parent = map[el.parentId]
    if (parent) {
      if (!Array.isArray(parent.children)) {
        parent.children = []
      }
      parent.children.push(el)
    } else {
      res.push(el)
    }
  })
  return res
}

/** 获取全部部门 */
export async function getAllDeptUser(deptList: any[], deptId: number | string) {
  const companyToken = await getCompanyToken()
  /** 获取wps部门列表 */
  // @ts-ignore
  const res = await deptsList(companyToken, `${deptId}`, 0, 1000)
  const { result, depts } = res
  console.log(depts.length, deptList.length)
  if (result !== 0) {
    throw Error('获取wps部门列表失败')
  }
  if (depts.length) {
    deptList.push(...depts)
    for (const itemDept of depts) {
      const deptId = itemDept.dept_id
      await getAllDeptUser(deptList, deptId)
    }
  }
}

export async function removeAllUsers(ctx: Context) {
  /** 获取企业token */
  const companyToken = await getCompanyToken()
  /* 获取当前部门下所有用户 */
  const reslut: any[] = []
  // await getDeptUserAll(deptId, -1, reslut)
  // 获取所有用户
  await getUserAll(reslut, 0)
  logger.info({
    type: '企业下的全量用户',
    data: reslut.length
  })
  // eslint-disable-next-line array-callback-return
  const usersExcludeSuperuser = reslut.filter(item => {
    return !(item.name === 'admin' || item.name === 'wpsadmin' || item.name === 'sysadmin')
  })
  const ids = usersExcludeSuperuser.map(el => el.company_uid)
  let offset = 0
  while (offset * 50 < ids.length) {
    await batchDeleteCompanyUsers(
      companyToken,
      ids.slice(offset * 50, (offset + 1) * 50).join()
    )
    // logger.info(`删除用户=${JSON.stringify(ids)}`)
    offset++
  }
  ctx.status = 200
  ctx.body = {
    msg: '删除全部用户'
  }
}
