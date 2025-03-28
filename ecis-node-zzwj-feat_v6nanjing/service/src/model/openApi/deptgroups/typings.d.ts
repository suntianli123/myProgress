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

  /** 1. 创建部门团队 */
  interface ResquestCreateDeptgroups {
    is_sync: string // 部门已存在成员加入部门团队是否同步完成(默认为false)
  }

  interface ResponseCreateDeptgroups extends ResponseApi {
    dept_group?: {
      dept_id: string // 部门id
      group_id: string // 团队id
      group_name: string // 团队名
      group_type: string // 团队类型
    }
  }

  /** 2. 获取部门团队 */

  interface ResponseGetDeptgroups extends ResponseApi {
    dept_group?: {
      dept_id: string // 部门id
      group_id: string // 团队id
      group_name: string // 团队名
      group_type: string // 团队类型
    }
  }

  /** 3. 设置部门团队拥有者 */
  interface ResquestSetDeptgroupsOwner {
    company_uid: string // 即将被设置为拥有者的企业用户id
  }

  /** 4. 部门搜索 */
  interface ResponseSearchDeptgroups extends ResponseApi {
    data?: {
      total: number // 总数
      departments?: [
        {
          id: string
          name: string
          comp_id: string
          parent_id: string
          id_path: string
          bM7dPMdBmWWyMDE
          abs_path: string
          highlight?: {
            name?: Array
          }
          weight: string
          children?: [
            {
              id: string
              name: string
              comp_id: string
              parent_id: string
              id_path: string
              abs_path: string
              highlight: {
                name: Array
              }
              weight: string
            }
          ]
        }
      ]
    }
  }

  /** 普通团队 */

  /** 1. 创建团队 */
  interface ResquestCreateCorpgroups {
    group_name: string // 团队名称
  }
  interface ResponseCreateCorpgroups extends ResponseApi {
    group_id: string // 团队id
  }

  /** 2.获取团队列表 */
  interface ResponseGetCorpgroups extends ResponseApi {
    groups?: [
      {
        group_id: string // 团队id
        group_name: string // 团队名
        group_type: string // 团队类型
        ctime: number // 创建时间
        mtime: number // 修改时间
        secure: number // 是否是安全团队
        user_role: string // 用户角色
      }
    ]
    next_offset?: number
  }
}
