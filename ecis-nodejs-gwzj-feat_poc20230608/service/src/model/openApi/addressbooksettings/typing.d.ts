/**
 * 通讯录设置相关接口
 * */
export namespace API {
  /** 公共返回值 */
  interface ResponseApi {
    result: number
    msg?: string
  }

  /** wps 1. 创建通讯录可见性规则 */
  interface RequestCreateRuleOfAddressBook {
    operate_type: string // 操作类型
    set_obj: Array<{
      abs_path?: string // 部门路径
      obj_id: string // 对象ID
      obj_name?: string // 对象名称
      obj_type: number // 对象类型， 仅为 user 或 dept
    }>
    visible_obj: Array<{
      abs_path?: string // 部门路径
      obj_id: string // 对象ID
      obj_name?: string // 对象名称
      obj_type: number // 对象类型， 仅为 user 或 dept
    }>
  }

  interface ResponseCreateRuleOfAddressBook extends ResponseApi {
    rule_id: string // id
  }

   /** wps 2. 修改通讯录可见性规则 */
   interface RequestPutRuleOfAddressBook {
    rule_id: string // rule id
    operate_type: string // 操作类型
    set_obj: Array<{
      abs_path?: string // 部门路径
      obj_id: string // 对象ID
      obj_name?: string // 对象名称
      obj_type: number // 对象类型， 仅为 user 或 dept
    }>
    visible_obj: Array<{
      abs_path?: string // 部门路径
      obj_id: string // 对象ID
      obj_name?: string // 对象名称
      obj_type: number // 对象类型， 仅为 user 或 dept
    }>
  }

  interface ResponsePuteRuleOfAddressBook extends ResponseApi {
    rule_id: string // id
  }

  /** wps 3. 获取通讯录可见性规则 */
  interface ResponseGetRuleOfAddressBook {
    result: number // 调用状态 ，0：成功，其他：失败
    total: number,
    rule_config: Object<{
      max_rule: string // 可设置的规则总数最大数
      max_set: string // 单条规则设置的设置对象最大数
      max_visible?: string // 单条规则设置的可见对象最大数
    }> // 设置的规则配置， 用于前端限制对应设置限制
    rules: Array<{
      rule_id: string // 部门路径
      operate_type: string // 对象ID
      set_obj: Array<{
        abs_path?: string // 部门路径
        obj_id: string // 对象ID
        obj_name?: string // 对象名称
        obj_type: number // 对象类型， 仅为 user 或 dept
      }>
      visible_obj: Array<{
        abs_path?: string // 部门路径
        obj_id: string // 对象ID
        obj_name?: string // 对象名称
        obj_type: number // 对象类型， 仅为 user 或 dept
      }>
    }>
  }

  /** wps 4. 删除通讯录可见性规则 */
  interface ResponseDeleteRuleOfAddressBook extends ResponseApi {
    result: number // 调用状态 ，0：成功，其他：失败
  }

 }
