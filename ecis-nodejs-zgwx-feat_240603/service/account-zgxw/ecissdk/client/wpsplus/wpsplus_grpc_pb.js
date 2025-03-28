// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var wpsplus_wpsplus_pb = require('../wpsplus/wpsplus_pb.js');

function serialize_wpsplus_GetDeptUsersRequest(arg) {
  if (!(arg instanceof wpsplus_wpsplus_pb.GetDeptUsersRequest)) {
    throw new Error('Expected argument of type wpsplus.GetDeptUsersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wpsplus_GetDeptUsersRequest(buffer_arg) {
  return wpsplus_wpsplus_pb.GetDeptUsersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wpsplus_JsonResponse(arg) {
  if (!(arg instanceof wpsplus_wpsplus_pb.JsonResponse)) {
    throw new Error('Expected argument of type wpsplus.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wpsplus_JsonResponse(buffer_arg) {
  return wpsplus_wpsplus_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var WpsplusServiceService = exports.WpsplusServiceService = {
  getDeptUsers: {
    path: '/wpsplus.WpsplusService/getDeptUsers',
    requestStream: false,
    responseStream: false,
    requestType: wpsplus_wpsplus_pb.GetDeptUsersRequest,
    responseType: wpsplus_wpsplus_pb.JsonResponse,
    requestSerialize: serialize_wpsplus_GetDeptUsersRequest,
    requestDeserialize: deserialize_wpsplus_GetDeptUsersRequest,
    responseSerialize: serialize_wpsplus_JsonResponse,
    responseDeserialize: deserialize_wpsplus_JsonResponse,
  },
};

exports.WpsplusServiceClient = grpc.makeGenericClientConstructor(WpsplusServiceService);
