import {
  GRPC_BINARY_KEY_SUFFIX,
  OpenGetFileInfoParam,
  OpenGetFileInfoResp,
  OpenGetIdConfuseParams,
  OpenGetIdConfuseResp,
  OpenGetSaveFileUrlParam,
  OpenGetSaveFileUrlResp,
  OpenPreviewInnerFileInfoParam,
  OpenPreviewInnerFileInfoResp
} from "../../model/data";
import {
  GetFileInfoRequest,
  GetIdConfuseRequest,
  GetPreviewInnerFileInfoRequest,
  GetSaveFileUrlRequest
} from "../../client/wpsopen/wpsopen_pb";
import {grpcSdkInstance} from "../../../src/grpc/sdk";


/**
 * wpsopen RPC客户端
 */
export default class WpsopenGrpcClient {

  getIdConfuse(params: OpenGetIdConfuseParams): Promise<OpenGetIdConfuseResp> {
    return new Promise<OpenGetIdConfuseResp>((resolve, reject) => {
      const request = new GetIdConfuseRequest()
      request.setQuerystr(params.queryStr)
      grpcSdkInstance.service.wpsopen.getIdConfuse(request, grpcSdkInstance.meta, function (_err, response) {
        if (_err) {
          return reject(_err)
        }
        return resolve({
          result: response.getResult(),
          data: response.getData() ? JSON.parse(response.getData()) : null,
          msg: response.getMsg()
        } as OpenGetIdConfuseResp)
      })
    })
  }

  getFileInfo(params: OpenGetFileInfoParam): Promise<OpenGetFileInfoResp> {
    return new Promise<OpenGetFileInfoResp>((resolve, reject) => {
      const request = new GetFileInfoRequest()
      request.setQuerystr(params.queryStr)
      grpcSdkInstance.meta.set(`headers${GRPC_BINARY_KEY_SUFFIX}`, Buffer.from(JSON.stringify(params.headers)))
      grpcSdkInstance.service.wpsopen.getFileInfo(request, grpcSdkInstance.meta, function (_err, response) {
        if (_err) {
          return reject(_err)
        }
        return resolve({
          result: response.getResult(),
          data: response.getData() ? JSON.parse(response.getData()) : null,
          msg: response.getMsg()
        } as OpenGetFileInfoResp)
      })
    })
  }

  getPreviewInnerFileInfo(params: OpenPreviewInnerFileInfoParam): Promise<OpenPreviewInnerFileInfoResp> {
    return new Promise<OpenPreviewInnerFileInfoResp>((resolve, reject) => {
      const request = new GetPreviewInnerFileInfoRequest()
      request.setQuerystr(params.queryStr)
      grpcSdkInstance.meta.set(`headers${GRPC_BINARY_KEY_SUFFIX}`, Buffer.from(JSON.stringify(params.headers)))
      grpcSdkInstance.service.wpsopen.getPreviewInnerFileInfo(request, grpcSdkInstance.meta, function (_err, response) {
        if (_err) {
          return reject(_err)
        }
        return resolve({
          result: response.getResult(),
          data: response.getData() ? JSON.parse(response.getData()) : null,
          msg: response.getMsg()
        } as OpenPreviewInnerFileInfoResp)
      })
    })
  }

  getSaveFileUrl(params: OpenGetSaveFileUrlParam): Promise<OpenGetSaveFileUrlResp> {
    return new Promise<OpenGetSaveFileUrlResp>((resolve, reject) => {
      const request = new GetSaveFileUrlRequest()
      request.setQuerystr(params.queryStr)
      grpcSdkInstance.meta.set(`headers${GRPC_BINARY_KEY_SUFFIX}`, Buffer.from(JSON.stringify(params.headers)))
      grpcSdkInstance.service.wpsopen.getSaveFileUrl(request, grpcSdkInstance.meta, function (_err, response) {
        if (_err) {
          return reject(_err)
        }
        return resolve({
          result: response.getResult(),
          data: response.getData() ? JSON.parse(response.getData()) : null,
          msg: response.getMsg()
        } as OpenGetSaveFileUrlResp)
      })
    })
  }
}
