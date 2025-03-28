// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var cache_cache_pb = require('../cache/cache_pb.js');

function serialize_cache_DelRequest(arg) {
  if (!(arg instanceof cache_cache_pb.DelRequest)) {
    throw new Error('Expected argument of type cache.DelRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cache_DelRequest(buffer_arg) {
  return cache_cache_pb.DelRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cache_GetRequest(arg) {
  if (!(arg instanceof cache_cache_pb.GetRequest)) {
    throw new Error('Expected argument of type cache.GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cache_GetRequest(buffer_arg) {
  return cache_cache_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cache_HDelRequest(arg) {
  if (!(arg instanceof cache_cache_pb.HDelRequest)) {
    throw new Error('Expected argument of type cache.HDelRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cache_HDelRequest(buffer_arg) {
  return cache_cache_pb.HDelRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cache_HGetAllRequest(arg) {
  if (!(arg instanceof cache_cache_pb.HGetAllRequest)) {
    throw new Error('Expected argument of type cache.HGetAllRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cache_HGetAllRequest(buffer_arg) {
  return cache_cache_pb.HGetAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cache_HGetRequest(arg) {
  if (!(arg instanceof cache_cache_pb.HGetRequest)) {
    throw new Error('Expected argument of type cache.HGetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cache_HGetRequest(buffer_arg) {
  return cache_cache_pb.HGetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cache_HSetRequest(arg) {
  if (!(arg instanceof cache_cache_pb.HSetRequest)) {
    throw new Error('Expected argument of type cache.HSetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cache_HSetRequest(buffer_arg) {
  return cache_cache_pb.HSetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cache_JsonResponse(arg) {
  if (!(arg instanceof cache_cache_pb.JsonResponse)) {
    throw new Error('Expected argument of type cache.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cache_JsonResponse(buffer_arg) {
  return cache_cache_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cache_SetRequest(arg) {
  if (!(arg instanceof cache_cache_pb.SetRequest)) {
    throw new Error('Expected argument of type cache.SetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cache_SetRequest(buffer_arg) {
  return cache_cache_pb.SetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义 cache RPC 服务接口 
var CacheServiceService = exports.CacheServiceService = {
  set: {
    path: '/cache.CacheService/set',
    requestStream: false,
    responseStream: false,
    requestType: cache_cache_pb.SetRequest,
    responseType: cache_cache_pb.JsonResponse,
    requestSerialize: serialize_cache_SetRequest,
    requestDeserialize: deserialize_cache_SetRequest,
    responseSerialize: serialize_cache_JsonResponse,
    responseDeserialize: deserialize_cache_JsonResponse,
  },
  get: {
    path: '/cache.CacheService/get',
    requestStream: false,
    responseStream: false,
    requestType: cache_cache_pb.GetRequest,
    responseType: cache_cache_pb.JsonResponse,
    requestSerialize: serialize_cache_GetRequest,
    requestDeserialize: deserialize_cache_GetRequest,
    responseSerialize: serialize_cache_JsonResponse,
    responseDeserialize: deserialize_cache_JsonResponse,
  },
  del: {
    path: '/cache.CacheService/del',
    requestStream: false,
    responseStream: false,
    requestType: cache_cache_pb.DelRequest,
    responseType: cache_cache_pb.JsonResponse,
    requestSerialize: serialize_cache_DelRequest,
    requestDeserialize: deserialize_cache_DelRequest,
    responseSerialize: serialize_cache_JsonResponse,
    responseDeserialize: deserialize_cache_JsonResponse,
  },
  hSet: {
    path: '/cache.CacheService/hSet',
    requestStream: false,
    responseStream: false,
    requestType: cache_cache_pb.HSetRequest,
    responseType: cache_cache_pb.JsonResponse,
    requestSerialize: serialize_cache_HSetRequest,
    requestDeserialize: deserialize_cache_HSetRequest,
    responseSerialize: serialize_cache_JsonResponse,
    responseDeserialize: deserialize_cache_JsonResponse,
  },
  hGet: {
    path: '/cache.CacheService/hGet',
    requestStream: false,
    responseStream: false,
    requestType: cache_cache_pb.HGetRequest,
    responseType: cache_cache_pb.JsonResponse,
    requestSerialize: serialize_cache_HGetRequest,
    requestDeserialize: deserialize_cache_HGetRequest,
    responseSerialize: serialize_cache_JsonResponse,
    responseDeserialize: deserialize_cache_JsonResponse,
  },
  hDel: {
    path: '/cache.CacheService/hDel',
    requestStream: false,
    responseStream: false,
    requestType: cache_cache_pb.HDelRequest,
    responseType: cache_cache_pb.JsonResponse,
    requestSerialize: serialize_cache_HDelRequest,
    requestDeserialize: deserialize_cache_HDelRequest,
    responseSerialize: serialize_cache_JsonResponse,
    responseDeserialize: deserialize_cache_JsonResponse,
  },
  hGetAll: {
    path: '/cache.CacheService/hGetAll',
    requestStream: false,
    responseStream: false,
    requestType: cache_cache_pb.HGetAllRequest,
    responseType: cache_cache_pb.JsonResponse,
    requestSerialize: serialize_cache_HGetAllRequest,
    requestDeserialize: deserialize_cache_HGetAllRequest,
    responseSerialize: serialize_cache_JsonResponse,
    responseDeserialize: deserialize_cache_JsonResponse,
  },
};

exports.CacheServiceClient = grpc.makeGenericClientConstructor(CacheServiceService);
