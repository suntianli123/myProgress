import { mdEncryption16 } from './md5'
import { sleep } from './utils'

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
  password: string // 用密码-必填字段 如果没有 随机生成
  dept: string
  unionId?: string
  status?: string // 是否删除
  disable?: string // 是否禁用
  deptId?: string
  order?: string | number // 排序
}

interface UserDeptItem {
  departmentId: string
  name: string
  // eslint-disable-next-line camelcase
  parent_id: string
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
 * @name 一维数组转换成多维数组并拼接路径，需要数据顺序是先父级后子级，否则路径中会出现undefined
 * @param {Array} data 一维数组
 * @return {Array} 多维数组
 */
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
      el.deptPath = `${parent.deptPath}/${el.department}`
      parent.children.push(el)
    } else {
      el.deptPath = `${el.department}`
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
      parentId: `${el[parentId]}`,
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
    delete temp[disable]
    delete temp[status]
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

  const { id, loginName, name, password, dept } = user
  // eslint-disable-next-line camelcase
  const { departmentId, parent_id } = depts
  const deptsName = depts.name

  result = data.map(el => {
    const temp: any = {
      id: `${el[id]}`,
      loginName: `${el[loginName]}`, // 登录名
      name: `${el[name]}`, // 昵称
      password: `${el[password]}`, // 用密码-必填字段 如果没有 随机生成
      dept: []
    }
    temp[dept] = el[dept].map((itemDept: any) => {
      itemDept = {
        departmentId: itemDept[departmentId],
        parent_id: itemDept[parent_id],
        name: itemDept[deptsName]
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

  const { id, loginName, name, status, disable, password, order, unionId } =
    user
  // eslint-disable-next-line camelcase

  result = data.map(el => {
    const temp: any = {
      // id: `${mdEncryption16(el[id])}`, // 第三方企业用户unionid md5加密
      id: `${el[id]}`, // 第三方企业用户unionid
      loginName: `${el[loginName]}`, // 登录名
      name: `${el[name]}`, // 昵称
      password: 'Wps@123456',
      unionId: `${el[unionId] || ''}`,
      status: `${el[status]}`,
      order: el[order] || 0,
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
      (source.indexOf(v) !== -1 || findLoop(v, source))
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

/**
 * 方法名：
 * 功能介绍：返回一个对象里面包含后一个数组比第一个数组增加、减少、修改、不变
 * 参数：
 * beforeArr：前一个数组
 * beforekey：前一个数组的主键
 * beforekeys：前一个数组的其他属性
 * afterArr：后一个数组
 * afterkey：后一个数组的主键
 * afterkeys：后一个数组的其他属性
 */
export function diffData(
  beforeArr: [],
  beforekey: string,
  beforekeys: string[],
  afterArr: [],
  afterkey: string,
  afterkeys: string[]
) {
  const resObj: any = {
    insertList: [],
    deleteList: [],
    updateList: [],
    invariantList: [],
  }

  // 遍历beforeArr，放入beforeMap
  const beforeMap = new Map()
  for (let i = 0; i < beforeArr.length; i++) {
    const beforeItem = beforeArr[i]
    const beforeItemValue: any = {}
    beforekeys.forEach((k, index) => {
      // 转换成afterkey
      const t: string = afterkeys[index]
      beforeItemValue[t] = beforeItem[k]
    })
    beforeMap.set(beforeItem[beforekey], JSON.stringify(beforeItemValue))
  }

  // 遍历afterArr，查看其元素是否在beforeMap中
  for (let j = 0; j < afterArr.length; j++) {
    const afterItem = afterArr[j]
    const afterItemValue: any = {}
    // eslint-disable-next-line no-return-assign
    afterkeys.forEach(k => afterItemValue[k] = afterItem[k])
    const tempAfterItemValue = JSON.stringify(afterItemValue)
    // 判断afterItem是否在beforeMap中
    if (beforeMap.has(afterItem[afterkey])) {
      // 如果存在看其他属性是否一致
      beforeMap.get(afterItem[afterkey]) === tempAfterItemValue
        ? resObj.invariantList.push(afterItemValue)
        : resObj.updateList.push(afterItemValue)
    } else {
      resObj.insertList.push(afterItemValue)
    }
  }

  // 删除逻辑
  for (let s = 0; s < beforeArr.length; s++) {
    const flag = afterArr.some((e) => e[afterkey] === beforeArr[s][beforekey])
    if (!flag) {
      resObj.deleteList.push(beforeArr[s])
    }
  }

  return resObj
}
/**
 * @name 一维数组转换成多维数组
 * @param {Array} data 一维数组
 * @return {Array} 多维数组
 */
export const sqlArrToTree = async (data: any) => {
  const res: any[] = []
  const map = {}
  if (!Array.isArray(data)) {
    return res
  }
  // @ts-ignore
  // eslint-disable-next-line no-return-assign
  data.forEach(item => (map[item.ori_dept_id] = item))

  data.forEach(el => {
    // @ts-ignore
    // eslint-disable-next-line no-return-assign
    const parent = map[el.ori_dept_pid]
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
 * @name 多维数组转换成一维数组
 * @param {Array} data 多维数组
 * @return {Array} 一维数组
 */
export const treeToArr = (data: any, arr: any) => {
  data.forEach((el: any) => {
    const temp = JSON.parse(JSON.stringify(el))
    delete temp.children
    arr.push(temp)
    if (el.children && el.children.length) {
      treeToArr(el.children, arr)
    }
  })
  return arr
}
