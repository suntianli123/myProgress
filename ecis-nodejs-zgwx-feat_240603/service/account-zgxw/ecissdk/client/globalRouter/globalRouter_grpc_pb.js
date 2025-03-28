// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var globalRouter_globalRouter_pb = require('../globalRouter/globalRouter_pb.js');

function serialize_globalRouter_BindRouteRequest(arg) {
  if (!(arg instanceof globalRouter_globalRouter_pb.BindRouteRequest)) {
    throw new Error('Expected argument of type globalRouter.BindRouteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_globalRouter_BindRouteRequest(buffer_arg) {
  return globalRouter_globalRouter_pb.BindRouteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_globalRouter_JsonResponse(arg) {
  if (!(arg instanceof globalRouter_globalRouter_pb.JsonResponse)) {
    throw new Error('Expected argument of type globalRouter.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_globalRouter_JsonResponse(buffer_arg) {
  return globalRouter_globalRouter_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义全局路由服务接口 
var GlobalRouterServiceService = exports.GlobalRouterServiceService = {
  bindRoute: {
    path: '/globalRouter.GlobalRouterService/bindRoute',
    requestStream: false,
    responseStream: false,
    requestType: globalRouter_globalRouter_pb.BindRouteRequest,
    responseType: globalRouter_globalRouter_pb.JsonResponse,
    requestSerialize: serialize_globalRouter_BindRouteRequest,
    requestDeserialize: deserialize_globalRouter_BindRouteRequest,
    responseSerialize: serialize_globalRouter_JsonResponse,
    responseDeserialize: deserialize_globalRouter_JsonResponse,
  },
};

exports.GlobalRouterServiceClient = grpc.makeGenericClientConstructor(GlobalRouterServiceService);
