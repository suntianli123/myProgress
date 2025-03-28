/*
 * @Author: lz-ui@jczxw.cn
 * @Date: 2022-04-24 09:26:27
 * @LastEditors: lz-ui
 * @LastEditTime: 2022-04-26 09:43:24
 * @Description: file content
 */
import request from '../../../util/request'
import config from '../../../config'
import { API } from './typings'

/** 部门团队 */
/**
 * @name 1. 创建部门团队
 * @param data
 * @returns {Promise}
 */
export function createDeptgroups(
  accessToken: string,
  companyToken: string,
  deptId: string,
  data: API.ResquestCreateDeptgroups
): Promise<API.ResponseCreateDeptgroups> {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/depts/${deptId}/deptgroups?access_token=${accessToken}&company_token=${companyToken}`,
    method: 'post',
    data
  })
}

/**
 * @name 2. 获取部门团队
 * @returns {Promise}
 */
export function getDeptgroups(
  accessToken: string,
  companyToken: string,
  deptId: string
): Promise<API.ResponseGetDeptgroups> {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/depts/${deptId}/deptgroups?access_token=${accessToken}&company_token=${companyToken}`,
    method: 'get'
  })
}

/**
 * @name 3. 设置部门团队拥有者
 * @param data
 * @returns {Promise}
 */
export function setDeptgroupsOwner(
  accessToken: string,
  companyToken: string,
  groupId: string,
  data: API.ResquestSetDeptgroupsOwner
): Promise<API.ResponseApi> {
  // @ts-ignore
  return request({
    url: `/open/plus/v1/deptgroups/${groupId}/owner?access_token=${accessToken}&company_token=${companyToken}`,
    method: 'put',
    data
  })
}

/**
 * @name 4. 部门搜索
 * @param scope
 * @returns {Promise}
 */
export function searchDeptgroups(
  accessToken: string,
  companyToken: string,
  searchname: string,
  deptId?: string,
  offset?: number,
  count?: number
): Promise<API.ResponseSearchDeptgroups> {
  // @ts-ignore
  return request({
    url: `/open/drive/v1/search/departments?access_token=${accessToken}&company_token=${companyToken}&searchname=${searchname}&dept_id=${deptId}&offset=${offset}&count=${count}`,
    method: 'get'
  })
}

/** 普通团队 */

/**
 * @name 1. 创建团队
 * @param scope
 * @returns {Promise}
 */
export function createCorpgroups(
  accessToken: string,
  companyToken: string,
  data: API.ResquestCreateCorpgroups
): Promise<API.ResponseCreateCorpgroups> {
  // @ts-ignore
  return request({
    url: `/open/drive/v1/corpgroups?company_token=${companyToken}&access_token=${accessToken}`,
    method: 'post',
    data
  })
}
/**
 * @name 2. 获取团队列表
 * @param scope
 * @returns {Promise}
 */
export function getCorpgroups(
  accessToken: string,
  companyToken: string,
  offset?: 0,
  count?: 50
): Promise<API.ResponseGetCorpgroups> {
  // @ts-ignore
  return request({
    url: `/open/drive/v1/corpgroups?access_token=${accessToken}&company_token=${companyToken}&offset=${offset}&count${count}`,
    method: 'get'
  })
}
/**
 * @name 3. 删除团队
 * @param scope
 * @returns {Promise}
 */
export function deleteCorpgroups(
  accessToken: string,
  companyToken: string,
  groupId: string
): Promise<API.ResponseApi> {
  // @ts-ignore
  return request({
    url: `/open/drive/v1/corpgroups/${groupId}?access_token=${accessToken}&company_token=${companyToken}`,
    method: 'get'
  })
}
/**
 * @name 4. 重命名团队
 * @param scope
 * @returns {Promise}
 */
export function renameCorpgroups(
  accessToken: string,
  companyToken: string,
  groupId: string,
  data: {
    name: string
  }
): Promise<API.ResponseApi> {
  // @ts-ignore
  return request({
    url: `/open/drive/v1/corpgroups/${groupId}/name?access_token=${accessToken}&company_token=${companyToken}`,
    method: 'put',
    data
  })
}
