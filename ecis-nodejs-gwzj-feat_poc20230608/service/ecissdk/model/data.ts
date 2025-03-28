/* eslint-disable camelcase */
/**
 * GRPC BUFFER KEY SUFFIX
 */
export const GRPC_BINARY_KEY_SUFFIX = '-bin'

// cache
export interface CacheSetResp {
  result: string
  data: { data: any }
  msg?: string
}
export interface CacheGetResp {
  result: string
  data: { data: any }
  msg?: string
}

export interface CacheDelResp {
  result: string
  data: { data: any }
  msg?: string
}

export interface CacheHsetResp {
  result: string
  data: { data: any }
  msg?: string
}

export interface CacheHgetResp {
  result: string
  data: { data: any }
  msg?: string
}

export interface CacheHdelResp {
  result: string
  data: { data: any }
  msg?: string
}

export interface CacheHgetAllResp {
  result: string
  data: { data: any }
  msg?: string
}

export interface MysqlSelResp {
  result: string
  data: { rows: any[] }
  msg?: string
}
export interface MysqlUpdateResp {
  result: string
  data: { affect: any }
  msg?: string
}
export interface MysqlInsertResp {
  result: string
  data: { affect: any }
  msg?: string
}

export interface MysqlDelResp {
  result: string
  data: { affect: any }
  msg?: string
}

export interface FileDecryptExistResp {
  result: string
  data: { url: any }
  msg?: string
}

export interface FileDecryptFileResp {
  result: string
  data: { url: any }
  msg?: string
}

export interface FileClearHistoryResp {
  result: string
  data: any
  msg?: string
}
export interface FilePreUploadFileResp {
  result: string
  data: { url: any }
  msg?: string
}

export interface GlobalRouterBindResp {
  result: string
  data: { url: any }
  msg?: string
}

export interface ConfigPutResp {
  result: string
  data: any
  msg?: string
}

export interface ConfigGetResp {
  result: string
  data: string
  msg?: string
}

export interface EtcdPutResp {
  result: string
  data: any
  msg?: string
}

export interface EtcdGetResp {
  result: string
  data: string
  msg?: string
}
export interface EtcdDelResp {
  result: string
  data: any
  msg?: string
}

export interface EtcdLockResp {
  result: string
  data: string
  msg?: string
}

export interface EtcdReleaseResp {
  result: string
  data: string
  msg?: string
}

export interface EtcdGetAllResp {
  result: string
  data: any
  msg?: string
}

export interface Wps3UploadResp {
  result: string
  data: { etag: string }
  msg?: string
}
export interface Wps3DownloadResp {
  result: string
  data: string
  msg?: string
}

export interface Wps3PreDownloadResp {
  result: string
  data: string
  msg?: string
}

export interface Wps3PreUploadResp {
  result: string
  data: {
    url: string
  }
  msg?: string
}

export interface YundocCreateFolderResp {
  result: string
  data: any
  msg?: string
}

export interface YundocCreateFilesUploadResp {
  result: string
  data: any
  msg?: string
}
export interface YundocCreateFileResp {
  result: string
  data: any
  msg?: string
}
export interface YundocUpdateFileResp {
  result: string
  data: { uploadinfo: any }
  msg?: string
}

export interface YundocDownloadFileResp {
  result: string
  data: any
  msg?: string
}

export interface YundocBatchDownloadFileResp {
  result: string
  data: any
  msg?: string
}
export interface YundocListFilesResp {
  result: string
  data: any
  msg?: string
}
export interface YundocGetFilePermissionsResp {
  result: string
  data: any
  msg?: string
}

export interface YundocDeleteFilePermissionsResp {
  result: string
  data: any
  msg?: string
}
export interface Headers {
  [key: string]: any
}
export interface ListFilesParams {
  query: {
    count: number
    filter: string
    groupid: number
    ignore: Array<string>
    include: Array<string>
    include_exts: string
    linkgroup: boolean
    offset: number
    order: string
    orderby: string
    parentid: number
    review_pic_thumbnail: boolean
  }
  headers: Headers
}

export interface CreateFolderParams {
  body: {
    groupid: number
    must_create: boolean
    name: string
    parent_path: Array<string>
    parentid: number
    retrieve_existent: boolean
    csrfmiddlewaretoken: string
  }
  headers: Headers
}

export interface GetFilePermissionsParams{
  query: {
    groupId: number
    fileId: number
    next: string
  }
  headers: Headers
}

export interface DeleteFilePermissionParams{
  query: {
    groupId: number
    fileId: number
    subject_id: number
    subject_type: string
  }
  headers: Headers
}

export interface CreateFilesUploadParams{
  body: {
    checkname: boolean
    client_stores: string
    contenttype: string
    groupid: number
    name: string
    parentid: number
    req_by_internal: boolean
    size: number
    startswithfilename: string
    successactionstatus: string
    trytime: number,
    sha1: string,
    csrfmiddlewaretoken: string
  }
  req: {
    method: string
  }
  headers: Headers
}

export interface CreateFileParams{
  body: {
    etag: string
    fileid: number
    groupid: number
    key: string
    mac:string
    must_create: boolean
    name: string
    parent_path: Array<string>
    parentid: number
    secure_guid: string
    sha1: string
    size: number
    store: string
    unlimited_size: boolean
    csrfmiddlewaretoken: string
  }
  req: {
    method: string
  }
  headers: Headers
}
export interface UpdateFileParams {
  body: {
    client_stores: string
    fileid: number
    req_by_internal: boolean
    s3sha256: string
    sha1: string
    size: number
    trytime: number
    csrfmiddlewaretoken: string
  }
  headers: Headers
}

export interface DownloadFileParams {
  query: {
    fileid: number
    groupid: number
    isblocks: boolean
    processon_type: string
    store: string
  }
  headers: Headers
}

export interface BatchDownloadFileParams {
  body: {
    fileids: Array<number>
    groupid: number,
    csrfmiddlewaretoken: string
  }
  headers: Headers
}

// dev yunDoc
export interface DevCreateFileParams{
  body: {
    userid: number
    name: string
    sha1: string
    size: number
    groupid: number
    parentid: number
    parent_path: Array<string>
    etag: string
    must_create: boolean
  }
}

export interface Fileinfo {
  fileid: number
  userid: number
  groupid: number
  parent: number
  fname: string
  fsize: number
  ftype: string
  ctime: number
  mtime: number
  fver: number
}

export interface DevCreateFileResp {
  result: string
  msg?: string
  data?: {
    fileinfo: Fileinfo
    result: string
  }
}

export interface DevDownloadFileInfo {
  url: string
  sha1: string
  store: string
  real_store: string
  static_url: string
}

export interface DevDownloadFileResp {
  result: string
  msg?: string
  data?: {
    fileinfo: DevDownloadFileInfo
  }
}

export interface DevDownloadFileParams {
  query: {
    fileid: number
    userid: number
    req_by_internal: boolean
  }
}

// account
export interface AccountIsLoginResp {
  result: string
  msg?: string
  data?: {
    userid: number
    companyid: number
    current_companyid: number
    loginmode: string
    is_plus: boolean
  }
}

export interface AccountGetUserBySidResp {
  result: string
  msg?: string
  data?: {
    userid: number
    email: string
    phonenumber: string
    firstname: string
    lastname: string
    nickname: string
    country: string
    province: string
    city: string
    address: string
    postal: string
    regtime: number
    pic: string
    companyid: number
    current_companyid: number
    departmentid: string
    account: string
    role: string[]
    status: string
    sex: string
    loginmode: string
    comes_from: string
    is_plus: boolean
  }
}

export interface AccountGetUserByIdResp {
  result: string
  msg?: string
  data?: {
    'phonenumber': string
    'province': string
    'email': string
    'status': string
    'account': string
    'nickname': string
    'address': string
    'city': string
    'firstname': string
    'postal': string
    'pinyin': string
    'role': string[]
    'result': string
    'lastname': string
    'comes_from': string
    'departmentid': string
    'departmentname': string
    'userid': number
    'sex': string
    'pic': string
    'last_update_time': number
    'companyid': number
    'regtime': number
    'country': string
  }
}

// wpsplus
export interface GetDeptUsersParams {
  path: {
    comp_id: string
    dept_id: string
  }
  queryStr: string // 格式：a=x&b=y
  headers: Headers
}

export interface GetDeptUserUserDept {
  abs_path: string
  id: string
  name: string
}

export interface GetDeptUserUser {
  account: string
  avatar: string
  city: string
  comp_uid: string
  country: string
  depts: GetDeptUserUserDept[]
  email: string
  employer: string
  employment_status: string
  employment_type: string
  gender: string
  leader: string
  name: string
  phone: string
  platform_id: string
  role_id: number
  source: string
  status: string
  third_union_id: string
  title: string
  user_id: number
  work_place: string
}

export interface GetDeptUsersResp {
  result: string
  msg?: string
  data?: {
    max_deptmember_num: number
    next_comp_uid: string
    total: number
    users: GetDeptUserUser[]
  }
}

export interface GetCompUsersParams {
  path: {
    comp_id: string
  }
  queryStr: string // 格式：a=x&b=y
}

export interface GetCompUsersUser {
  'comp_uid': string
  'userid': number
  'avatar': string
  'comp_id': number
  'user_name': string
  'phone': string
  'login_name': string
  'email': string
  'status': string
  'roleid': string
  'atime': number
  'ctime': number
  'mtime': number
  'def_dept_id': string
  'employee_id': string
  'telephone': string
  'title': string
  'source': string
}

export interface GetCompUsersResp {
  result: string
  msg?: string
  data?: {
    result: string
    users: GetCompUsersUser[]
  }
}

// wpsopen
export interface OpenGetIdConfuseParams {
  queryStr: string // 格式：a=x&b=y
}

export interface OpenGetIdConfuseResp {
  result: string
  msg?: string
  data?: {
    confuse_result: string
  }
}

export interface OpenGetFileInfoParam {
  queryStr: string // 格式：a=x&b=y
  headers: Headers
}

export interface OpenGetFileInfoResp {
  result: string
  msg?: string
  data?: {
    file: {
      id: string
      name: string
      version: number
      size: number
      creator: string
      create_time: number
      modifier: string
      modify_time: number
      download_url: string
      preview_pages: number
      user_acl: {
        rename: number
        history: number
        copy: number
        export: number
        print: number
      }
      watermark: {
        type: number
        value: string
        fillstyle: string
        font: string
        rotate: number
        horizontal: number
        vertical: number
      }
    }
    user: {
      id: string
      name: string
      permission: string
      avatar_url: string
    }
  }
}

export interface OpenPreviewInnerFileInfoParam {
  queryStr: string // 格式：a=x&b=y
  headers: Headers
}

export interface OpenPreviewInnerFileInfoResp {
  result: string
  msg?: string
  data?: {
    file: {
      id: string
      name: string
      version: number
      size: number
      creator: string
      create_time: number
      modifier: string
      modify_time: number
      download_url: string
      preview_pages: number
      user_acl: {
        rename: number
        history: number
        copy: number
        export: number
        print: number
      }
      watermark: {
        type: number
        value: string
        fillstyle: string
        font: string
        rotate: number
        horizontal: number
        vertical: number
      }
    }
    user: {
      id: string
      name: string
      permission: string
      avatar_url: string
    }
  }
}

export interface OpenGetSaveFileUrlParam {
  queryStr: string // 格式：a=x&b=y
  headers: Headers
}

export interface OpenGetSaveFileUrlResp {
  result: string
  msg?: string
  data?: {
    url: string
    params: any
    headers: any
  }
}

export interface NotifyParmams {
  uid: string
  template: Template
  event: Event
}

export interface Event {
  type: string
  data: any
}

export interface Template {
  common: Common
  msgbox?: MsgBox
  bubble?: Bubble
}

export interface Common {
  creator: string
  creatorId: number
  avatar: string
  openType?: string
  openParam?: any
  openTarget?: string
  title: string
  icon?: string
  subTitle?: string
  buttons?: Button[]
  status?: string
}

export interface Button {
  text: string
  type: string
  status?: string
  url?: string
  method?: string
  params?: any
  options?: Option[]
}

export interface Option {
  text: string
  desc?: string
  url: string
  method?: string
  params?: any
  options?: Option[]
}

export interface MsgBox {
  title?: string
  subTitle?: string
  desc?: string
  detail?: Detail[]
}

export interface Detail {
  key?: string
  desc: string
}

export interface Bubble {
  title?: string
  subTitle?: string
  action: string
  closeableBoolean?: boolean
}

export interface NotifyResp {
  result: string
  msg?: string
  data?: {
    push_id?: string
  }
}
