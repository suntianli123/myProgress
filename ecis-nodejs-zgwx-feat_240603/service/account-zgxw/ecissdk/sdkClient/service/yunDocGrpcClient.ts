import {
    BatchDownloadFileRequest,
    CreateFileRequest,
    CreateFilesUploadRequest,
    CreateFolderRequest,
    DeleteFilePermissionRequest,
    DownloadFileRequest,
    GetFilePermissionsRequest,
    ListFilesRequest,
    UpdateFileRequest
} from '../../client/yunDoc/yunDoc_pb'
import {grpcSdkInstance} from "../../../src/grpc/sdk";
import {
    BatchDownloadFileParams,
    CreateFileParams,
    CreateFilesUploadParams,
    CreateFolderParams, DeleteFilePermissionParams, DownloadFileParams, GetFilePermissionsParams,
    ListFilesParams, UpdateFileParams,
    YundocBatchDownloadFileResp,
    YundocCreateFileResp,
    YundocCreateFilesUploadResp,
    YundocCreateFolderResp,
    YundocDeleteFilePermissionsResp,
    YundocDownloadFileResp,
    YundocGetFilePermissionsResp,
    YundocListFilesResp, YundocUpdateFileResp
} from "../../model/data";

/**
 * yunDoc RPC客户端
 */
const GRPC_BINARY_KEY_SUFFIX = '-bin'

export default class YunDocGrpcClient {
    listFiles(params: ListFilesParams): Promise<YundocListFilesResp> {
        return new Promise((resolve, reject) => {
            const request = new ListFilesRequest()
            request.setGroupid(params.query.groupid)
            request.setParentid(params.query.parentid)
            request.setOffset(params.query.offset)
            request.setCount(params.query.count)
            request.setIgnoreList(params.query.ignore)
            request.setLinkgroup(params.query.linkgroup)
            request.setIncludeList(params.query.include)
            request.setOrder(params.query.order)
            request.setOrderby(params.query.orderby)
            grpcSdkInstance.meta.set(`headers${GRPC_BINARY_KEY_SUFFIX}`, Buffer.from(JSON.stringify(params.headers)))
            grpcSdkInstance.service.yunDoc.listFiles(request, grpcSdkInstance.meta, function(_err, response) {
                if (_err) {
                    return reject(_err)
                }
                return resolve({
                    result: response.getResult(),
                    data: response.getData() ? JSON.parse(response.getData()) : null,
                    msg: response.getMsg()
                })
            })
        })
    }

    createFolder(params: CreateFolderParams): Promise<YundocCreateFolderResp> {
        return new Promise((resolve, reject) => {
            const request = new CreateFolderRequest()
            request.setGroupid(params.body.groupid)
            request.setParentid(params.body.parentid)
            request.setParentPathList(params.body.parent_path)
            request.setMustCreate(params.body.must_create)
            request.setName(params.body.name)
            request.setRetrieveExistent(params.body.retrieve_existent)
            request.setCsrfmiddlewaretoken(params.body.csrfmiddlewaretoken)
            grpcSdkInstance.meta.set(`headers${GRPC_BINARY_KEY_SUFFIX}`, Buffer.from(JSON.stringify(params.headers)))
            grpcSdkInstance.service.yunDoc.createFolder(request, grpcSdkInstance.meta, function(_err, response) {
                if (_err) {
                    return reject(_err)
                }
                return resolve({
                    result: response.getResult(),
                    data: response.getData() ? JSON.parse(response.getData()) : null,
                    msg: response.getMsg()
                })
            })
        })
    }

    getFilePermissions(params: GetFilePermissionsParams): Promise<YundocGetFilePermissionsResp> {
        return new Promise((resolve, reject) => {
            const request = new GetFilePermissionsRequest()
            request.setGroupid(params.query.groupId)
            request.setFileid(params.query.fileId)
            request.setNext(params.query.next)
            grpcSdkInstance.meta.set(`headers${GRPC_BINARY_KEY_SUFFIX}`, Buffer.from(JSON.stringify(params.headers)))
            grpcSdkInstance.service.yunDoc.getFilePermissions(request, grpcSdkInstance.meta, function(_err, response) {
                if (_err) {
                    return reject(_err)
                }
                return resolve({
                    result: response.getResult(),
                    data: response.getData() ? JSON.parse(response.getData()) : null,
                    msg: response.getMsg()
                })
            })
        })
    }

    deleteFilePermission(params: DeleteFilePermissionParams): Promise<YundocDeleteFilePermissionsResp> {
        return new Promise((resolve, reject) => {
            const request = new DeleteFilePermissionRequest()
            request.setGroupid(params.query.groupId)
            request.setFileid(params.query.fileId)
            request.setSubjectId(params.query.subject_id)
            request.setSubjectType(params.query.subject_type)
            grpcSdkInstance.meta.set(`headers${GRPC_BINARY_KEY_SUFFIX}`, Buffer.from(JSON.stringify(params.headers)))
            grpcSdkInstance.service.yunDoc.deleteFilePermission(request, grpcSdkInstance.meta, function(_err, response) {
                if (_err) {
                    return reject(_err)
                }
                return resolve({
                    result: response.getResult(),
                    data: response.getData() ? JSON.parse(response.getData()) : null,
                    msg: response.getMsg()
                })
            })
        })
    }

    createFilesUpload(params: CreateFilesUploadParams): Promise<YundocCreateFilesUploadResp> {
        return new Promise((resolve, reject) => {
            const request = new CreateFilesUploadRequest()
            request.setCheckname(params.body.checkname)
            request.setGroupid(params.body.groupid)
            request.setParentid(params.body.parentid)
            request.setName(params.body.name)
            request.setSize(params.body.size)
            request.setReqByInternal(params.body.req_by_internal)
            request.setClientStores(params.body.client_stores)
            request.setContenttype(params.body.contenttype)
            request.setStartswithfilename(params.body.startswithfilename)
            request.setSuccessactionstatus(params.body.successactionstatus)
            request.setTrytime(params.body.trytime)
            request.setSha1(params.body.sha1)
            request.setCsrfmiddlewaretoken(params.body.csrfmiddlewaretoken)
            grpcSdkInstance.meta.set(`headers${GRPC_BINARY_KEY_SUFFIX}`, Buffer.from(JSON.stringify(params.headers)))
            grpcSdkInstance.service.yunDoc.createFilesUpload(request, grpcSdkInstance.meta, function(_err, response) {
                if (_err) {
                    return reject(_err)
                }
                return resolve({
                    result: response.getResult(),
                    data: response.getData() ? JSON.parse(response.getData()) : null,
                    msg: response.getMsg()
                })
            })
        })
    }

    createFile(params: CreateFileParams):Promise<YundocCreateFileResp>  {
        return new Promise((resolve, reject) => {
            const request = new CreateFileRequest()
            request.setEtag(params.body.etag)
            request.setFileid(params.body.fileid)
            request.setGroupid(params.body.groupid)
            request.setKey(params.body.key)
            request.setMac(params.body.mac)
            request.setMustCreate(params.body.must_create)
            request.setName(params.body.name)
            request.setParentPathList(params.body.parent_path)
            request.setParentid(params.body.parentid)
            request.setSecureGuid(params.body.secure_guid)
            request.setSha1(params.body.sha1)
            request.setSize(params.body.size)
            request.setStore(params.body.store)
            request.setUnlimitedSize(params.body.unlimited_size)
            request.setCsrfmiddlewaretoken(params.body.csrfmiddlewaretoken)
            grpcSdkInstance.meta.set(`headers${GRPC_BINARY_KEY_SUFFIX}`, Buffer.from(JSON.stringify(params.headers)))
            grpcSdkInstance.service.yunDoc.createFile(request, grpcSdkInstance.meta, function(_err, response) {
                if (_err) {
                    return reject(_err)
                }
                return resolve({
                    result: response.getResult(),
                    data: response.getData() ? JSON.parse(response.getData()) : null,
                    msg: response.getMsg()
                })
            })
        })
    }

    updateFile(params: UpdateFileParams): Promise<YundocUpdateFileResp> {
        return new Promise((resolve, reject) => {
            const request = new UpdateFileRequest()
            request.setClientStores(params.body.client_stores)
            request.setFileid(params.body.fileid)
            request.setReqByInternal(params.body.req_by_internal)
            request.setS3sha256(params.body.s3sha256)
            request.setSha1(params.body.sha1)
            request.setSize(params.body.size)
            request.setTrytime(params.body.trytime)
            request.setCsrfmiddlewaretoken(params.body.csrfmiddlewaretoken)
            grpcSdkInstance.meta.set(`headers${GRPC_BINARY_KEY_SUFFIX}`, Buffer.from(JSON.stringify(params.headers)))
            grpcSdkInstance.service.yunDoc.updateFile(request, grpcSdkInstance.meta, function(_err, response) {
                if (_err) {
                    return reject(_err)
                }
                return resolve({
                    result: response.getResult(),
                    data: response.getData() ? JSON.parse(response.getData()) : null,
                    msg: response.getMsg()
                })
            })
        })
    }

    downloadFile(params: DownloadFileParams): Promise<YundocDownloadFileResp> {
        return new Promise((resolve, reject) => {
            const request = new DownloadFileRequest()
            request.setFileid(params.query.fileid)
            request.setGroupid(params.query.groupid)
            request.setIsblocks(params.query.isblocks)
            request.setProcessonType(params.query.processon_type)
            request.setStore(params.query.store)
            grpcSdkInstance.meta.set(`headers${GRPC_BINARY_KEY_SUFFIX}`, Buffer.from(JSON.stringify(params.headers)))
            grpcSdkInstance.service.yunDoc.downloadFile(request, grpcSdkInstance.meta, function(_err, response) {
                if (_err) {
                    return reject(_err)
                }
                return resolve({
                    result: response.getResult(),
                    data: response.getData() ? JSON.parse(response.getData()) : null,
                    msg: response.getMsg()
                })
            })
        })
    }

    batchDownloadFile(params: BatchDownloadFileParams): Promise<YundocBatchDownloadFileResp> {
        return new Promise((resolve, reject) => {
            const request = new BatchDownloadFileRequest()
            request.setGroupid(params.body.groupid)
            request.setFileidsList(params.body.fileids)
            request.setCsrfmiddlewaretoken(params.body.csrfmiddlewaretoken)
            grpcSdkInstance.meta.set(`headers${GRPC_BINARY_KEY_SUFFIX}`, Buffer.from(JSON.stringify(params.headers)))
            grpcSdkInstance.service.yunDoc.batchDownloadFile(request, grpcSdkInstance.meta, function(_err, response) {
                if (_err) {
                    return reject(_err)
                }
                return resolve({
                    result: response.getResult(),
                    data: response.getData() ? JSON.parse(response.getData()) : null,
                    msg: response.getMsg()
                })
            })
        })
    }
}
