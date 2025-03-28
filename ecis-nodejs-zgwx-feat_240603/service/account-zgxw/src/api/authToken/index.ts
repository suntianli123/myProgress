import { Context } from 'koa'
import { resJson, resErrJson } from '../../util/msgCode'
import { getCompanyToken } from './func'

/**
 * @name 前置条件-企业授权-获取companyToken
 * @path /api/authToken/companyToken
 * @param {object} Context
 * @returns {object}
 */
export async function companyToken(ctx: Context) {
  let res
  try {
    const { reset } = ctx.request.query
    /** 获取企业token */
    const token = await getCompanyToken(!!reset)
    res = resJson({ data: token })
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
 * @name 前置条件-企业授权-重置companyToken
 * @path /api/authToken/companyToken
 * @param {object} Context
 * @returns {object}
 */
export async function resCompanyToken(ctx: Context) {
  let res
  try {
    /** 获取企业token */
    const token = await getCompanyToken(true)
    res = resJson({ data: token })
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
