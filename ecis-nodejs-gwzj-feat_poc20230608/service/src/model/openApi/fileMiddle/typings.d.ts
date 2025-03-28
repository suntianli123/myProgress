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

  /** 1. 创建应用 */
  interface ResquestCreateApp {
    app_name: string // 名字
    app_mode: number | string
    developer_id: number | string
  }

  interface ResponseCreateApp extends ResponseApi {
    app_id: string,
    result: number
  }

  /** 2. 获取应用基本信息 */
  interface ResquestGetAppBaseInfo { }

  interface ResponseGetAppBaseInfo extends ResponseApi {
    object?: {
      app_id: string,
      app_name: string,
      developer_id: any,
      app_mode: any, // 1: 第三方企业应用
      create_at: any, // 应用创建时间，秒为单位的时间戳
      modify_at: any // 应用修改时间，秒为单位的时间戳
    },
    result: 0
  }
  /** 3. 修改应用基本信息 */
  interface ResquestModifyAppBaseInfo {
    app_name: string
    callback_url: string
  }

  interface ResponseModifyAppBaseInfo extends ResponseApi { }

  /** 4. 删除应用 */
  interface ResquestDeleteApp { }

  interface ResponseDeleteApp extends ResponseApi { }

  /** 5. 重置应用key */
  interface ResquestResetAppKey { }

  interface ResponseResetAppKey extends ResponseApi {
    app_key: string
  }

  /** 6. 获取应用key */
  interface ResquestGetAppKey { }

  interface ResponseGetAppKey extends ResponseApi {
    app_key: string
  }

  /** 7. 获取应用IP白名单 */
  interface ResquestGetAppWhiteIP { }

  interface ResponseGetAppWhiteIP extends ResponseApi {
    object_array?: [
      {
        app_id: string,
        ip: string,
        create_at: any,
        modify_at: any
      }
    ],
    result: number
  }

  /** 8. 添加应用IP白名单 */
  interface ResquestAddAppWhiteIP {
    ip_white_list: string
  }

  interface ResponseAddAppWhiteIP extends ResponseApi { }

  /** 9. 删除应用IP白名单 */
  interface ResquestDeleteAppWhiteIP {
    ip_white_list: string
  }

  interface ResponseDeleteAppWhiteIP extends ResponseApi { }

  /** 10. 修改应用在线编辑配置 */
  interface ResquestModifyAppOnlineEditConfig {}

  interface ResponseModifyAppOnlineEditConfig extends ResponseApi { }

  /** 11. 获取应用在线编辑配置 */
  interface ResquestGetAppOnlineEditConfig {

  }

  interface ResponseGetAppOnlineEditConfig extends ResponseApi {
    object?: {
      app_id: string,
      callback_url: string,
      is_app_doc: boolean,
      is_cache_user: boolean,
      edit_lock?: {
          is_open: boolean,
          lock_docs: boolean,
          lock_app: boolean,
      },
      file_info: string,
      user_info: string,
      file_save: string,
      file_version: string,
      file_history: string,
      file_rename: string,
      file_online: string,
      file_new: string,
      onnotify: string,
      user_auth: string,
      edit_info: string,
      version_notify: string
    }
  }

  /** 12. 修改应用在线预览配置 */
  interface ResquestModifyAppOnlinePreViewConfig {
    callback_url?: string
    file_info?: string
    file_view_notify?: string
  }

  interface ResponseModifyAppOnlinePreViewConfig extends ResponseApi { }

  /** 13. 获取应用在线预览配置 */
  interface ResquestGetAppOnlinePreViewConfig { }

  interface ResponseGetAppOnlinePreViewConfig extends ResponseApi {
    object?: {
      app_id: string,
      callback_url: string,
      file_info: string,
      file_view_notify: string
    }
  }

  /** 14. 修改应用格式处理配置 */
  interface ResquestModifyAppFormatConfig {
    callback_url?: string
    result_notify?: string
  }

  interface ResponseModifyAppFormatConfig extends ResponseApi { }

  /** 15. 获取应用格式处理配置 */
  interface ResquestGetAppFormatConfig { }

  interface ResponseGetAppFormatConfig extends ResponseApi {
    object?: {
      app_id: string,
      callback_url: string,
      result_notify: string
    }
  }

  /** 16.获取某个服务商下的应用列表 */
  interface ResquestGetDeveloperApp { }

  interface ResponseGetDeveloperApp extends ResponseApi {
    object_array?: [
      {
        app_id: string,
        app_name: string,
        developer_id: number | string,
        app_mode: number | string, // 1: 第三方企业应用
        create_at: number | string,
        modify_at: number | string
      }
    ]
    result: number
    total: number // 总数
  }

  /** 17.获取应用所能申请的功能列表 */
  interface ResquestGetAppFuncList { }

  interface ResponseGetAppFuncList extends ResponseApi {
    object_array?: [
      {
        function_id: number | string,
        function_name: string,
        doc_url: string, // 文档链接
        desc: string, // 描述
        create_at: number | string,
        modify_at: number | string
      }
    ]
  }

  /* 18. */
  interface ResquestSetFuncForApp {
    is_grant: boolean
  }

  /** 19. 获取应用的功能列表 */
  interface ResquestGetFuncForApp { }

  interface ResponseGetFuncForApp extends ResponseApi {
    object_array?: [
      {
        function_id: number | string,
        function_name: string,
        status: number | string, // -1：拒绝；0：申请中；1：通过
        create_at: number | string,
        modify_at: number | string
      }
    ]
  }

  /** 20. 获取licence信息 */
  interface ResquestGetAppLicence { }

  interface ResponseGetAppLicence extends ResponseApi {
    object?: {
      deadline: number | string, // 最终期限，秒为单位的时间戳
      platform_device_num: number, // 集群机器数
      platform_webview: boolean, // 是否有在线预览能力
      platform_webedit: boolean, // 是否有在线编辑能力
      platform_file_process: boolean, // 是否有格式处理能力
      platform_file_content_process: boolean, // 是否有内容处理能力
      platform_file_convert_process: boolean, // 是否有文件转换能力
      platform_file_merge_process: boolean, // 是否有文件合并能力
      platform_file_split_process: boolean, // 是否有文件拆分能力
      platform_image_process: boolean, // 是否有图片处理能力
      platform_smart_file_process: boolean, // 是否有智能公文能力
      platform_file_bookmark_replace: boolean // 是否有书签替换能力
    }
  }

  /** 21. 获取应用空间设置 */
  interface ResquestGetAppSpace { }

  interface ResponseGetAppSpace extends ResponseApi {
    data?: {
      app_space_limit: number,
      file_format_limit: string,
      file_size_limit: number
    }
  }

  /** 22. 修改应用空间设置 */
  interface ResquestModifyAppSpace {
    space_limit: number | string
    file_format_limit: string
    file_size_limit: number | string
  }

  interface ResponseModifyAppSpace extends ResponseApi {}

  /** 23. 获取应用空间状态 */
  interface ResquestGetAppSpaceStatus {}

  interface ResponseGetAppSpaceStatus extends ResponseApi {
    data?: {
      quota_space: number | string,
      used_space: number | string,
      recycle_space: number | string
    }
  }

  /** 24. 修改应用证书过期回调地址 */
  interface ResquestModifyAppCertCallback {
    callback_addr: string
  }

  interface ResponseModifyAppCertCallback extends ResponseApi {}

  /** 25. 获取应用证书过期回调地址 */
  interface ResquestGetAppCertCallback {}

  interface ResponseGetAppCertCallback extends ResponseApi {
    object?: {
      app_id: string,
      callback_addr: string
    }
  }

  /** 26. 修改应用跨域白名单配置 */
  interface ResquestModifyAppWhiteIPConfig {
    csrf_white_list?: string
  }

  interface ResponseModifyAppWhiteIPConfig extends ResponseApi {}

  /** 27. 获取应用跨域白名单配置 */
  interface ResquestGetAppWhiteIPConfig {}

  interface ResponseGetAppWhiteIPConfig extends ResponseApi {
    object?: {
      app_id: string, // 应用id
      csrf_white_list: string // csrf白名单，多个则以英文逗号分割
    }
  }

  /** 1. 应用获取app_token */
  interface ResquestGetAppToken { }

  interface ResponseGetAppToken extends ResponseApi {
    token?: {
      app_token: string, // 应用凭证
      expires_in: number | string // 有效期
    }
  }

  /** 1. 获取在线编辑链接 */
  interface ResquestGetOnlineEditUrl { }

  interface ResponseGetOnlineEditUrl extends ResponseApi {
    url: string, // url
  }

  /** 2. 查看文档在线用户信息 */
  interface ResquestGetFileCooperators { }

  interface ResponseGetFileCooperators extends ResponseApi {
    data?: {
      users?: [
        {
          id: number | string,
          name: string,
          avatar_url: string,
          logined: boolean
        }
      ]
    }
  }
  /** 4. 获取锁加锁 */
  interface ResquestGetLockStatus { }

  interface ResponseGetLockStatus extends ResponseApi {
    data?: {
      lock_status: string
    }
  }
  /** 5. 编辑锁加锁 */
  interface ResquestEditLockStatus {
    file_id: string
  }

  interface ResponseEditLockStatus extends ResponseApi { }

  /** 6. 编辑锁释放 */
  interface ResquestUnLockStatus {
    file_id: string
    force_unlock: string
  }

  interface ResponseUnLockStatus extends ResponseApi { }

  /** 7. 编辑锁释放 */
  interface ResquestsaveFile {
    timeout?: string
  }

  interface ResponsesaveFile extends ResponseApi { }

  /** 2. 获取在线预览链接V2 */
  interface ResquestGetOnlinePreviewUrl { }

  interface ResponseGetOnlinePreviewUrl extends ResponseApi {
    url: string, // url
  }

  // 清稿类型
  type cleanOptions =
    | 'accept_all_revisions' // 指定接受所有修订
    | 'delete_all_comments' // 删除所有批注
    | 'delete_all_ink' // 删除所有墨迹
  // 默认所有参数都存在
  // 水印位置
  type watermarkPosition =
    | 'TOP_LEFT'
    | 'TOP_CENTER'
    | 'TOP_RIGHT'
    | 'CENTER_LEFT'
    | 'CENTER'
    | 'CENTER_RIGHT'
    | 'BOTTOM_LEFT'
    | 'BOTTOM_CENTER'
    | 'BOTTOM_RIGHT'
  // 默认'CENTER'
  /** 1. 内容操作 /open+/cps/v2/office/operate */
  interface RequestOfficeOperate {
    task_id: string // 必填 任务ID，不能重复
    doc_url: string // 必填 文档地址
    doc_filename: string // 必填 文件名，必须带后缀
    scene_id: string // 必填 业务唯一标识，由应用自定义，64个字符以内，仅支持字母、数字、下划线
    // 必填 操作步骤，可以选择operate里面的一种或者多种进行组合操作
    steps: Array<{
      operate: 'OFFICE_CLEAN' | 'OFFICE_WATERMARK' // 必填 操作类型，可选值: OFFICE_CLEAN：清稿 OFFICE_WATERMARK：加水印
      // 选填 操作参数
      args?: {
        // 选填 清稿类型，accept_all_revisions：指定接受所有修订； delete_all_comments：删除所有批注； delete_all_ink：删除所有墨迹； 默认所有参数都存在枚举:accept_all_revisions,delete_all_comments,delete_all_ink
        clean_options?: Array<cleanOptions>
        text_watermark?: {
          // 选填 文字水印，操作类型为OFFICE_WATERMARK时，才有该字段
          content: string // 必填 文字水印时必填 文字水印内容
          size?: number // 选填 文字水印字体大小，可取值5到500
          color?: string // 选填 文字水印字体颜色 十六进制颜色值，例如：#CC00FF
          transparent?: number // 选填 文字水印透明度 取值范围0-1的小数，0：完全透明，1：不透明 默认值：0.5
          tilt?: boolean // 选填 是否倾斜45度，默认false
          position?: watermarkPosition // 选填 水印位置，可选值： TOP_LEFT：顶部靠左 TOP_CENTER： 顶部中间 TOP_RIGHT：顶部靠右 CENTER_LEFT：中间靠左 CENTER：正中 CENTER_RIGHT：中间靠右 BOTTOM_LEFT：底部靠左 BOTTOM_CENTER：底部中间 BOTTOM_RIGHT：底部靠右 默认值：CENTER
          tiled?: boolean // 选填 水印是否平铺，默认false
        }
        image_watermark?: {
          // 选填 图片水印，操作类型为OFFICE_WATERMARK时，才有该字段
          watermark_url: string // 必填 图片水印时必填 水印图片地址
          watermark_filename?: string // 必填 图片水印时必填 图片水印的文件名，必须带后缀
          no_washout?: boolean // 选填 是否取消冲蚀，WPS水印的冲蚀效果参数为：亮度0.85，对比度0.15，默认false
          tilt?: boolean // 选填 是否倾斜45度，默认false
          position?: watermarkPosition // 选填 水印位置，可选值： TOP_LEFT： TOP_CENTER： TOP_RIGHT： CENTER_LEFT： CENTER： CENTER_RIGHT： BOTTOM_LEFT： BOTTOM_CENTER： BOTTOM_RIGHT： 默认值：CENTER
          tiled?: boolean // 选填 水印是否平铺，默认false
          scale?: number // 选填 水印图片缩放比例，0.1-5，默认：1
        }
      }
    }>
  }

  /** 2. 图片操作 /open+/cps/v2/image/operate */
  interface RequestImageOperate {
    task_id: string // 必填 任务ID，不能重复
    image_url: string // 必填 图片地址
    image_filename: string // 必填 图片名称，必须带后缀
    scene_id: string // 必填 业务唯一标识，由应用自定义，64个字符以内，仅支持字母、数字、下划线
    scale?: number // 选填 缩放百分比，默认1不缩放，如果高度和宽度大于0则以高度宽度等比缩放
    width?: number // 选填 整数，图片宽度，如果宽度大于0则以图片宽度为标准等比缩放
    height?: number // 选填 整数，图片高度，如果图片宽度小于0，高度大于0，则以高度为标准等比缩放
    rotate?: number // 选填 图片旋转角度（大于0表示顺时针旋转），建议旋转角度为90的倍数
    quality?: number // 选填 图片质量，范围0-1，只能修改JPG/JPEG图片质量
    horizontal_flip?: boolean // 选填 水平翻转
    vertical_flip?: boolean // 选填 垂直翻转
    // 选填 文字水印
    text_watermark?: {
      content: string // 必填 文字水印时必填 文字水印内容
      font_name?: string // 选填 字体名称
      bold?: boolean // 选填 是否加粗
      italic?: boolean // 选填 是否斜体
      size?: number // 选填 字体大小，取值5-500，默认：25
      color?: string // 选填 字体颜色，16进制颜色值，例如：#AAAAAA，默认：#000000
      transparent?: number // 选填 透明度 0-1，0完全透明，默认：1
      rotate?: number // 选填 旋转角度，单位°，默认：-45
      position?: watermarkPosition // 选填 水印位置，可选值： TOP_LEFT：顶部靠左 TOP_CENTER：顶部中间 TOP_RIGHT：顶部靠右 CENTER_LEFT：中间靠左 CENTER：正中 CENTER_RIGHT：中间靠右 BOTTOM_LEFT：底部靠左 BOTTOM_CENTER：底部中间 BOTTOM_RIGHT： 底部靠右 默认值：CENTER
      tiled?: boolean // 选填 水印是否平铺，默认false
    }
    // 选填 图片水印
    image_watermark?: {
      watermark_url: string // 必填 图片水印时必填 水印图片地址
      watermark_filename: string // 必填 图片水印时必填 图片水印的文件名，必须带后缀
      transparent?: number // 选填 透明度 0-1，0完全透明，默认：1
      rotate?: number // 选填 旋转角度
      position?: watermarkPosition // 选填 水印位置，可选值： TOP_LEFT：顶部靠左 TOP_CENTER：顶部中间 TOP_RIGHT：顶部靠右 CENTER_LEFT： CENTER： CENTER_RIGHT： BOTTOM_LEFT： BOTTOM_CENTER： BOTTOM_RIGHT： 默认值：
      tiled?: boolean // 选填 水印是否平铺，默认：false
      scale?: number // 选填 水印图片缩放比例，0.1-5，默认：1
    }
  }

  /** 3. 多书签套用 /open+/cps/v2/office/wrapheader */
  interface RequestOfficeWrapheader {
    task_id: string // 必填 任务ID
    template_url: string // 必填 模板文件地址
    template_filename: string // 必填 模板文件文件名
    scene_id: string // 必填 业务唯一标识，由应用自定义，64个字符以内，仅支持字母、数字、下划线
    // 必填 样章列表
    sample_list: Array<{
      bookmark: string // 必填 模板文件中的书签名称，会将样章放到指定的书签位置
      type: 'DOCUMENT' | 'IMAGE' | 'TEXT' // 必填 样章类型，可选值： DOCUMENT：文档 IMAGE: 图片 TEXT:文本
      sample_url?: string // 可有字段  备注：样章文件，当type为DOCUMENT | IMAGE时，必填。
      sample_filename?: string // 可有字段  备注：文件名，当type为DOCUMENT | IMAGE时，必填
      text?: string // 必填 样章文本，当type是TEXT时，允许为空
    }>
  }

  /** 4. 文档合并 /open+/cps/v2/office/merge */
  interface RequestOfficeMerge {
    task_id: string // 类型：String  必有字段  备注：任务id
    scene_id: string // 类型：String  必有字段  备注：业务唯一标识，由应用自定义，64个字符以内，仅支持字母、数字、下划线
    // 类型：Array  必有字段  备注：待合并文档列表，文档数必须在2-10之间
    merged_file_list: Array<{
      doc_url: string // 类型：String  必有字段  备注：文档地址
      doc_filename: string // 类型：String  必有字段  备注：文件名，必须带后缀
      start?: number // 类型：Number  可有字段  备注：待合并文档的起始页码，从1开始。默认从文档第一页开始
      end?: number // 类型：Number  可有字段  备注：待合并文档的结束页码，默认取文档最后一页
    }>
  }

  /** 5. 文档拆分 /open+/cps/v2/office/split */
  interface RequestOfficeSplit {
    task_id: string // 类型：String  必有字段  备注：任务id
    scene_id: string // 类型：String  必有字段  备注：业务唯一标识，由应用自定义，64个字符以内，仅支持字母、数字、下划线
    doc_url: string // 类型：String  必有字段  备注：文档地址
    doc_filename: string // 类型：String  必有字段  备注：文件名，必须带后缀
    type: 'AVERAGE' | 'RANGE' // 类型：String  必有字段  备注：拆分类型，枚举：AVERAGE, RANGE
    // 类型：Object  可有字段  备注：type=AVERAGE时必填，平均拆分
    average?: {
      size: number // 类型：Number  必有字段  备注：平均多少页拆分成一个文档
      // 类型：Object  可有字段  备注：拆分范围
      split_range?: {
        start?: number // 类型：Number  可有字段  备注：开始页码，从1开始
        end?: number // 类型：Number  可有字段  备注：结束页码
      }
    }
    // 类型：Array  可有字段  备注：type=RANGE时必填，范围拆分
    ranges?: Array<{
      start: number // 类型：Number  必有字段  备注：开始页码，从1开始
      end: number // 类型：Number  必有字段  备注：结束页码
    }>
  }

  /** 6. 文档转换 /open+/cps/v2/office/convert */
  interface RequestOfficeConvert {
    task_id: string // 类型：String  必有字段  备注：任务id，必须唯一
    scene_id: string // 类型：String  必有字段  备注：业务唯一标识，由应用自定义，64个字符以内，仅支持字母、数字、下划线
    doc_filename: string // 类型：String  必有字段  备注：文件名，必须带后缀
    doc_url: string // 类型：String  必有字段  备注：需要转换的文档
    target_file_format: string // 类型：String  必有字段  备注：转换后文件格式
    doc_password?: string // 可选  文档密码。不为空时，会参与转换PDF的过程加密方式：先进行AES/ECB/PKCS5Padding加密，再进行base64加密。密钥:XDWe0nNGxTg2yD8Gb3uUapkoA8XtKvq3 （通过getBytes获取字节数组）。示例：123加密后为q0rxZGJDQCG+Hu3pvHwByw==
    // 表格转换参数
    et_page_zoom?: {
      keep_pagezoom?: boolean // 表示是否保持当前客户端的缩放比，true表示保持当前缩放比打印，false表示以100%的缩放比打印，当fit_pagetall或fit_pagewide中有一个为1，或都为1时，该参数不生效
      fit_pagewide?: number // 表示是否适配所有行，0表示正常分页打印，1表示不分页，所有行在一页上
      fit_pagetall?: number // 表示是否适配所有列，0表示正常分页打印，1表示不分页，所有列在一页上；当fit_pagetall与fit_pagewide都为1时，表示将所有内容打印到一页上
    }
    // ofd stamp水印参数。仅ofd转pdf有效
    ofdseal?: {
      type: string // 类型：String  必有字段  备注：水印类型
      content: string // 类型：String  必有字段  备注：水印内容
      // 水印字体。默认字体属性：字体：Times New Roman，字号：19，颜色：#0000ff
      font?: {
        font_name?: string // 类型：string   可选  备注：水印字体，默认：Times New Roman
        font_size?: number // 类型：interger 可选  备注：水印字号，默认：19
        bold?: boolean // 类型：boolean  可选  备注：水印字体加粗，默认：false
        italic?: boolean // 类型：boolean  可选  备注：水印字体倾斜，默认：false
        color?: string // 类型：string   可选  备注：水印字体颜色，默认：#0000ff
      }
      delta_x?: number // 类型：integer  可选  备注：水印横坐标偏移像素。整数数值格式。默认：0
      delta_y?: number // 类型：integer  可选  备注：水印纵坐标偏移像素。整数数值格式。默认：0
    }
  }

  // 控制生成的文件是否设置书签和是否设置公文域
  type fieldConfig = 'bookmark' | 'bookmark_field' | 'none'
  type preInstallTemplate =
    | 'announcement_ds_ls1' // 通告（长署名） 下行文单机关
    | 'approval_ds_ss1' // 批复（短署名） 下行文单机关
    | 'bulletin_ds_1seal' // 通报（1公章） 下行文单机关
    | 'communique_ds_ls1' // 公报（长署名） 下行文单机关
    | 'decision_ds_5seals' // 决定（5公章） 下行文多机关
    | 'notice_ds_ls1_ht' // 公告（长署名，带横排表格） 下行文单机关
    | 'notification_ds_ss1_atcm' // 通知（短署名，带附件） 下行文单机关
    | 'opinion_ds_ss1' // 意见（短署名） 下行文单机关
    | 'resolution_ds_ss3' // 决议（短署名3个） 下行文多机关
    | 'consult_us_5seals' // 请示（5公章） 上行文多机关
    | 'motion_us_ps' // 议案（签名章） 上行文单机关
    | 'referral_us_1seal' // 请示（1公章） 上行文单机关
    | 'report_us_ls1' // 报告（长署名） 上行文单机关
    | 'report_us_ss1' // 报告（短署名） 上行文单机关
    | 'report_us_ss2' // 报告（短署名2个） 上行文多机关
    | 'order' // 命令 命令
    | 'summary' // 纪要 纪要
    | 'letter' // 信函 信函
    | 'blanktext' // 空白正文 正文
  /** 7. 智能公文 /open+/cps/v2/office/smartofficial */
  interface RequestSmartofficial {
    task_id: string // 类型：String  必有字段  备注：无
    scene_id: string // 类型：String  必有字段  备注：业务唯一标识，由应用自定义，64个字符以内，仅支持字母、数字、下划线
    doc_url: string // 类型：String  必有字段  备注：文件
    doc_filename: string // 类型：String  必有字段  备注：文件名，必须带后缀
    template_url?: string // 类型：String  可有字段  备注：模板文件，pre_install_template不存在时，template_url必填。当template_url和pre_install_template同时存在时，template_url优先
    template_filename?: string // 类型：String  可有字段  备注：模板文件名
    pre_install_template?: preInstallTemplate // 类型：String  可有字段  备注：预设模板id，枚举
    field_config?: string // 类型：String  可有字段  备注：用于控制生成的文件是否设置书签和是否设置公文域，可选值：bookmark：目标文档只设置书签 bookmark_field：目标文档同时设置书签和公文域 none：目标文档书签、公文域都不设置
  }

  // 书签类型
  type bookmarkType = 'all' | 'range' | 'insertpoint'
  /** 8. 查询文档书签 /open+/cps/v2/office/bookmark */
  interface RequestOfficeBookmark {
    task_id: string // 类型：String  必有字段  备注：任务id，不能重复
    scene_id: string // 类型：String  必有字段  备注：业务唯一标识，由应用自定义，64个字符以内，仅支持字母、数字、下划线
    doc_url: string // 类型：String  必有字段  备注：文档地址
    doc_filename: string // 类型：String  必有字段  备注：文档名称，必须包含扩展名
    bookmark_type: bookmarkType // 类型：String  可有字段  备注：书签类型，枚举：["all","range","insertpoint"]，默认all。 all-所有书签 range-范围书签 insertpoint-插入点书签
    bookmark_name: string // 类型：String  可有字段  备注：书签名称，精确匹配。校验规则：必须由字母、数字、中文、下划线组成，首字母不能为数字或下划线。匹配时会忽略前后空格，匹配正则^(?!(\d|_))[\u4E00-\u9FA5\w]{1,40}$
  }

  /** 9. 限制书签编辑 /open+/cps/v1/office/set/bookmarkpermissions */
  interface RequestSetBookmarkPermiss {
    task_id: string // 类型：String  必有字段  备注：任务id，必须唯一
    scene_id: string // 类型：String  必有字段  备注：业务唯一标识，由应用自定义，64个字符以内，仅支持字母、数字、下划线
    doc_filename: string // 类型：String  必有字段  备注：文件名，必须带后缀
    doc_url: string // 类型：String  必有字段  备注：需要转换的文档
    all_editable?: 'bookmark_permissions' | 'all_editable' // 设置所有存在的书签可编辑或不可编辑，bookmark_permissions和all_editable选项只能二选一，且必须设置其中一个值
    // 设置书签可编辑或不可编辑，bookmark_permissions和all_editable选项只能二选一，且必须设置其中一个值
    bookmark_permissions?: Array<{
      name: string // 书签名
      editable: boolean // 是否可编辑,true为可编辑
    }>
  }

  /** 10. 查询只读/可编辑书签 /open+/cps/v1/office/query/bookmarkpermissions */
  interface RequestQueryBookmarkPermiss {
    task_id: string // 类型：String  必有字段  备注：任务id，必须唯一
    scene_id: string // 类型：String  必有字段  备注：业务唯一标识，由应用自定义，64个字符以内，仅支持字母、数字、下划线
    doc_filename: string // 类型：String  必有字段  备注：文件名，必须带后缀
    doc_url: string // 类型：String  必有字段  备注：需要转换的文档
    is_editable: boolean // 类型：boolean  必有字段 查询文档的书签是否可编辑
  }

  /** 11. 任务查询 /open+/cps/v1/task/query */
  interface RequestTaskQuery {
    task_id: string // 类型：String  必有字段  备注：任务id
  }
  // 11. 任务查询-响应体
  interface ResponseTaskQuery {
    status: string
    download_id: string
    // 类型：Array  可有字段  备注：当任务类型为OFFICE_QUERY_BOOKMARK时，才有该字段
    bookmarks?: Array<{
      bookmark: string // 类型：String  必有字段  备注：无
      bookmark_type?: bookmarkType // 类型：String  可有字段  备注：书签类型，枚举：["all","range","insertpoint"]，默认all。 all-所有书签 range-范围书签 insertpoint-插入点书签
      bookmark_content?: string // 类型：String  可有字段  备注：插入点书签内容为空字符串；范围书签内容仅支持文本，部分特殊字符无法识别，例如：内容控件、图片、公式、其它对象等。
    }>
  }

  /** 12. 文件下载 /open+/cps/v1/download/file/:download_id */

}
