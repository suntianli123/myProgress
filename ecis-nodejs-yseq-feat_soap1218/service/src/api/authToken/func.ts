import { sdkInstance } from '../../grpc/sdk'
import { resCheck, sdkCheck } from '../../util/msgCode'
import { companyToken } from '../../model/openApi/company'

/**
 * @name  验证是否刷新
 * @param tempToken
 * @returns {boolean} true 刷新 false不刷新
 */
function chechTimer(tempToken: any) {
  let res = true
  if (tempToken && tempToken.data && tempToken.data.data) {
    try {
      const temp = JSON.parse(tempToken.data.data).expire
      res = temp < new Date().getTime()
    } catch (error) {
      res = true
    }
  }
  return res
}

/**
 * @name get
 * @returns {string} 企业token
 */
export async function getCompanyToken(reset = false): Promise<string> {
  let tempToken: any = await sdkInstance.middleware.cache.get('company_token')
  sdkCheck(tempToken)
  if (!tempToken.data.data || chechTimer(tempToken) || reset) {
    /** 通过企业app应用获取企业信息 */
    const resData: any = await companyToken()
    resCheck(resData)
    // eslint-disable-next-line camelcase
    const { expires_in, company_token } = resData.token
    // expires_in默认86400 24小时 *1000转换成秒 - 提前一分钟过期
    // eslint-disable-next-line camelcase
    const timestamp = new Date().getTime() + expires_in * 1000 - 1000 * 60
    const value = { value: company_token, expire: timestamp }
    const setCompanyToken = await sdkInstance.middleware.cache.set(
      'company_token',
      JSON.stringify(value)
    )
    sdkCheck(setCompanyToken)
    // eslint-disable-next-line camelcase
    tempToken = company_token
  } else {
    tempToken = JSON.parse(tempToken.data.data).value
  }
  return tempToken
}

/**
 * @name get
 * @returns {string}  获取第三方token, 有效期30秒
 */
export async function getThirdToken(): Promise<string> {
  const resData = await companyToken()
  return `${resData}`
}
