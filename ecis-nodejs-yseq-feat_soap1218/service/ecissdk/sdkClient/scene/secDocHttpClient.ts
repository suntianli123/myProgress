import {WPSContext, WPSParams, WPSRequest} from "../../wps2";
import {
    EncryptParam,
    QueryUserDepartmentsParam,
    UpdateDocRightsParam,
    UpdateSecureDocumentParam
} from "../../model/dlib/data";
import {Resp} from "../../model/resHelper";

export default class SecDocHttpClient {
    ctx: WPSContext

    constructor(ctx: WPSContext) {
        this.ctx = ctx
    }

    private query(params: WPSParams = {}) {
        return {
            ...params
        }
    }

    encrypt(params: EncryptParam): Promise<Resp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/secDoc/encrypt`,
            this.query(),
            {
                bodyStr: JSON.stringify(params)
            }
        )
    }

    decrypt(
        fileId: number,
        fileName: string,
        fileUrl: string
    ): Promise<Resp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/secDoc/decrypt`,
            this.query(),
            {
                fileId: fileId,
                fileName: fileName,
                fileUrl: fileUrl
            }
        )
    }

    queryDocumentCode(
        fileId: number,
        fileName: string,
        fileUrl: string
    ): Promise<Resp> {
        const req = new WPSRequest(this.ctx)
        return req.get(
            `/sdk/secDoc/queryDocumentCode`,
            this.query({
                fileId: fileId,
                fileName: fileName,
                fileUrl: fileUrl
            })
        )
    }

    updateDocRights(params: UpdateDocRightsParam): Promise<Resp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/secDoc/updateDocRights`,
            this.query(),
            {
                bodyStr: JSON.stringify(params)
            }
        )
    }

    queryUserDepartments(params: QueryUserDepartmentsParam): Promise<Resp> {
        const req = new WPSRequest(this.ctx)
        req.headers = params.headers
        return req.get(
            `/sdk/secDoc/queryUserDepartments`,
            this.query(params.params)
        )
    }

    getSecureDocumentUpdateUrl(
        groupId: number,
        size: number
    ): Promise<Resp> {
        const req = new WPSRequest(this.ctx)
        return req.get(
            `/sdk/secDoc/getSecureDocumentUpdateUrl`,
            this.query({
                groupId: groupId,
                size: size,
            })
        )
    }

    updateSecureDocument(params: UpdateSecureDocumentParam): Promise<Resp> {
        const req = new WPSRequest(this.ctx)
        return req.post(
            `/sdk/secDoc/updateSecureDocument`,
            this.query(),
            {
                groupId: params.groupId,
                fileId: params.fileId,
                parentId: params.parentId,
                operatorId: params.operatorId,
                originSha1: params.originSha1,
                newSha1: params.newSha1,
                storeType: params.storeType,
                storeId: params.storeId,
                secureGuid: params.secureGuid,
                source: params.source,
                size: params.size,
            }
        )
    }
}
