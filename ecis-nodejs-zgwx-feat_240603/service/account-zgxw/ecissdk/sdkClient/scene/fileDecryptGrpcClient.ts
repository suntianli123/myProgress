import { grpcSdkInstance } from '../../../src/grpc/sdk'
import {
  CbMessage,
  ClearHistoryFileRequest,
  DecryptFileRequest,
  ExistDecryptFileRequest, PreUploadFileRequest
} from '../../client/fileDecrypt/fileDecrypt_pb'
import {
  FileClearHistoryResp,
  FileDecryptExistResp,
  FileDecryptFileResp,
  FilePreUploadFileResp
} from '../../model/data'

export default class FileDecryptGrpcClient {
  existDecryptFile(storekey: string, filetype: string, filesize: number): Promise<FileDecryptExistResp> {
    return new Promise((resolve, reject) => {
      const request = new ExistDecryptFileRequest()
      request.setStoreKey(storekey)
      request.setFileType(filetype)
      request.setFileSize(filesize)
      grpcSdkInstance.scene.fileDecrypt.existDecryptFile(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData()
              ? JSON.parse(response.getData())
              : response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }

  decryptFile(
    storekey: string,
    filetype: string,
    filesize: number,
    callback: [number, string]
  ): Promise<FileDecryptFileResp> {
    return new Promise((resolve, reject) => {
      const request = new DecryptFileRequest()
      request.setStoreKey(storekey)
      request.setFileType(filetype)
      request.setFileSize(filesize)
      let cbMessage = null
      if (callback) {
        cbMessage = new CbMessage()
        const [errCode, msg] = callback
        cbMessage.setErrcode(errCode)
        cbMessage.setMsg(msg)
        request.setCallback(cbMessage)
      }
      grpcSdkInstance.scene.fileDecrypt.decryptFile(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData()
              ? JSON.parse(response.getData())
              : response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }

  clearHistoryFile(storekey: string, lastdate: number): Promise<FileClearHistoryResp> {
    return new Promise((resolve, reject) => {
      const request = new ClearHistoryFileRequest()
      request.setStoreKey(storekey)
      request.setLastDate(lastdate)
      grpcSdkInstance.scene.fileDecrypt.clearHistoryFile(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData()
              ? JSON.parse(response.getData())
              : response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }

  preUploadFile(storekey: string): Promise<FilePreUploadFileResp> {
    return new Promise((resolve, reject) => {
      const request = new PreUploadFileRequest()
      request.setStoreKey(storekey)
      grpcSdkInstance.scene.fileDecrypt.preUploadFile(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData()
              ? JSON.parse(response.getData())
              : response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }
}
