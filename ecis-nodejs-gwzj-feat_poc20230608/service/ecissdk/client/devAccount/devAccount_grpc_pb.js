// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var devAccount_devAccount_pb = require('../devAccount/devAccount_pb.js');

function serialize_devAccount_GetUserByIdRequest(arg) {
  if (!(arg instanceof devAccount_devAccount_pb.GetUserByIdRequest)) {
    throw new Error('Expected argument of type devAccount.GetUserByIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_devAccount_GetUserByIdRequest(buffer_arg) {
  return devAccount_devAccount_pb.GetUserByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_devAccount_JsonResponse(arg) {
  if (!(arg instanceof devAccount_devAccount_pb.JsonResponse)) {
    throw new Error('Expected argument of type devAccount.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_devAccount_JsonResponse(buffer_arg) {
  return devAccount_devAccount_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义 account 开发者 RPC 服务接口 
var DevAccountServiceService = exports.DevAccountServiceService = {
  getUserById: {
    path: '/devAccount.DevAccountService/getUserById',
    requestStream: false,
    responseStream: false,
    requestType: devAccount_devAccount_pb.GetUserByIdRequest,
    responseType: devAccount_devAccount_pb.JsonResponse,
    requestSerialize: serialize_devAccount_GetUserByIdRequest,
    requestDeserialize: deserialize_devAccount_GetUserByIdRequest,
    responseSerialize: serialize_devAccount_JsonResponse,
    responseDeserialize: deserialize_devAccount_JsonResponse,
  },
};

exports.DevAccountServiceClient = grpc.makeGenericClientConstructor(DevAccountServiceService);
