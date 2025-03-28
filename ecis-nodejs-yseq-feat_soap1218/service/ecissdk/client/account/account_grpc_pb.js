// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var account_account_pb = require('../account/account_pb.js');

function serialize_account_GetUserBySidRequest(arg) {
  if (!(arg instanceof account_account_pb.GetUserBySidRequest)) {
    throw new Error('Expected argument of type account.GetUserBySidRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_account_GetUserBySidRequest(buffer_arg) {
  return account_account_pb.GetUserBySidRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_account_IsLoginRequest(arg) {
  if (!(arg instanceof account_account_pb.IsLoginRequest)) {
    throw new Error('Expected argument of type account.IsLoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_account_IsLoginRequest(buffer_arg) {
  return account_account_pb.IsLoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_account_JsonResponse(arg) {
  if (!(arg instanceof account_account_pb.JsonResponse)) {
    throw new Error('Expected argument of type account.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_account_JsonResponse(buffer_arg) {
  return account_account_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义 account RPC 服务接口 
var AccountServiceService = exports.AccountServiceService = {
  isLogin: {
    path: '/account.AccountService/isLogin',
    requestStream: false,
    responseStream: false,
    requestType: account_account_pb.IsLoginRequest,
    responseType: account_account_pb.JsonResponse,
    requestSerialize: serialize_account_IsLoginRequest,
    requestDeserialize: deserialize_account_IsLoginRequest,
    responseSerialize: serialize_account_JsonResponse,
    responseDeserialize: deserialize_account_JsonResponse,
  },
  getUserBySid: {
    path: '/account.AccountService/getUserBySid',
    requestStream: false,
    responseStream: false,
    requestType: account_account_pb.GetUserBySidRequest,
    responseType: account_account_pb.JsonResponse,
    requestSerialize: serialize_account_GetUserBySidRequest,
    requestDeserialize: deserialize_account_GetUserBySidRequest,
    responseSerialize: serialize_account_JsonResponse,
    responseDeserialize: deserialize_account_JsonResponse,
  },
};

exports.AccountServiceClient = grpc.makeGenericClientConstructor(AccountServiceService);
