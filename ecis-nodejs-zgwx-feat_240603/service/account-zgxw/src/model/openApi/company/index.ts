import request from '../../../util/request'
import config from '../../../config'
import { API } from './typings'

/**
 * @name 企业内部应用获取company_token
 * @returns {Promise}
 */
export function companyToken(): Promise<API.ResponseCompanyToken> {
  // @ts-ignore
  return request({
    url: `/open/auth/v1/company/inner/token?app_id=${config.appID}&scope=${config.scope}`,
    method: 'get'
  })
}

/**
 * @name 1. 获取企业信息
 * @param companyToken 通过企业company_token获取企业信息
 * @returns {Promise}
 */
export function companyInfo(
  companyToken: string
): Promise<API.ResponseCompany> {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company?company_token=${companyToken}`,
    method: 'get'
  })
}

/**
 * @name 2. 创建部门
 * @param {string} companyToken通过company_token创建部门
 * @param {Object} data
 * @returns {Promise}
 */
export const depts = (
  companyToken: string,
  data: API.RequestCompanyDepts
): Promise<API.ResponseCompanyDepts> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/depts?company_token=${companyToken}`,
    method: 'post',
    data
  })
}

/**
 * @name 3. 获取子部门列表，通过企业company_token 获取企业部门列表
 * @param {string} companyToken企业company_token
 * @param {string} deptId部门id默认值0,企业根部门
 * @param {string} offset
 * @param {string} limit
 * @returns {Promise}
 */
export function deptsList(
  companyToken: string,
  deptId: string | number = 0,
  offset = 0,
  limit = 10,
  recursive = false
): Promise<API.ResponseCompanydDeptscChildren> {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/depts/${deptId}/children?company_token=${companyToken}&offset=${offset}&limit=${limit}&recursive=${recursive}`,
    method: 'get'
  })
}

/**
 * @name 4. 修改部门
 * @param {string} companyToken
 * @param {string} deptId
 * @param {Object} data
 * @returns {Promise}
 */
export const putDepts = (
  companyToken: string,
  deptId: string,
  data: API.RequestPutCompanyDepts
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/depts/${deptId}?company_token=${companyToken}`,
    method: 'put',
    data
  })
}

/**
 * @name 5. 删除部门
 * @param {string} companyToken
 * @param {string} deptId
 * @returns {Promise}
 */
export const delDepts = (
  companyToken: string,
  deptId: string
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/depts/${deptId}?company_token=${companyToken}`,
    method: 'delete'
  })
}

/**
 * @name 6. 批量创建部门
 * @param {string} companyToken
 * @param {string} deptId
 * @param {Object} data
 * @returns {Promise}
 */
export const batchCreateDepts = (
  companyToken: string,
  data: API.RequestBatchCreateCompanyDepts
): Promise<API.ResponseBatchCreateCompanyDepts> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/batch/company/depts?company_token=${companyToken}`,
    method: 'post',
    data
  })
}

/**
 * @name 7. 批量获取部门信息
 * @param {string} companyToken
 * @param {string} deptId
 * @returns {Promise}
 */
export const batchGetDepts = (
  companyToken: string,
  deptId: string
): Promise<API.ResponseBatchGetCompanyDepts> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/batch/company/depts?dept_ids=${deptId}&company_token=${companyToken}`,
    method: 'get'
  })
}

/**
 * @name 8. 批量修改部门
 * @param {string} companyToken
 * @param {string} deptId
 * @param {Object} data
 * @returns {Promise}
 */
export const batchPutDepts = (
  companyToken: string,
  deptId: string,
  data: API.RequestBatchCreateCompanyDepts
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/batch/company/depts/${deptId}?company_token=${companyToken}`,
    method: 'put',
    data
  })
}

/**
 * @name 9. 批量删除部门
 * @param {string} companyToken
 * @param {string} deptId
 * @returns {Promise}
 */
export const batchDeleteDepts = (
  companyToken: string,
  deptId: string
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/batch/company/depts?company_token=${companyToken}&dept_ids=${deptId}`,
    method: 'delete'
  })
}

/**
 * @name 10. 创建企业成员
 * @param {string} companyToken
 * @param {Object} data
 * @returns {Promise}
 */
export const companyUsers = (
  companyToken: string,
  data: API.RequestCompanyUsers
): Promise<API.ResponseCompanyUsers> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/company_users?company_token=${companyToken}`,
    method: 'post',
    data
  })
}

/**
 * @name 11. 获取企业下的企业成员列表
 * @param {string} companyToken
 * @param {string} offset 分页下标，从0开始
 * @param {string} limit 分页大小，不超过1000
 * @param {string} status 状态，逗号分隔的字符串,默认active。可选值：active(正常),notactive(未激活), “dimission”(离职),disabled(禁用)
 * @returns {Promise}
 */
export const getCompanyUsers = (
  companyToken: string,
  offset = 0,
  limit = 0,
  status = 'active'
): Promise<API.ResponseGetCompanyUsers> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/company_users?company_token=${companyToken}&offset=${offset}&limit=${limit}&status=${status}`,
    method: 'get'
  })
}

/**
 * @name 12. 修改企业成员
 * @param {string} companyToken
 * @param {Object} data
 * @returns {Promise}
 */
export const putCompanyUsers = (
  companyToken: string,
  companyUid: string,
  data: API.RequestPutCompanyUsers
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/company_users/${companyUid}?company_token=${companyToken}`,
    method: 'put',
    data
  })
}

/**
 * @name 13. 删除企业成员
 * @param {string} companyToken
 * @param {Object} data
 * @returns {Promise}
 */
export const delCompanyUsers = (
  companyToken: string,
  companyUid: string
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/company_users/${companyUid}?company_token=${companyToken}`,
    method: 'delete'
  })
}

/**
 * @name 14. 批量创建企业成员
 * @param {string} companyToken
 * @param {Object} data
 * @returns {Promise}
 */
export const batchCreateCompanyUsers = (
  companyToken: string,
  data: API.RequestBatchCreateCompanyUsers
): Promise<API.ResponseBatchCreateCompanyUsers> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/batch/company/company_users?company_token=${companyToken}`,
    method: 'post',
    data
  })
}

/**
 * @name 15. 批量获取企业成员信息
 * @param {string} companyToken
 * @param {string} company_uids 成员id列表，以逗号分隔的字符串
 * @param {string} status 状态，逗号分隔的字符串,默认active。可选值：active(正常),notactive(未激活), disabled(禁用)
 * @returns {Promise}
 */
export const batchGetCompanyUsers = (
  companyToken: string,
  companyUids: string,
  status = 'active'
): Promise<API.ResponseBatchGetCompanyUsers> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/batch/company/company_users?company_token=${companyToken}&company_uids=${companyUids}&status=${status}`,
    method: 'get'
  })
}

/**
 * @name 16. 批量修改企业成员信息
 * @param {string} companyToken
 * @param {Object} data
 * @returns {Promise}
 */
export const batchPutCompanyUsers = (
  companyToken: string,
  data: API.RequestBatchPutCompanyUsers
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/batch/company/company_users?company_token=${companyToken}`,
    method: 'put',
    data
  })
}

/**
 * @name 17. 批量删除企业成员
 * @param {string} companyToken
 * @param {string} company_uids 成员id列表，以逗号分隔的字符串
 * @returns {Promise}
 */
export const batchDeleteCompanyUsers = (
  companyToken: string,
  companyUids: string
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/batch/company/company_users?company_token=${companyToken}&company_uids=${companyUids}`,
    method: 'delete'
  })
}

/**
 * @name 18. 批量禁用企业成员
 * @param {string} companyToken
 * @param {string} company_uids 成员id列表，以逗号分隔的字符串
 * @returns {Promise}
 */
export const batchDisableCompanyUsers = (
  companyToken: string,
  companyUids: string
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/batch/company/company_users/disable?company_token=${companyToken}&company_uids=${companyUids}`,
    method: 'put'
  })
}

/**
 * @name 19. 批量启用企业成员
 * @param {string} companyToken
 * @param {string} companyUids
 * @returns {Promise}
 */
export const companyUsersEnable = (
  companyToken: string,
  companyUids: string
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/batch/company/company_users/enable?company_token=${companyToken}&company_uids=${companyUids}`,
    method: 'put',
    data: {
      company_token: companyToken,
      company_uids: companyUids
    }
  })
}

/**
 * @name 20. 将企业成员添加到部门
 * @param {string} companyToken
 * @param {string} deptId 部门id
 * @param {string} companyUid 企业成员id
 * @returns {Promise}
 */
export const usersAddCompany = (
  companyToken: string,
  deptId: string,
  companyUid: string
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/depts/${deptId}/company_users/${companyUid}?company_token=${companyToken}`,
    method: 'post'
  })
}

/**
 * @name 21. 获取部门下的企业成员列表
 * @param {string} companyToken
 * @param {string} offset 分页下标，从0开始
 * @param {string} limit 分页大小，不超过1000
 * @param {string} status 状态，逗号分隔的字符串,默认active。可选值：active(正常), notactive(未激活), disabled(禁用)
 * @returns {Promise}
 */
export const getDeptsCompanyUsers = (
  companyToken: string,
  deptId: string,
  offset = 0,
  limit = 0,
  status?: string
): Promise<API.ResponseGetDeptsCompanyUsers> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/depts/${deptId}/company_users?company_token=${companyToken}&offset=${offset}&limit=${limit}&status=${status}`,
    method: 'get'
  })
}

/**
 * @name 22. 将企业成员移出部门
 * @param {string} companyToken
 * @param {string} deptId
 * @param {string} companyUid
 * @returns {Promise}
 */
export const usersDelCompany = (
  companyToken: string,
  deptId: string,
  companyUid: string
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/depts/${deptId}/company_users/${companyUid}?company_token=${companyToken}`,
    method: 'delete'
  })
}

/**
 * @name 23. 批量将企业成员添加到部门
 * @param {string} companyToken
 * @param {string} deptId 部门id
 * @param {string} companyUid 成员id列表，以逗号分隔的字符串
 * @returns {Promise}
 */
export const batchCreateDeptsCompanyUser = (
  companyToken: string,
  deptId: string,
  companyUid: string
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/depts/${deptId}/company_users?company_token=${companyToken}&company_uids=${companyUid}`,
    method: 'post'
  })
}

/**
 * @name 24. 批量获取部门下的企业成员
 * @param {string} companyToken
 * @param {string} deptId 部门id
 * @param {string} companyUid 成员id列表，以逗号分隔的字符串
 * @returns {Promise}
 */
export const batchGetDeptsCompanyUser = (
  companyToken: string,
  deptId: string,
  companyUid: string,
  status?: string
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/depts/${deptId}/company_users?company_token=${companyToken}&company_uids=${companyUid}&status={${status}}`,
    method: 'get'
  })
}

/**
 * @name 25. 批量将企业成员移出部门
 * @param {string} companyToken
 * @param {string} deptId 部门id
 * @param {string} companyUid 成员id列表，以逗号分隔的字符串
 * @returns {Promise}
 */
export const batchDelDeptsCompanyUsers = (
  companyToken: string,
  deptId: string,
  companyUid: string
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/depts/${deptId}/company_users?company_token=${companyToken}&company_uids=${companyUid}`,
    method: 'delete'
  })
}

/**
 * @name 26. 搜索部门成员
 * @param {string} companyToken
 * @param {string} searchName 查询内容
 * @returns {Promise}
 */
export const searchDepts = (
  companyToken: string,
  deptId: string,
  searchName: string
): Promise<API.ResponseSearchDepts> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/depts/${deptId}/search/members?company_token=${companyToken}&search_name=${searchName}`,
    method: 'get'
  })
}

/**
 * @name 27. 获取企业用户id
 * @param {string} companyToken
 * @param {string} access_token (用户授权也需要企业通讯录的scope)
 * @param {string} status 状态，逗号分隔的字符串,默认active。可选值：active(正常), notactive(未激活), disabled(禁用)
 * @returns {Promise}
 */
export const getDeptsId = (
  companyToken: string,
  accessToken: string,
  status = 'active'
): Promise<API.ResponseSearchDepts> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/user/company_uid?company_token=${companyToken}&access_token=${accessToken}&status=${status}`,
    method: 'get'
  })
}

/**
 * @name 28. 同步企业成员third_union_id
 * @param {string} companyToken
 * @param {Object} data
 * @returns {Promise}
 */
export const deptsThirdBind = (
  companyToken: string,
  companyUid: string,
  data: API.RequestDeptsThirdBind
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/company_users/${companyUid}/third-bind?company_token=${companyToken}`,
    method: 'post',
    data
  })
}

/**
 * @name 29. 批量通过third_union_id查询企业成员
 * @param {string} companyToken
 * @param {Object} data
 * @returns {Promise}
 */
export const batchThirdBindDepts = (
  companyToken: string,
  data: API.RequestBatchThirdBindDepts
): Promise<API.ResponseBatchThirdBindDepts> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/company_users/by-third-union-ids?company_token=${companyToken}`,
    method: 'post',
    data
  })
}

/**
 * @name 30. 批量激活企业用户账号
 * @param {string} companyToken
 * @param {Array} company_uids array 企业用户id数组
 * @returns {Promise}
 */
export const batchActiveDepts = (
  companyToken: string,
  companyUids: string
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: '/open/kopen/v1/dev/company/users/active/batch',
    method: 'put',
    data: {
      company_token: companyToken,
      company_uids: [`${companyUids}`]
    }
  })
}

/**
 * @name 31. 批量注销企业用户账号登录信息
 * @param {string} companyToken
 * @param {Array} company_uids array 企业用户id数组
 * @returns {Promise}
 */
export const batchLogoutDepts = (
  companyToken: string,
  companyUids: string
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/kopen/v1/dev/company/users/logout/batch?company_token=${companyToken}&company_uids=${companyUids}`,
    method: 'delete'
  })
}

/**
 * @name 32. 批量修改部门成员排序值
 * @param {string} companyToken
 * @param {Object} data
 * @returns {Promise}
 */
export const batchPutDeptsOrder = (
  companyToken: string,
  data: API.RequestBatchPutDeptsOrder
): Promise<API.ResponseApi> => {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/company/deptmembers/order/reset?company_token=${companyToken}`,
    method: 'put',
    data
  })
}

/**
 * @name 27. 批量获取企业成员自定义字段值
 * @returns {Promise}
 */
export const customFields = (
  companyToken: string,
  compuid: string
): Promise<API.ResponseSearchDepts> => {
  // @ts-ignore
  return request({
    url: `/open/plus/svr/v1/dev/companies/batch/user/custom-fields?company_token=${companyToken}&comp_uid=${compuid}`,
    method: 'get'
  })
}
