/* eslint-disable camelcase */

/**
 * 企业通讯录相关接口
 * */

export namespace API {
  /** 公共返回值 */
  interface ResponseApi {
    result: number
    msg?: string
  }

  /** wps-企业Token /company/inner/token */
  interface ResponseCompanyToken extends ResponseApi {
    token?: {
      expires_in: number
      company_token: string
      result: number
    }
  }

  /** wps-企业授权 /view/company/authorize */
  interface ResponseCompanyAuthorize extends ResponseApi {
    app_id: string // 应用ID
    company_id: string // 企业ID
    scope: string // 企业授权的权限列表，多个值以逗号分割
    status: string // 授权状态:  授权：enable 撤权：disable
  }

  /** wps 1. 用户授权，获取code /auth/v1/user/authorization */

  /** wps 2. 通过code换取网页授权access_token /auth/v1/user/token */
  interface ResponseAuthUserToken extends ResponseApi {
    token?: {
      appid: string // 凭证所属的应用id
      expires_in: number // 凭证有效期，单位为秒
      access_token: string // 访问凭证
      refresh_token: string // 刷新凭证，在授权未过期之前，可用于刷新/重新获取访问凭证
      openid: string // 用户在应用内的唯一标识
    }
  }

  /** wps 3. 刷新access_token (如果需要) /auth/v1/user/token */
  interface ResponseAuthUserTokenRefresh extends ResponseApi {
    token?: {
      appid: string // 凭证所属的应用id
      expires_in: number // 凭证有效期，单位为秒
      access_token: string // 访问凭证
      refresh_token: string // 刷新凭证，在授权未过期之前，可用于刷新/重新获取访问凭证
      openid: string // 用户在应用内的唯一标识
    }
  }

  /** wps 4. 通过third_union_id换取授权access_token /auth/v1/user/token/by-unionid */
  interface ResponseAuthUserTokenByUnionid extends ResponseApi {
    token?: {
      open_id: string // 用户在应用下的唯一标识
      expires_in: number // 有效期，单位为秒
      access_token: string // 访问凭证
      refresh_token: string // 刷新会导致原刷新凭证失效，并返回一个新的刷新凭证
      union_id: string // 用户在服务商下的唯一标识
    }
  }

  /** wps 5. 通过third_union_id换取授权access_token /auth/v1/app/inscope/token */
  interface ResponseAuthInscopeToken extends ResponseApi {
    token?: {
      app_token: string // 应用凭证
      expires_in: number // 过期时间，单位为秒的时间戳
    }
  }
}
