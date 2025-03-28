// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var devWpsplus_devWpsplus_pb = require('../devWpsplus/devWpsplus_pb.js');

function serialize_devWpsplus_GetCompUsersRequest(arg) {
  if (!(arg instanceof devWpsplus_devWpsplus_pb.GetCompUsersRequest)) {
    throw new Error('Expected argument of type devWpsplus.GetCompUsersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_devWpsplus_GetCompUsersRequest(buffer_arg) {
  return devWpsplus_devWpsplus_pb.GetCompUsersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_devWpsplus_JsonResponse(arg) {
  if (!(arg instanceof devWpsplus_devWpsplus_pb.JsonResponse)) {
    throw new Error('Expected argument of type devWpsplus.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_devWpsplus_JsonResponse(buffer_arg) {
  return devWpsplus_devWpsplus_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义 plus 开发者 RPC 服务接口 
var DevWpsplusServiceService = exports.DevWpsplusServiceService = {
  getCompUsers: {
    path: '/devWpsplus.DevWpsplusService/getCompUsers',
    requestStream: false,
    responseStream: false,
    requestType: devWpsplus_devWpsplus_pb.GetCompUsersRequest,
    responseType: devWpsplus_devWpsplus_pb.JsonResponse,
    requestSerialize: serialize_devWpsplus_GetCompUsersRequest,
    requestDeserialize: deserialize_devWpsplus_GetCompUsersRequest,
    responseSerialize: serialize_devWpsplus_JsonResponse,
    responseDeserialize: deserialize_devWpsplus_JsonResponse,
  },
};

exports.DevWpsplusServiceClient = grpc.makeGenericClientConstructor(DevWpsplusServiceService);
