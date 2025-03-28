import request from '../../../util/request'
import config from '../../../config'
import { API } from './typings'

/** 文档中台对接 */

/**
 * @name 1. 创建应用
 * @param data
 * @returns {Promise}
 */
export function createApp(
  data: API.ResquestCreateApp
): Promise<API.ResponseCreateApp> {
  // @ts-ignore
  return request({
    url: '/open/admin/v1/app',
    method: 'post',
    data
  })
}
/**
 * @name 2. 获取应用基本信息
 * @param data
 * @returns {Promise}
 */
export function getAppBaseInfo(
  appId: string
): Promise<API.ResponseGetAppBaseInfo> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}`,
    method: 'get',
  })
}

/**
 * @name 3. 修改应用基本信息
 * @param data
 * @returns {Promise}
 */
export function modifyAppBaseInfo(
  appId: string,
  data: API.ResquestModifyAppBaseInfo
): Promise<API.ResponseModifyAppBaseInfo> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}`,
    method: 'put',
    data
  })
}

/**
 * @name 4. 删除应用
 * @param data
 * @returns {Promise}
 */
export function deleteApp(
  appId: string
): Promise<API.ResponseDeleteApp> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}`,
    method: 'delete',
  })
}

/**
 * @name 5. 重置应用key
 * @param data
 * @returns {Promise}
 */
export function resetAppKey(
  appId: string
): Promise<API.ResponseResetAppKey> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/key`,
    method: 'put',
  })
}

/**
 * @name 6. 获取应用key
 * @param data
 * @returns {Promise}
 */
export function getAppKey(
  appId: string
): Promise<API.ResponseGetAppKey> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/key`,
    method: 'get',
  })
}

/**
* @name 7. 获取应用IP白名单
* @param data
* @returns {Promise}
*/
export function getAppWhiteIP(
  appId: string
): Promise<API.ResponseGetAppWhiteIP> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/ip_white_list`,
    method: 'get',
  })
}

/**
* @name 8. 添加应用IP白名单
* @param data
* @returns {Promise}
*/
export function addAppWhiteIP(
  appId: string,
  data: API.ResquestAddAppWhiteIP
): Promise<API.ResponseAddAppWhiteIP> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/ip_white_list`,
    method: 'post',
    data
  })
}

/**
* @name 9. 删除应用IP白名单
* @param data
* @returns {Promise}
*/
export function deleteAppWhiteIP(
  appId: string,
  data: API.ResquestDeleteAppWhiteIP
): Promise<API.ResponseDeleteAppWhiteIP> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/ip_white_list`,
    method: 'delete',
    data
  })
}

/**
* @name 10. 修改应用在线编辑配置 参数较多查看开放平台文档
* @param data
* @returns {Promise}
*/
export function modifyAppOnlineEditConfig(
  appId: string,
  data: any
): Promise<API.ResponseModifyAppOnlineEditConfig> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/online_edit`,
    method: 'put',
    data
  })
}

/**
* @name 11. 获取应用在线编辑配置
* @param data
* @returns {Promise}
*/
export function getAppOnlineEditConfig(
  appId: string
): Promise<API.ResponseGetAppOnlineEditConfig> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/online_edit`,
    method: 'get',
  })
}

/**
* @name 12. 修改应用在线预览配置
* @param data
* @returns {Promise}
*/
export function modifyAppOnlinePreViewConfig(
  appId: string,
  data: API.ResquestModifyAppOnlinePreViewConfig
): Promise<API.ResponseModifyAppOnlinePreViewConfig> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/online_preview`,
    method: 'put',
    data
  })
}

/**
* @name 13. 获取应用在线预览配置
* @param data
* @returns {Promise}
*/
export function getAppOnlinePreViewConfig(
  appId: string
): Promise<API.ResponseGetAppOnlinePreViewConfig> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/online_preview`,
    method: 'get',
  })
}

/**
* @name 14. 修改应用格式处理配置
* @param data
* @returns {Promise}
*/
export function modifyAppFormatConfig(
  appId: string,
  data: API.ResquestModifyAppFormatConfig
): Promise<API.ResponseModifyAppFormatConfig> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/format_handle`,
    method: 'put',
    data
  })
}

/**
* @name 15. 获取应用格式处理配置
* @param data
* @returns {Promise}
*/
export function getAppFormatConfig(
  appId: string
): Promise<API.ResponseGetAppFormatConfig> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/format_handle`,
    method: 'get',
  })
}

/**
* @name 16. 获取某个服务商下的应用列表
* @param data
* @returns {Promise}
*/
export function getDeveloperApp(
  page: number | string,
  limit: number | string,
  developerId: number | string
): Promise<API.ResponseGetDeveloperApp> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/list?page=${page}&limit=${limit}&developer_id=${developerId}`,
    method: 'get',
  })
}

/**
* @name 17. 获取应用所能申请的功能列表
* @param data
* @returns {Promise}
*/
export function getAppFuncList(
  appId: number | string
): Promise<API.ResponseGetAppFuncList> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/function/list?app_id=${appId}`,
    method: 'get',
  })
}

/**
* @name 18. 为某个应用获取某个能力
* @param data
* @returns {Promise}
*/
export function setFuncForApp(
  appId: number | string,
  functionId: number | string,
  data: API.ResquestSetFuncForApp
): Promise<API.ResponseApi> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/function/${functionId}`,
    method: 'put',
    data
  })
}

/**
* @name 19. 获取应用的功能列表
* @param data
* @returns {Promise}
*/
export function getFuncForApp(
  appId: number | string
): Promise<API.ResponseGetFuncForApp> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/function/list`,
    method: 'get',
  })
}

/**
* @name 20. 获取licence信息
* @param data
* @returns {Promise}
*/
export function getAppLicence(): Promise<API.ResponseGetAppLicence> {
  // @ts-ignore
  return request({
    url: '/open/admin/v1/licence/detail',
    method: 'get',
  })
}

/**
* @name 21. 获取应用空间设置
* @param data
* @returns {Promise}
*/
export function getAppSpace(
  appId: string
): Promise<API.ResponseGetAppSpace> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/space/config`,
    method: 'get',
  })
}

/**
* @name 22. 修改应用空间设置
* @param data
* @returns {Promise}
*/
export function modifyAppSpace(
  appId: string,
  data: API.ResquestModifyAppSpace
): Promise<API.ResponseModifyAppSpace> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/space/config`,
    method: 'put',
    data,
  })
}

/**
* @name 23. 获取应用空间状态
* @param data
* @returns {Promise}
*/
export function getAppSpaceStatus(
  appId: string
): Promise<API.ResponseGetAppSpaceStatus> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/space/stat`,
    method: 'get',
  })
}

/**
* @name 24. 修改应用证书过期回调地址
* @param data
* @returns {Promise}
*/
export function modifyAppCertCallback(
  appId: string,
  data: API.ResquestModifyAppCertCallback
): Promise<API.ResponseModifyAppCertCallback> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/cert_expiration/callback_addr`,
    method: 'put',
    data
  })
}

/**
* @name 25. 获取应用证书过期回调地址
* @param data
* @returns {Promise}
*/
export function getAppCertCallback(
  appId: string
): Promise<API.ResponseGetAppCertCallback> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/space/stat`,
    method: 'get',
  })
}

/**
* @name 26. 修改应用跨域白名单配置
* @param data
* @returns {Promise}
*/
export function modifyAppWhiteIPConfig(
  appId: string,
  data: API.ResquestModifyAppWhiteIPConfig
): Promise<API.ResponseModifyAppWhiteIPConfig> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/csrf_white_list`,
    method: 'put',
    data
  })
}

/**
* @name 27. 获取应用跨域白名单配置
* @param data
* @returns {Promise}
*/
export function getAppWhiteIPConfig(
  appId: string
): Promise<API.ResponseGetAppWhiteIPConfig> {
  // @ts-ignore
  return request({
    url: `/open/admin/v1/app/${appId}/csrf_white_list`,
    method: 'get',
  })
}

/**
 * 应用授权API
 */

/**
* @name 1. 应用获取app_token
* @param data
* @returns {Promise}
*/
export function getAppToken(
  appId: string,
  scope: string
): Promise<API.ResponseGetAppToken> {
  // @ts-ignore
  return request({
    url: `/open/auth/v1/app/inscope/token?app_id=${appId}&scope=${scope}`,
    method: 'get',
  })
}

/**
 * 在线编辑API
 */

/**
* @name 1. 获取在线编辑链接
* @param data
* @returns {Promise}
*/
export function getOnlineEditUrl(
  appToken: string,
  fileId: string,
  type: string,
  sceneId: string
): Promise<API.ResponseGetOnlineEditUrl> {
  // @ts-ignore
  return request({
    url: `/open/weboffice/v2/url?app_token=${appToken}&file_id=${fileId}&type=${type}&scene_id=${sceneId}`,
    method: 'get',
  })
}

/**
* @name 2. 查看文档在线用户信息
* @param data
* @returns {Promise}
*/
export function getFileCooperators(
  appToken: string,
  fileId: string
): Promise<API.ResponseGetFileCooperators> {
  // @ts-ignore
  return request({
    url: `/open/om/weboffice/v1/file/${fileId}/cooperators?app_token=${appToken}`,
    method: 'get',
  })
}

/**
* @name 3. 强制刷新编辑页面
* @param data
* @returns {Promise}
*/
export function getRefreshPage(
  appToken: string,
  id: string
): Promise<API.ResponseApi> {
  // @ts-ignore
  return request({
    url: `/open/om/weboffice/v1/file/${id}/edit/refresh?app_token=${appToken}`,
    method: 'get',
  })
}

/**
* @name 4. 获取编辑锁状态
* @param data
* @returns {Promise}
*/
export function getLockStatus(
  appToken: string,
  fileId: string
): Promise<API.ResponseGetLockStatus> {
  // @ts-ignore
  return request({
    url: `/open/om/docs/editlock/v1/lock_status?app_token=${appToken}&file_id=${fileId}`,
    method: 'get',
  })
}

/**
* @name 5. 编辑锁加锁
* @param data
* @returns {Promise}
*/
export function editLockStatus(
  appToken: string,
  data: API.ResquestEditLockStatus
): Promise<API.ResponseEditLockStatus> {
  // @ts-ignore
  return request({
    url: `/open/om/docs/editlock/v1/lock_status?app_token=${appToken}`,
    method: 'post',
    data
  })
}

/**
* @name 6. 编辑锁释放
* @param data
* @returns {Promise}
*/
export function unLockStatus(
  appToken: string,
  data: API.ResquestUnLockStatus
): Promise<API.ResponseUnLockStatus> {
  // @ts-ignore
  return request({
    url: `/open/om/docs/editlock/v1/un_lock?app_token=${appToken}`,
    method: 'post',
    data
  })
}

/**
* @name 7. 文档保存
* @param data
* @returns {Promise}
*/
export function saveFile(
  appToken: string,
  fileId: string, // 文件id
  data: API.ResquestsaveFile
): Promise<API.ResponsesaveFile> {
  // @ts-ignore
  return request({
    url: `/open/om/weboffice/v1/file/${fileId}/save?app_token=${appToken}`,
    method: 'post',
    data
  })
}

/**
 * 在线编辑API
 */

/**
* @name 1. 获取在线预览链接v2
* @param data
* @returns {Promise}
*/
export function getOnlinePreviewUrl(
  appToken: string,
  fileId: string,
  sceneId: string
): Promise<API.ResponseGetOnlinePreviewUrl> {
  // @ts-ignore
  return request({
    url: `/preview/v2/url?app_token=${appToken}&file_id=${fileId}&scene_id=${sceneId}`,
    method: 'get',
  })
}

/**
 * 格式处理
 */

/**
 * 1. 内容操作 /open+/cps/v2/office/operate
 * 内容操作提供为文档清稿、加文字水印、加图片水印操作的能力：
 * 「清稿」操作支持的文件格式： DOC、DOT、WPS、WPT、DOCX、DOTX、DOCM、DOTM、RTF、XML、WORD_XML、UOF、UOT
 * 「加水印」操作支持的文档格式： DOC、DOT、WPS、WPT、DOCX、DOTX、DOCM、DOTM、RTF、XML、WORD_XML、UOF、UOT、PDF
 * 「加水印」操作支持的图片水印格式： EMF、WMF、JPG、JPEG、JPE、PNG、BMP、GIF、TIF、TIFF
 * 当存在多个操作时，原文件格式必须为所有操作支持都支持的格式.
 * @param app_token
 * @param data
 * @returns
 */
export const officeOperate = async (
  appToken: string,
  data: API.RequestOfficeOperate
): Promise<API.ResponseApi> =>
  request.request({
    url: `/open/cps/v2/office/operate?app_token=${appToken}`,
    method: 'POST',
    data
  })

/**
 * 2. 图片操作 /open+/cps/v2/image/operate
 * 支持的文件格式： JPEG、JPG、PNG、BMP
 * @param app_token
 * @param data
 * @returns
 */
export const imageOperate = async (
  appToken: string,
  data: API.RequestImageOperate
): Promise<API.ResponseApi> =>
  request.request({
    url: `/open/cps/v2/image/operate?app_token=${appToken}`,
    method: 'POST',
    data
  })

/**
 * 3. 多书签套用 /open+/cps/v2/office/wrapheader
 * 模板文件支持的格式： DOC、DOT、WPS、WPT、DOCX、DOTX、DOCM、DOTM、RTF、XML、WORD_XML、UOF、UOT
 * 文档样章格式： DOC、DOT、WPS、WPT、DOCX、DOTX、DOCM、DOTM、RTF、MHT、MHTML、TXT、HTM、HTML、XML、WORD_XML、UOF、UOT
 * 图片样章格式： EMF、WMF、JPG、JPEG、JPE、PNG、BMP、GIF、TIF、TIFF、WDP、SVG、CGM
 * @param app_token
 * @param data
 * @returns
 */
export const officeWrapheader = async (
  appToken: string,
  data: API.RequestOfficeWrapheader
): Promise<API.ResponseApi> =>
  request.request({
    url: `/open/cps/v2/office/wrapheader?app_token=${appToken}`,
    method: 'POST',
    data
  })

/**
 * 4. 文档合并 /open+/cps/v2/office/merge
 * 文档合并只支持同类型文档合并，合并后文档格式默认以第一个文件格式为准（存在XLSX文件时，默认以XLSX文件格式为准）
 * @param app_token
 * @param data
 * @returns
 */
export const officeMerge = async (
  appToken: string,
  data: API.RequestOfficeMerge
): Promise<API.ResponseApi> =>
  request.request({
    url: `/open/cps/v2/office/merge?app_token=${appToken}`,
    method: 'POST',
    data
  })

/**
 * 5. 文档拆分 /open+/cps/v2/office/split
 * 文档拆分支持的文件格式： DOC、DOCX、WPS、PPT、PPTX、XLS、XLSX、PDF
 * @param app_token
 * @param data
 * @returns
 */
export const officeSplit = async (
  appToken: string,
  data: API.RequestOfficeSplit
): Promise<API.ResponseApi> =>
  request.request({
    url: `/open/cps/v2/office/split?app_token=${appToken}`,
    method: 'POST',
    data
  })

/**
 * 6. 文档转换 /open+/cps/v2/office/convert
 * 支持的格式详见：http://172.21.131.59/open#/docs/server/content-handle/api-list#des13
 * @param app_token
 * @param data
 * @returns
 */
export const officeConvert = async (
  appToken: string,
  data: API.RequestOfficeConvert
): Promise<API.ResponseApi> =>
  request.request({
    url: `/open/cps/v2/office/convert?app_token=${appToken}`,
    method: 'POST',
    data
  })

/**
 * 7. 智能公文 /open+/cps/v2/office/smartofficial
 * 智能公文支持的文件格式： WPT、WPS、DOCX
 * 智能公文支持的模板格式： WPT、WPS、DOCX、DOTX
 * 智能公文预设模板（公文新国标模板）http://172.21.131.59/open#/docs/server/content-handle/api-list#des7
 * @param app_token
 * @param data
 * @returns
 */
export const smartofficial = async (
  appToken: string,
  data: API.RequestSmartofficial
): Promise<API.ResponseApi> =>
  request.request({
    url: `/open/cps/v2/office/smartofficial?app_token=${appToken}`,
    method: 'POST',
    data
  })

/**
 * 8. 查询文档书签 /open+/cps/v2/office/bookmark
 * @param app_token
 * @param data
 * @returns
 */
export const officeBookmark = async (
  appToken: string,
  data: API.RequestOfficeBookmark
): Promise<API.ResponseApi> =>
  request.request({
    url: `/open/cps/v2/office/bookmark?app_token=${appToken}`,
    method: 'POST',
    data
  })

/**
 * 9. 限制书签编辑 /open+/cps/v1/office/set/bookmarkpermissions
 * 支持的文件格式： DOCX、DOTM、DOCM
 * @param app_token
 * @param data
 * @returns
 */
export const setBookmarkPermiss = async (
  appToken: string,
  data: API.RequestSetBookmarkPermiss
): Promise<API.ResponseApi> =>
  request.request({
    url: `/open/cps/v1/office/set/bookmarkpermissions?app_token=${appToken}`,
    method: 'POST',
    data
  })

/**
 * 10. 查询只读/可编辑书签 /open+/cps/v1/office/query/bookmarkpermissions
 * 支持的文件格式： DOC、DOT、WPS、WPT、DOCX、DOTX、DOCM、DOTM、RTF、XML、WORD_XML、UOF、UOT
 * @param app_token
 * @param data
 * @returns
 */
export const queryBookmarkPermiss = async (
  appToken: string,
  data: API.RequestQueryBookmarkPermiss
): Promise<API.ResponseApi> =>
  request.request({
    url: `/open/cps/v1/office/query/bookmarkpermissions?app_token=${appToken}`,
    method: 'POST',
    data
  })

/**
 * 11. 任务查询 /open+/cps/v1/task/query
 * @param app_token
 * @param data
 * @returns
 */
export const taskQuery = async (
  appToken: string,
  data: API.RequestTaskQuery
): Promise<API.ResponseTaskQuery> =>
  request.request({
    url: `/open/cps/v1/task/query?app_token=${appToken}`,
    method: 'POST',
    data
  })

/**
 * 12. 文件下载 /open+/cps/v1/download/file/:download_id
 * @param app_token
 * @param downloadId 文档下载id
 * @returns 返回文件流
 */
export const downloadFile = async (
  appToken: string,
  downloadId: string
) =>
  request.request({
    url: `/open/cps/v1/download/file/${downloadId}?app_token=${appToken}`,
    method: 'GET'
  })
