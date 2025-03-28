import {
  DelRequest,
  GetAllRequest,
  GetRequest,
  LockRequest,
  ReleaseRequest,
  SetRequest
} from '../../client/etcd/etcd_pb'
import { grpcSdkInstance } from '../../../src/grpc/sdk'
import { EtcdDelResp, EtcdGetAllResp, EtcdGetResp, EtcdLockResp, EtcdPutResp, EtcdReleaseResp } from '../../model/data'

/**
 * etcd RPC客户端
 */
export default class EtcdGrpcClient {
  put(key: string, value: string): Promise<EtcdPutResp> {
    return new Promise((resolve, reject) => {
      const request = new SetRequest()
      request.setKey(key)
      request.setValue(value)
      grpcSdkInstance.middleware.etcd.put(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }

  get(key: string): Promise<EtcdGetResp> {
    return new Promise((resolve, reject) => {
      const request = new GetRequest()
      request.setKey(key)
      grpcSdkInstance.middleware.etcd.get(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }

  delete(key: string): Promise<EtcdDelResp> {
    return new Promise((resolve, reject) => {
      const request = new DelRequest()
      request.setKey(key)
      grpcSdkInstance.middleware.etcd.delete(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }

    getLock(key: string, seconds: number): Promise<EtcdLockResp> {
    return new Promise((resolve, reject) => {
      const request = new LockRequest()
      request.setKey(key)
      request.setSeconds(seconds)
      grpcSdkInstance.middleware.etcd.lock(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }

    releaseLock(key: string, value: string): Promise<EtcdReleaseResp> {
    return new Promise((resolve, reject) => {
      const request = new ReleaseRequest()
      request.setKey(key)
      request.setValue(value)
      grpcSdkInstance.middleware.etcd.release(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }

  getAll(key: string): Promise<EtcdGetAllResp> {
    return new Promise((resolve, reject) => {
      const request = new GetAllRequest()
      request.setKey(key)
      grpcSdkInstance.middleware.etcd.getAll(
        request,
        grpcSdkInstance.meta,
        function (_err, response) {
          if (_err) {
            return reject(_err)
          }
          return resolve({
            result: response.getResult(),
            data: response.getData(),
            msg: response.getMsg()
          })
        }
      )
    })
  }
}
