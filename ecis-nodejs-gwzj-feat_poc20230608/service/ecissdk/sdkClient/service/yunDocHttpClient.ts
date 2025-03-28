import {WPSContext, WPSParams, WPSRequest} from "../../wps2";
import {
    BatchDownloadFileParams,
    CreateFileParams,
    CreateFilesUploadParams,
    CreateFolderParams, DeleteFilePermissionParams, DownloadFileParams,
    GetFilePermissionsParams,
    ListFilesParams, UpdateFileParams, YundocBatchDownloadFileResp, YundocCreateFileResp, YundocCreateFilesUploadResp,
    YundocCreateFolderResp, YundocDeleteFilePermissionsResp, YundocDownloadFileResp, YundocGetFilePermissionsResp,
    YundocListFilesResp, YundocUpdateFileResp
} from "../../model/data";

export default class YunDocHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
        this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
        return {
            ...params
        }
    }

    listFiles(params: ListFilesParams): Promise<YundocListFilesResp> {
        const req = new WPSRequest(this.ctx)
        req.headers = params.headers
        return req.get(
            `/sdk/yundoc/list_files`,
            this.query({
                count: params.query.count,
                groupid: params.query.groupid,
                ignore: params.query.ignore,
                include: params.query.include,
                linkgroup: params.query.linkgroup,
                offset: params.query.offset,
                order: params.query.order,
                orderby: params.query.orderby,
                parentid: params.query.parentid,
            })
        )
    }

    createFolder(params: CreateFolderParams): Promise<YundocCreateFolderResp> {
        const req = new WPSRequest(this.ctx)
        req.headers = params.headers
        return req.post(
            `/sdk/yundoc/create_folder`,
            this.query(),
            {
                groupid: params.body.groupid,
                must_create: params.body.must_create,
                name: params.body.name,
                parent_path: params.body.parent_path,
                parentid: params.body.parentid,
                retrieve_existent: params.body.retrieve_existent,
                csrfmiddlewaretoken: params.body.csrfmiddlewaretoken
            }
        )
    }

    getFilePermissions(params: GetFilePermissionsParams): Promise<YundocGetFilePermissionsResp> {
        const req = new WPSRequest(this.ctx)
        req.headers = params.headers
        return req.get(
            `/sdk/yundoc/get_file_permissions`,
            this.query({
                groupId: params.query.groupId,
                fileId: params.query.fileId,
                next: params.query.next
            })
        )
    }

    deleteFilePermission(params: DeleteFilePermissionParams): Promise<YundocDeleteFilePermissionsResp> {
        const req = new WPSRequest(this.ctx)
        req.headers = params.headers
        return req.post(
            `/sdk/yundoc/delete_file_permission`,
            this.query(),
            {
                groupId: params.query.groupId,
                fileId: params.query.fileId,
                subject_id: params.query.subject_id,
                subject_type: params.query.subject_type
            }
        )
    }

    createFilesUpload(params: CreateFilesUploadParams): Promise<YundocCreateFilesUploadResp> {
        const req = new WPSRequest(this.ctx)
        req.headers = params.headers
        return req.post(
            `/sdk/yundoc/create_files_upload`,
            this.query(),
            {
                checkname: params.body.checkname,
                client_stores: params.body.client_stores,
                contenttype: params.body.contenttype,
                groupid: params.body.groupid,
                name: params.body.name,
                parentid: params.body.parentid,
                req_by_internal: params.body.req_by_internal,
                size: params.body.size,
                startswithfilename: params.body.startswithfilename,
                successactionstatus: params.body.successactionstatus,
                trytime: params.body.trytime,
                sha1: params.body.sha1,
                csrfmiddlewaretoken: params.body.csrfmiddlewaretoken,
                method: params.req.method
            }
        )
    }

    createFile(params: CreateFileParams):Promise<YundocCreateFileResp> {
        const req = new WPSRequest(this.ctx)
        req.headers = params.headers
        return req.post(
            `/sdk/yundoc/create_file`,
            this.query(),
            {
                etag: params.body.etag,
                fileid: params.body.fileid,
                groupid: params.body.groupid,
                key: params.body.key,
                mac: params.body.mac,
                must_create: params.body.must_create,
                name: params.body.name,
                parent_path: params.body.parent_path,
                parentid: params.body.parentid,
                secure_guid: params.body.secure_guid,
                sha1: params.body.sha1,
                size: params.body.size,
                store: params.body.store,
                unlimited_size: params.body.unlimited_size,
                csrfmiddlewaretoken: params.body.csrfmiddlewaretoken,
                method: params.req.method
            }
        )
    }

    updateFile(params: UpdateFileParams): Promise<YundocUpdateFileResp> {
        const req = new WPSRequest(this.ctx)
        req.headers = params.headers
        return req.post(
            `/sdk/yundoc/update_file`,
            this.query(),
            {
                client_stores: params.body.client_stores,
                fileid: params.body.fileid,
                req_by_internal: params.body.req_by_internal,
                s3sha256: params.body.s3sha256,
                sha1: params.body.sha1,
                size: params.body.size,
                trytime: params.body.trytime,
                csrfmiddlewaretoken: params.body.csrfmiddlewaretoken
            }
        )
    }

    downloadFile(params: DownloadFileParams): Promise<YundocDownloadFileResp> {
        const req = new WPSRequest(this.ctx)
        req.headers = params.headers
        return req.get(
            `/sdk/yundoc/download_File`,
            this.query({
                fileid: params.query.fileid,
                groupid: params.query.groupid,
                isblocks: params.query.isblocks,
                processon_type: params.query.processon_type,
                store: params.query.store
            })
        )
    }

    batchDownloadFile(params: BatchDownloadFileParams): Promise<YundocBatchDownloadFileResp> {
        const req = new WPSRequest(this.ctx)
        req.headers = params.headers
        return req.post(
            `/sdk/yundoc/batch_download_file`,
            this.query(),
            {
                fileids: params.body.fileids,
                groupid: params.body.groupid,
                csrfmiddlewaretoken: params.body.csrfmiddlewaretoken
            }
        )
    }
}
