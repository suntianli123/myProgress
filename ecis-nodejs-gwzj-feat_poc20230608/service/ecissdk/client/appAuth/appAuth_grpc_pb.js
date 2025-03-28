// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var appAuth_appAuth_pb = require('../appAuth/appAuth_pb.js');

function serialize_appAuth_AuthRequest(arg) {
  if (!(arg instanceof appAuth_appAuth_pb.AuthRequest)) {
    throw new Error('Expected argument of type appAuth.AuthRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appAuth_AuthRequest(buffer_arg) {
  return appAuth_appAuth_pb.AuthRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appAuth_AuthResponse(arg) {
  if (!(arg instanceof appAuth_appAuth_pb.AuthResponse)) {
    throw new Error('Expected argument of type appAuth.AuthResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appAuth_AuthResponse(buffer_arg) {
  return appAuth_appAuth_pb.AuthResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义app授权RPC服务接口 
var AppAuthServiceService = exports.AppAuthServiceService = {
  auth: {
    path: '/appAuth.AppAuthService/auth',
    requestStream: false,
    responseStream: false,
    requestType: appAuth_appAuth_pb.AuthRequest,
    responseType: appAuth_appAuth_pb.AuthResponse,
    requestSerialize: serialize_appAuth_AuthRequest,
    requestDeserialize: deserialize_appAuth_AuthRequest,
    responseSerialize: serialize_appAuth_AuthResponse,
    responseDeserialize: deserialize_appAuth_AuthResponse,
  },
};

exports.AppAuthServiceClient = grpc.makeGenericClientConstructor(AppAuthServiceService);
