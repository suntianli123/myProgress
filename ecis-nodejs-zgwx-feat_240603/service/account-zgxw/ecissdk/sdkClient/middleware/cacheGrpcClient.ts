import {
  DelRequest,
  GetRequest,
  HDelRequest,
  HGetAllRequest,
  HGetRequest,
  HSetRequest,
  SetRequest
} from '../../client/cache/cache_pb'
import { grpcSdkInstance } from '../../../src/grpc/sdk'
import {
  CacheDelResp,
  CacheGetResp,
  CacheHdelResp,
  CacheHgetAllResp,
  CacheHgetResp,
  CacheHsetResp,
  CacheSetResp
} from '../../model/data'

/**
 * redis RPC客户端
 */
export default class CacheGrpcClient {
  set(key: string, value: string): Promise<CacheSetResp> {
    return new Promise((resolve, reject) => {
      const request = new SetRequest()
      request.setKey(key)
      request.setValue(value)
      grpcSdkInstance.middleware.cache.set(
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

  get(key: string): Promise<CacheGetResp> {
    return new Promise((resolve, reject) => {
      const request = new GetRequest()
      request.setKey(key)
      grpcSdkInstance.middleware.cache.get(
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

  del(key: string): Promise<CacheDelResp> {
    return new Promise((resolve, reject) => {
      const request = new DelRequest()
      request.setKey(key)
      grpcSdkInstance.middleware.cache.del(
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

  hSet(hash: string, field: string, value: string): Promise<CacheHsetResp> {
    return new Promise((resolve, reject) => {
      const request = new HSetRequest()
      request.setHash(hash)
      request.setField(field)
      request.setValue(value)
      grpcSdkInstance.middleware.cache.hSet(
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

  hGet(hash: string, field: string): Promise<CacheHgetResp> {
    return new Promise((resolve, reject) => {
      const request = new HGetRequest()
      request.setHash(hash)
      request.setField(field)
      grpcSdkInstance.middleware.cache.hGet(
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

  hDel(hash: string, field: string): Promise<CacheHdelResp> {
    return new Promise((resolve, reject) => {
      const request = new HDelRequest()
      request.setHash(hash)
      request.setField(field)
      grpcSdkInstance.middleware.cache.hDel(
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

  hGetAll(hash: string): Promise<CacheHgetAllResp> {
    return new Promise((resolve, reject) => {
      const request = new HGetAllRequest()
      request.setHash(hash)
      grpcSdkInstance.middleware.cache.hGetAll(
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
