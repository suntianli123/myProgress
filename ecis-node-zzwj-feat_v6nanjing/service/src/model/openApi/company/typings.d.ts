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
    }
  }

  /** wps 1. 获取企业信息 /open+/plus/v1/company */
  interface ResponseCompany extends ResponseApi {
    company?: {
      // 企业信息
      company_id: string // 企业id
      name: string // 企业名
      logo: string // 企业logo地址
      ctime: number // 企业创建时间，秒为单位的时间戳
      status: string // 企业状态
    }
  }

  /** 2. 创建部门 /open+/plus/v1/company/depts */
  interface RequestCompanyDepts {
    name: string // 部门名
    dept_pid: string // 父部门id
    order?: number // 部门排序字段，值越大排序优先级越高
  }

  interface ResponseCompanyDepts extends ResponseApi {
    dept_id?: string // 部门id
  }

  /** wps 3. 获取子部门列表 /plus/v1/company/depts/:dept_id/children */
  interface ResponseCompanydDeptscChildren extends ResponseApi {
    depts?: Array<{
      dept_pid: string // 父部门id
      dept_id: string // 部门id
      name: string // 部门名
      ctime: number // 部门创建时间，秒为单位的时间戳
      order: number | string // 部门排序字段，值越大排序优先级越高
    }>
  }

  /** wps 4. 修改部门 /open+/plus/v1/company/depts/:dept_id */
  interface RequestPutCompanyDepts {
    name?: string // 部门名
    dept_pid?: string // 父部门id
    order?: number | string // 部门排序字段，值越大排序优先级越高
  }

  /** wps 6. 批量创建部门 /open+//plus/v1/batch/company/depts */
  interface RequestBatchCreateCompanyDepts {
    depts?: Array<{
      name: string // 部门名
      dept_pid: string // 父部门id
      order?: number | string // 部门排序字段，值越大排序优先级越高
    }>
  }

  interface ResponseBatchCreateCompanyDepts extends ResponseApi {
    dept_ids?: string[] // 部门Id数组
  }

  /** wps 7. 批量创建部门 /open+//plus/v1/batch/company/depts */
  interface ResponseBatchGetCompanyDepts extends ResponseApi {
    depts?: Array<{
      dept_pid: string // 父部门id
      dept_id: string // 部门id
      name: string // 部门名
      ctime: number // 企业创建时间，秒为单位的时间戳
      order: number | string // 部门排序字段，值越大排序优先级越高
    }>
    result: number // 错误码
  }

  /** wps 8. 批量修改部门 /open+//plus/v1/batch/company/depts */
  interface RequestBatchEditCompanyDepts {
    depts: Array<{
      dept_id: string // 部门id
      name?: string // 部门名
      dept_pid?: string // 父部门id
      order?: number | string // 部门排序字段，值越大排序优先级越高
    }>
  }

  /** wps 9. 批量删除部门 /open+//plus/v1/batch/company/depts */

  /** wps 10. 创建企业成员 /open+/plus/v1/company/company_users */
  interface RequestCompanyUsers {
    login_name: string // 登录名
    password: string // 登录密码
    name: string // 昵称
    third_union_id: string // 第三方企业用户unionid
    role_id: number // 成员角色。1：超管，2：管理员，3：普通成员
    email?: string // 邮箱
    employee_id?: string // 工号
    phone?: string // 手机号
    source?: string // 来源
    telephone?: string // 座机号
    title?: string // 职称
    city?: string // 办公城市
    country?: string // 办公国家
    employer?: string // 就职单位
    employment_status?: string //  员工状态:[active;notactive;dimission;disabled]
    employment_type?: string //  员工类型：[permanent;intern]
    gender?: string // 性别：[male;female;secrecy]
    work_place?: string // 办公地点
    leader?: string // 直属主管
  }

  interface ResponseCompanyUsers extends ResponseApi {
    company_uid?: string // 企业成员id
  }

  /** wps 11. 获取企业下的企业成员列表 /open+/plus/v1/company/company_users */
  interface ResponseGetCompanyUsers extends ResponseApi {
    company_users?: Array<{
      company_uid: string // 企业成员id
      name: string // 成员名
      // 成员所属部门列表
      depts?: Array<{ id: string; name: string }>
      third_union_id: string // 第三方unionid (仅第三方同步到WPS的场景需要关注)
      role_id: number // 成员角色id。1：超管，2：管理员，3：普通成员
      status: string // 成员状态。active(正常),notactive(未激活), disabled(禁用)
      email: string // 成员邮箱
      phone: string // 成员手机号
      ctime: number // 成员创建时间，秒为单位的时间戳
      city: string // 办公城市
      country: string // 办公国家
      telephone: string // 固定电话
      employer: string // 就职单位
      employment_status: string // 员工状态:[active;notactive;dimission;disabled]
      employment_type: string // 员工类型：[permanent;intern]
      gender: string // 性别：[male;female;secrecy]
      leader: string // 直属主管的company_uid
      work_place: string // 办公地点
      order: number | string // 排序字段
      deptId: string
      deptName: string
    }>
  }

  /** wps 12. 修改企业成员 /open+/plus/v1/company/company_users/:company_uid */
  interface RequestPutCompanyUsers {
    password?: string // 登录密码
    def_dept_id?: string // 默认部门id
    email?: string // 邮箱
    employee_id?: string // 工号
    name?: string // 昵称
    phone?: string // 手机号
    role_id?: number // 成员角色。1：超管，2：管理员，3：普通成员
    telephone?: string // 座机号
    title?: string // 职称
    city?: string // 办公城市
    country?: string // 办公国家
    employer?: string // 就职单位
    employment_status?: string //  员工状态:[active;notactive;dimission;disabled]
    employment_type?: string //  员工类型：[permanent;intern]
    gender?: string // 性别：[male;female;secrecy]
    work_place?: string // 办公地点
    leader?: string // 直属主管
  }

  /** wps 13. 删除企业成员 /open+/plus/v1/company/company_users/:company_uid */

  /** wps 14. 修改企业成员 /open+/plus/v1/batch/company/company_users */
  interface RequestBatchCreateCompanyUsers {
    users: {
      login_name: string // 登录名
      name: string // 昵称
      third_union_id: string // 第三方企业用户unionid
      role_id: number // 成员角色。1：超管，2：管理员，3：普通成员
      password: string // 登录密码
      email?: string // 邮箱
      employee_id?: string // 工号
      phone?: string // 手机号
      source?: string // 来源
      telephone?: string // 座机号
      title?: string // 职称
      city?: string // 办公城市
      country?: string // 办公国家
      employer?: string // 就职单位
      employment_status?: string // 员工状态:[active;notactive;dimission;disabled]
      employment_type?: string // 员工类型：[permanent;intern]
      gender?: string // 性别：[male;female;secrecy]
      work_place?: string // 办公地点
      leader?: string // 直属主管
    }
  }

  interface ResponseBatchCreateCompanyUsers extends ResponseApi {
    company_uid?: string[] // 企业成员id
  }

  /** wps 15. 批量获取企业成员信息 /plus/v1/batch/company/company_users */
  interface ResponseBatchGetCompanyUsers extends ResponseApi {
    company_users?: Array<{
      company_uid: string // 企业成员id
      name: string // 成员名
      // 成员所属部门列表
      depts?: Array<{ id: number; name: string }>
      third_union_id: string // 第三方unionid (仅第三方同步到WPS的场景需要关注)
      role_id: number // 成员角色id。1：超管，2：管理员，3：普通成员
      status: string // 成员状态。active(正常),notactive(未激活), disabled(禁用)
      email: string // 成员邮箱
      phone: string // 成员手机号
      ctime: number // 成员创建时间，秒为单位的时间戳
      city: string // 办公城市
      country: string // 办公国家
      telephone: string // 固定电话
      employer: string // 就职单位
      employment_status: string // 员工状态:[active;notactive;dimission;disabled]
      employment_type: string // 员工类型：[permanent;intern]
      gender: string // 性别：[male;female;secrecy]
      leader: string // 直属主管的company_uid
      work_place: string // 办公地点
      order: number | string // 排序字段
    }>
  }

  /** wps 16. 批量修改企业成员信息 /open+/plus/v1/batch/company/company_users */
  interface RequestBatchPutCompanyUsers {
    users: Array<{
      company_uid: string // 企业用户id
      password?: string // 登录密码
      def_dept_id?: string // 默认部门id
      email?: string // 邮箱
      employee_id?: string // 工号
      name?: string // 昵称
      phone?: string // 手机号
      role_id: number // 成员角色。1：超管，2：管理员，3：普通成员
      telephone?: string // 座机号
      title?: string // 职称
      city?: string // 办公城市
      country?: string // 办公国家
      employer?: string // 就职单位
      employment_status?: string // 员工状态:[active;notactive;dimission;disabled]
      employment_type?: string // 员工类型：[permanent;intern]
      gender?: string // 性别：[male;female;secrecy]
      work_place?: string // 办公地点
      leader?: string // 直属主管
    }>
  }

  /** wps 17. 批量删除企业成员 /open+/plus/v1/batch/company/company_users */

  /** wps 18. 批量禁用企业成员 /open+/plus/v1/batch/company/company_users/disable */

  /** wps 19. 批量禁用企业成员 /open+/plus/v1/batch/company/company_users/enable */

  /** wps 20. 批量禁用企业成员 /open+/plus/v1/company/depts/:dept_id/company_users/:company_uid */

  /** wps 21. 获取部门下的企业成员列表 /open+/plus/v1/company/depts/:dept_id/company_users/:company_uid  */
  interface ResponseGetDeptsCompanyUsers extends ResponseApi {
    company_users?: Array<{
      company_uid: string // 企业成员id
      name: string // 成员名
      // 成员所属部门列表
      depts?: Array<{ id: number; name: string }>
      third_union_id: string // 第三方unionid (仅第三方同步到WPS的场景需要关注)
      role_id: number // 成员角色id。1：超管，2：管理员，3：普通成员
      status: string // 成员状态。active(正常),notactive(未激活), disabled(禁用)
      email: string // 成员邮箱
      phone: string // 成员手机号
      ctime: number // 成员创建时间，秒为单位的时间戳
      city: string // 办公城市
      country: string // 办公国家
      telephone: string // 固定电话
      employer: string // 就职单位
      employment_status: string // 员工状态:[active;notactive;dimission;disabled]
      employment_type: string // 员工类型：[permanent;intern]
      gender: string // 性别：[male;female;secrecy]
      leader: string // 直属主管的company_uid
      work_place: string // 办公地点
      order: number | string // 排序字段
    }>
  }

  /** wps 22. 将企业成员移出部门 /open+/plus/v1/batch/company/depts/:dept_id/company_users */

  /** wps 23. 批量将企业成员添加到部门 /open+/plus/v1/batch/company/depts/:dept_id/company_users */

  /** wps 24. 批量获取部门下的企业成员 /open+/plus/v1/company/depts/:dept_id/company_users/:company_uid  */
  interface ResponseGetDeptsCompanyUsers extends ResponseApi {
    company_users?: Array<{
      company_uid: string // 企业成员id
      name: string // 成员名
      // 成员所属部门列表
      depts?: Array<{ id: number; name: string }>
      third_union_id: string // 第三方unionid (仅第三方同步到WPS的场景需要关注)
      role_id: number // 成员角色id。1：超管，2：管理员，3：普通成员
      status: string // 成员状态。active(正常),notactive(未激活), disabled(禁用)
      email: string // 成员邮箱
      phone: string // 成员手机号
      ctime: number // 成员创建时间，秒为单位的时间戳
      city: string // 办公城市
      country: string // 办公国家
      telephone: string // 固定电话
      employer: string // 就职单位
      employment_status: string // 员工状态:[active;notactive;dimission;disabled]
      employment_type: string // 员工类型：[permanent;intern]
      gender: string // 性别：[male;female;secrecy]
      leader: string // 直属主管的company_uid
      work_place: string // 办公地点
      order: number | string // 排序字段
    }>
  }

  /** wps 25. 批量将企业成员移出部门 /open+/plus/v1/batch/company/depts/:dept_id/company_users */

  /** wps 26. 批量修改企业成员信息 /open+/plus/v1/batch/company/company_users */
  interface ResponseSearchDepts extends ResponseApi {
    company_uid: ResponseSearchDepts
    data?: {
      total: number
      members?: Array<{
        company_uid: string
        name: string
        dept_path: string
      }>
    }
  }

  /** wps 27. 批量修改企业成员信息 /open+/plus/v1/batch/company/company_users */
  interface ResponseGetDeptsId extends ResponseApi {
    company_uid?: string // 用户在企业下的id
  }

  /** wps 28. 同步企业成员third_union_id /plus/v1/company/company_users/:company_uid/third-bind */
  interface RequestDeptsThirdBind {
    third_union_id: string // 第三方unionid
    user_name?: string // 用户名
  }

  /** wps 29. 批量通过third_union_id查询企业成员 /plus/v1/company/company_users/by-third-union-ids */
  interface RequestBatchThirdBindDepts {
    third_union_ids: string // 第三方unionid,逗号分隔的字符串
    status?: string // 状态，逗号分隔的字符串,默认active。可选值：active(正常), notactive(未激活), disabled(禁用)
  }

  interface ResponseBatchThirdBindDepts extends ResponseApi {
    data:{
      company_users: Array<{
        company_uid: string // 企业成员id
        name: string // 成员名
        avatar: string // 成员头像
        third_union_id: string // 第三方unionid
        role_id: number // 成员角色id。1：超管，2：管理员，3：普通成员
        status: string // 成员状态。active(正常),notactive(未激活), disabled(禁用)
        email: string // 成员邮箱
        phone: string // 成员手机号
        ctime: number // 成员创建时间，秒为单位的时间戳
      }>
    }
  }

  /** wps 30. 批量激活企业用户账号 /plus/v1/company/company_users/by-third-union-ids */

  /** wps 31. 批量注销企业用户账号登录信息 /kopen/v1/dev/company/users/logout/batch */

  /** wps 32. 批量修改部门成员排序值 /plus/v1/company/deptmembers/order/reset */
  interface RequestBatchPutDeptsOrder {
    depts: Array<{
      company_uid: string // 企业用户id
      dept_id: string // 企业用户id
      order: number | string // 企业用户id
    }>
  }
}
