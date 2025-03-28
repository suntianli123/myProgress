/* eslint-disable camelcase */
export interface GetFileParentNamesParams {
  path: {
    groupid: string
    fileid: string
  }
  queryStr: string // 格式：a=x&b=y
}

export interface GetFileParentNamesResp {
  result: string
  msg?: string
  data?: {
    result: string
    parent_file_names: any
  }
}

export interface GetCorpGroupInfoParams {
  path: {
    groupid: string
  }
}

export interface GetCorpGroupInfoResp {
  result: string
  msg?: string
  data?: {
    groupid: string
    group_type: string
    name: string
    creator: number
    status: number
    corp_id: number
    source: string
    atime: number
    ctime: number
    mtime: number
    utime: number
    result: string
  }
}

export interface GetFilesInfoParams {
  queryStr: string // 格式：a=x&b=y
}

export interface FileInfo {
  file_id: number
  parent_id: number
  group_id: number
  ftype: string
  fname: string
  fver: number
  fsize: number
  creator: number
  is_fsha_empty: boolean
}

export interface FailInfo {
  fileid: number
  result: string
  msg: string
}

export interface GetFilesInfoResp {
  result: string
  msg?: string
  data?: {
    faillist: FailInfo[]
    file_info: FileInfo[]
    result: string
  }
}

export interface GetFilePathNamesParams {
  path: {
    groupid: string
    fileid: string
  }
}

export interface GetFilePathNamesResp {
  result: string
  msg?: string
  data?: {
    path_names: string[]
  }
}

export interface DownloadFileParams {
  path: {
    fileid: string
  }
  queryStr: string
}

export interface DownloadFileResp {
  result: string
  msg?: string
  data?: {
    fileinfo: {
      url: string
      sha1: string
      md5: string
      store: string
    }
  }
}

export interface DownloadFirstRecycleFileParams {
  path: {
    fileid: string
  }
  queryStr: string
}

export interface DownloadFirstRecycleFileResp {
  result: string
  msg?: string
  data?: {
    fileinfo: {
      url: string
      sha1: string
      md5: string
      store: string
    }
  }
}

export interface DownloadHistoryFileParams {
  path: {
    historyid: string
  }
  queryStr: string
}

export interface DownloadHistoryFileResp {
  result: string
  msg?: string
  data?: {
    fileinfo: {
      url: string
      sha1: string
      md5: string
      store: string
    }
  }
}

export interface CreateTermParams {
  bodyStr: string
}

export interface CreateTermResp {
  result: string
  msg?: string
  data?: {
    term_id: number
  }
}

export interface UpdateTermParams {
  queryStr: string
  bodyStr: string
}

export interface UpdateTermResp {
  result: string
  msg?: string
  data?: {
    term_id: number
    parent_id: number
    company_id: number
    set_id: number
    name: string
    desc: string
    created_at: string
    updated_at: string
    deleted_at: string
  }
}

export interface GetTermParams {
  queryStr: string
}

export interface GetTermResp {
  result: string
  msg?: string
  data?: {
    term_id: number
    parent_id: number
    company_id: number
    set_id: number
    name: string
    desc: string
    created_at: string
    updated_at: string
    deleted_at: string
  }
}

export interface CreateObjectTermsRelationParams {
  bodyStr: string
}

export interface ObjectTermRelation {
  relation_id: number
  company_id: number
  object_id: string
  object_type: string
  term_id: number
  term_order: number
  created_at: string
  updated_at: string
  deleted_at: string
}

export interface CreateObjectTermsRelationResp {
  result: string
  msg?: string
  data?: {
    failed: any
    success: ObjectTermRelation[]
  }
}

export interface ListObjectTermsRelationParams {
  bodyStr: string
}

export interface Term {
  term_id: number
  parent_id: number
  company_id: number
  set_id: number
  name: string
  desc: string
  created_at: string
  updated_at: string
  deleted_at: string
}

export interface ObjectTerm {
  object_id: string
  object_type: string
  terms: Term[]
}

export interface ListObjectTermsRelationResp {
  result: string
  msg?: string
  data?: {
    data: ObjectTerm[]
  }
}

export interface GetObjectTermRelationParams {
  queryStr: string
}

export interface GetObjectTermRelationResp {
  result: string
  msg?: string
  data?: {
    relation_id: number
    company_id: number
    object_id: string
    object_type: string
    term_id: number
    term_order: number
    created_at: string
    updated_at: string
    deleted_at: string
  }
}

export interface DelObjectTermRelationParams {
  bodyStr: string
}

export interface DelObjectTermInfo {
  object_id: string
  term_id: number
}

export interface DelObjectTermRelationResp {
  result: string
  msg?: string
  data?: {
    failed: DelObjectTermInfo[]
    success: DelObjectTermInfo[]
  }
}

export interface CreateMetaTypeParams {
  queryStr: string
  bodyStr: string
}

export interface CreateMetaTypeResp {
  result: string
  msg?: string
  data?: {
    data?: {
      id: number
      comp_id: number
      object_type: string
      name: string
      desc: string
      value_type: string
      value_type_data: string
      created_at: string
      updated_at: string
    }
  }
}

export interface CreateMetadataParams {
  bodyStr: string
}

export interface CreateMetadataResp {
  result: string
  msg?: string
  data?: {
    data?: {
      id: number
      comp_id: number
      object_id: string
      metatype_id: number
      meta_value: string
      created_at: string
      updated_at: string
    }
  }
}

export interface DelMetadataParams {
  queryStr: string
  bodyStr: string
}

export interface DelMetadataResp {
  result: string
  msg?: string
  data?: {
    result: string
  }
}

export interface ListFileParams {
  type?: string
  groupid?: number
  customQuery: string
  nextCursor?: string
  count: number
}

export interface FileInfoObj {
  id?: number
  fileid: number
  groupid: number
  userid: number
  ctime?: number
  mtime: number
}

export interface ListFileResp {
  result: string
  msg?: string
  data?: {
    list: FileInfoObj[]
    nextCursor: string
    count: number
  }
}

export interface EncryptParam {
  fileId: number,
  fileName: string,
  fileUrl: string,
  docType: number,
  creatorId: number,
  companyId: number,
  rights: DocRight[]
}

export interface UpdateDocRightsParam {
  guid: string,
  fileId: number,
  fileName: string,
  rights: DocRight[]
}

export interface DocRight {
  principalid: string,
  principaltype: number,
  operationids: number[]
}

export interface QueryUserDepartmentsParam {
  params: {
    compId: string,
    compUid?: string,
    userId?: number
  }
  headers: Headers
}

export interface Headers {
  [key: string]: any
}

export interface UpdateSecureDocumentParam {
  groupId: number
  fileId: number
  parentId: number
  operatorId: number
  originSha1: string
  newSha1: string
  storeType: string
  storeId: string
  secureGuid: string
  source: number
  size: number
}

export interface GetFileDownloadUrlRes {
  code:number
  data?:{
    checksums: any
    download_url:string
    sys_metadata: any
  }
  message?:string
}

export interface UploadFileRes {
  code:number
  data?:{
    file_token:string
  }
  message?:string
}

export interface UpdateProfileParams {
  endpoint?:string
  flat_enable?:boolean
  allow_origins?: string
}

export interface UpdateProfileRes {
  code:number
  data?:any
  message?:string
}

export interface ScanEngineHeartBeatParams {
  info: {
    name: string,
    version: string,
    class: string
  },
  properties: {
    url: string,
    timeout: number
  }
}

export interface ScanEngineCallBackParams {
  enginetask_id: string,
  extra_param: any,
  success: boolean,
  message: string,
  scan_result: ScanResultInfo[]
}

export interface ScanResultInfo {
  file_id: number,
  group_id: number,
  company_id: number,
  file_version: number,
  result: any
}

export interface GetFileDownloadParams {
  path: {
    fileId: string
    groupId: string
  }
  queryStr: string
}

export interface GetFileHistoryDownloadParams {
  path: {
    historyId: string
  }
  queryStr: string
}


export interface GetFileHistoryParam {
  path: {
    fileId: string
  }
  queryStr: string
}

export interface GetFileDownloadResp {
  result: string
  msg?: string
  data?: {
    fileinfo: {
      md5: string
      real_store: string
      sha1: string
      static_url: string
      store: string
      url: string
    }
  }
}

export interface GetFileHistoryResp {
  result: string
  msg?: string
  data?: {
    histories: History[]
  }
}

export interface History {
  id: number
  parentid: number
  fname: string
  fsize: number
  ftype: string
  mtime: number
  store: number
  fver: number
  fsha: string
  storeid: string
  deleted: boolean
  creator: {
    name: string,
    avator: string,
    corpid: number
  }
  modifier: {
    name: string,
    avator: string,
    corpid: number
  }
  reason: number
}
