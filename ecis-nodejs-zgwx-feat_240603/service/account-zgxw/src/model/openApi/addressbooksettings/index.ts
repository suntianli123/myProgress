import { API } from './typing'
import request from '../../../util/request'
/**
 * @name 1. 创建通讯录可见性规则
 * @param {string} companyToken 企业授权的token信息
 * @param {Object} data
 * @returns {Promise}
 */
export function ruleOfAddressBook(
  companyToken: string,
  data: API.RequestCreateRuleOfAddressBook
): Promise<API.ResponseCreateRuleOfAddressBook> {
  // @ts-ignore
  return request({
    url: `/open/kopen/plus/v1/dev/companies/visibility-rules?company_token=${companyToken}`,
    method: 'post',
    data
  })
}

/**
 * @name 2. 修改通讯录可见性规则
 * @param {string} companyToken 企业授权的token信息
 * @param {Object} data
 * @returns {Promise}
 */
export function putRuleOfAddressBook(
  companyToken: string,
  data: API.RequestPutRuleOfAddressBook
): Promise<API.ResponsePuteRuleOfAddressBook> {
  // @ts-ignore
  return request({
    url: `/open/kopen/plus/v1/dev/companies/visibility-rules?company_token=${companyToken}`,
    method: 'put',
    data
  })
}

/**
 * @name 3. 获取通讯录可见性规则
 * @param {string} companyToken 企业授权的token信息
 * @param {number} offset 偏移量
 * @param {number} limit 数量
 * @returns {Promise}
 */
export function getRuleOfAddressBook(
  companyToken: string,
  offset: number,
  limit: number
): Promise<API.ResponseGetRuleOfAddressBook> {
  // @ts-ignore
  return request({
    url: `/open/kopen/plus/v1/dev/companies/visibility-rules?company_token=${companyToken}&offset=${offset}&limit=${limit}`,
    method: 'get',
  })
}

/**
 * @name 4. 删除通讯录可见性规则
 * @param {string} companyToken 企业授权的token信息
 * @param {Array} rule_ids 要删除的rule_id数组，逗号(,)分割
 * @returns {Promise}
 */
export function deleteRuleOfAddressBook(
  companyToken: string,
  rule_ids: Array<[]>
): Promise<API.ResponseDeleteRuleOfAddressBook> {
  // @ts-ignore
  return request({
    url: `/open/kopen/plus/v1/dev/companies/visibility-rules?company_token=${companyToken}&rule_ids=${rule_ids}`,
    method: 'delete',
  })
}
