// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var etcd_etcd_pb = require('../etcd/etcd_pb.js');

function serialize_etcd_DelRequest(arg) {
  if (!(arg instanceof etcd_etcd_pb.DelRequest)) {
    throw new Error('Expected argument of type etcd.DelRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_etcd_DelRequest(buffer_arg) {
  return etcd_etcd_pb.DelRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_etcd_GetAllRequest(arg) {
  if (!(arg instanceof etcd_etcd_pb.GetAllRequest)) {
    throw new Error('Expected argument of type etcd.GetAllRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_etcd_GetAllRequest(buffer_arg) {
  return etcd_etcd_pb.GetAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_etcd_GetRequest(arg) {
  if (!(arg instanceof etcd_etcd_pb.GetRequest)) {
    throw new Error('Expected argument of type etcd.GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_etcd_GetRequest(buffer_arg) {
  return etcd_etcd_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_etcd_JsonResponse(arg) {
  if (!(arg instanceof etcd_etcd_pb.JsonResponse)) {
    throw new Error('Expected argument of type etcd.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_etcd_JsonResponse(buffer_arg) {
  return etcd_etcd_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_etcd_LockRequest(arg) {
  if (!(arg instanceof etcd_etcd_pb.LockRequest)) {
    throw new Error('Expected argument of type etcd.LockRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_etcd_LockRequest(buffer_arg) {
  return etcd_etcd_pb.LockRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_etcd_ReleaseRequest(arg) {
  if (!(arg instanceof etcd_etcd_pb.ReleaseRequest)) {
    throw new Error('Expected argument of type etcd.ReleaseRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_etcd_ReleaseRequest(buffer_arg) {
  return etcd_etcd_pb.ReleaseRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_etcd_SetRequest(arg) {
  if (!(arg instanceof etcd_etcd_pb.SetRequest)) {
    throw new Error('Expected argument of type etcd.SetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_etcd_SetRequest(buffer_arg) {
  return etcd_etcd_pb.SetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义 etcd RPC 服务接口 
var EtcdServiceService = exports.EtcdServiceService = {
  put: {
    path: '/etcd.EtcdService/put',
    requestStream: false,
    responseStream: false,
    requestType: etcd_etcd_pb.SetRequest,
    responseType: etcd_etcd_pb.JsonResponse,
    requestSerialize: serialize_etcd_SetRequest,
    requestDeserialize: deserialize_etcd_SetRequest,
    responseSerialize: serialize_etcd_JsonResponse,
    responseDeserialize: deserialize_etcd_JsonResponse,
  },
  get: {
    path: '/etcd.EtcdService/get',
    requestStream: false,
    responseStream: false,
    requestType: etcd_etcd_pb.GetRequest,
    responseType: etcd_etcd_pb.JsonResponse,
    requestSerialize: serialize_etcd_GetRequest,
    requestDeserialize: deserialize_etcd_GetRequest,
    responseSerialize: serialize_etcd_JsonResponse,
    responseDeserialize: deserialize_etcd_JsonResponse,
  },
  delete: {
    path: '/etcd.EtcdService/delete',
    requestStream: false,
    responseStream: false,
    requestType: etcd_etcd_pb.DelRequest,
    responseType: etcd_etcd_pb.JsonResponse,
    requestSerialize: serialize_etcd_DelRequest,
    requestDeserialize: deserialize_etcd_DelRequest,
    responseSerialize: serialize_etcd_JsonResponse,
    responseDeserialize: deserialize_etcd_JsonResponse,
  },
  lock: {
    path: '/etcd.EtcdService/lock',
    requestStream: false,
    responseStream: false,
    requestType: etcd_etcd_pb.LockRequest,
    responseType: etcd_etcd_pb.JsonResponse,
    requestSerialize: serialize_etcd_LockRequest,
    requestDeserialize: deserialize_etcd_LockRequest,
    responseSerialize: serialize_etcd_JsonResponse,
    responseDeserialize: deserialize_etcd_JsonResponse,
  },
  release: {
    path: '/etcd.EtcdService/release',
    requestStream: false,
    responseStream: false,
    requestType: etcd_etcd_pb.ReleaseRequest,
    responseType: etcd_etcd_pb.JsonResponse,
    requestSerialize: serialize_etcd_ReleaseRequest,
    requestDeserialize: deserialize_etcd_ReleaseRequest,
    responseSerialize: serialize_etcd_JsonResponse,
    responseDeserialize: deserialize_etcd_JsonResponse,
  },
  getAll: {
    path: '/etcd.EtcdService/getAll',
    requestStream: false,
    responseStream: false,
    requestType: etcd_etcd_pb.GetAllRequest,
    responseType: etcd_etcd_pb.JsonResponse,
    requestSerialize: serialize_etcd_GetAllRequest,
    requestDeserialize: deserialize_etcd_GetAllRequest,
    responseSerialize: serialize_etcd_JsonResponse,
    responseDeserialize: deserialize_etcd_JsonResponse,
  },
};

exports.EtcdServiceClient = grpc.makeGenericClientConstructor(EtcdServiceService);
