// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var config_config_pb = require('../config/config_pb.js');

function serialize_config_ConfigGetRequest(arg) {
  if (!(arg instanceof config_config_pb.ConfigGetRequest)) {
    throw new Error('Expected argument of type config.ConfigGetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_config_ConfigGetRequest(buffer_arg) {
  return config_config_pb.ConfigGetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_config_ConfigSetRequest(arg) {
  if (!(arg instanceof config_config_pb.ConfigSetRequest)) {
    throw new Error('Expected argument of type config.ConfigSetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_config_ConfigSetRequest(buffer_arg) {
  return config_config_pb.ConfigSetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_config_JsonResponse(arg) {
  if (!(arg instanceof config_config_pb.JsonResponse)) {
    throw new Error('Expected argument of type config.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_config_JsonResponse(buffer_arg) {
  return config_config_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义 config RPC 服务接口 
var ConfigServiceService = exports.ConfigServiceService = {
  put: {
    path: '/config.ConfigService/put',
    requestStream: false,
    responseStream: false,
    requestType: config_config_pb.ConfigSetRequest,
    responseType: config_config_pb.JsonResponse,
    requestSerialize: serialize_config_ConfigSetRequest,
    requestDeserialize: deserialize_config_ConfigSetRequest,
    responseSerialize: serialize_config_JsonResponse,
    responseDeserialize: deserialize_config_JsonResponse,
  },
  get: {
    path: '/config.ConfigService/get',
    requestStream: false,
    responseStream: false,
    requestType: config_config_pb.ConfigGetRequest,
    responseType: config_config_pb.JsonResponse,
    requestSerialize: serialize_config_ConfigGetRequest,
    requestDeserialize: deserialize_config_ConfigGetRequest,
    responseSerialize: serialize_config_JsonResponse,
    responseDeserialize: deserialize_config_JsonResponse,
  },
};

exports.ConfigServiceClient = grpc.makeGenericClientConstructor(ConfigServiceService);
