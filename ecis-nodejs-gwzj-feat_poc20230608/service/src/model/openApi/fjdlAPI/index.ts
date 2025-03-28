import request from '../../../util/request'
import config from '../../../config'
const https = require('https')

const agent = new https.Agent({
  rejectUnauthorized: false
})

/**
 * @name 获取单点登录access_token
 * @param {string} code
 * @param {string} uri
 * @returns {Promise}
 */
export const codeToAccessToken = (code: string, redirectUri: string, state: string): Promise<any> => {
  const { domain, clientId } = config.third
  // @ts-ignore
  return request({
    url: `${domain}/oauth2.0/accessToken?client_id=${clientId}&code=${code}&redirect_uri=${redirectUri}&state=${state}`,
    method: 'post',
    // header: {
    //   'Content-Type': 'application/x-www-form-unlencoded',
    // },
  })
}

/**
 * @name 获取单点登录用户信息
 * @param {string} access_token
 * @returns {Promise}
 */
export const accessTokenToUser = (accessToken: string): Promise<any> => {
  const { domain, clientId } = config.third
  // @ts-ignore
  return request({
    url: `${domain}/oauth2.0/profile?access_token=${accessToken}`,
    method: 'get',
    // header: {
    //   'Content-Type': 'application/x-www-form-unlencoded',
    // },
  })
}

/**
 * @name 根据systemId查询直接部门信息
 * @param {string} deptId
 * @param {string} propertyType
 * @returns {Promise}
 */
export const getDeptRootDataApi = (): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.third.dataOriginUrl}/dky/depts/get_orgs_by_systemId?systemId=${config.third.systemId}`,
    method: 'get',
    // headers: {
    //   delWpsSign: true,
    // }
  })
}

/**
 * @name 查询当前部门下一级部门信息
 * @param {string} deptId
 * @param {string} propertyType
 * @returns {Promise}
 */
export const getNextDeptDataApi = (busiOrgId: string): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.third.dataOriginUrl}/dky/depts/get_child_orgs_by_id?busiOrgId=${busiOrgId}`,
    method: 'get',
    // headers: {
    //   delWpsSign: true,
    // }
  })
}

/**
 * @name 根据systemId、orgId查询直接组织下用户信息
 * @param {string} deptId
 * @param {string} propertyType
 * @returns {Promise}
 */
export const getCurUsersByOrgIdApi = (orgId: string): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.third.dataOriginUrl}/dky/users?systemId=${config.third.systemId}&orgId=${orgId}`,
    method: 'get',
    // headers: {
    //   delWpsSign: true,
    // }
  })
}

/**
 *
 * @returns 基准组织部门
 */
export const getNextDeptDataBase = (deptId: string, propertyType?: string): Promise<any> => {
  // @ts-ignore
  return request({
    url: encodeURI(`${config.third.dataOriginUrl}/dky/depts/get_sub_depts_by_deptId?deptId=${deptId}`),
    method: 'get',
    // headers: {
    //   delWpsSign: true,
    // }
  })
}

/**
 * @returns 基准组织根部门
 */
export const getDeptRootDataBase = (): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.third.dataOriginUrl}/dky/depts/get_dept_by_deptId?deptId=${config.department.parentId}`,
    method: 'get',
    // headers: {
    //   delWpsSign: true,
    // }
  })
}

export const getUsersByCondition = (baseOrgId: string): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.third.dataOriginUrl}/dky/users/get_users_by_condition?baseOrgId=${baseOrgId}`,
    method: 'get',
    // headers: {
    //   delWpsSign: true,
    // }
  })
}

/**
 * @name 使用账号密码登录登录
 * @returns {Promise}
 */
export const userLoginAuth = (params: any): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.domain}/c/gwzjaccountjava/gwzj/users/userLoginAuth`,
    method: 'post',
    httpsAgent: agent,
    headers: {
      delWpsSign: true
    },
    data: params
  })
}

// rds读表获取全部用户
export const getAllUsers = (pageNo: any, pageSize: any): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.domain}/c/gwzjaccountjava/gwzj/users/get_all_users?pageSize=${pageSize}&pageNo=${pageNo}`,
    method: 'get',
    headers: {
      delWpsSign: true,
    }
  })
}

// rds读表根据id获取用户详细信息
export const getUsersById = (ids : any): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.domain}/c/gwzjaccountjava/gwzj/users/get_user_by_ids?ids=${ids}`,
    method: 'get',
    headers: {
      delWpsSign: true,
    }
  })
}

// rds读表获取全部部门
export const getAllDept = (pageNo: any, pageSize: any): Promise<any> => {
  // @ts-ignore
  return request({
    url: `${config.domain}/c/gwzjaccountjava/dky/depts/get_all_depts?pageSize=${pageSize}&pageNo=${pageNo}`,
    method: 'get',
    headers: {
      delWpsSign: true,
    }
  })
}
