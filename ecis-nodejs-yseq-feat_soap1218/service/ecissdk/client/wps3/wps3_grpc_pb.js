// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var wps3_wps3_pb = require('../wps3/wps3_pb.js');

function serialize_wps3_DownloadRequest(arg) {
  if (!(arg instanceof wps3_wps3_pb.DownloadRequest)) {
    throw new Error('Expected argument of type wps3.DownloadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wps3_DownloadRequest(buffer_arg) {
  return wps3_wps3_pb.DownloadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wps3_JsonResponse(arg) {
  if (!(arg instanceof wps3_wps3_pb.JsonResponse)) {
    throw new Error('Expected argument of type wps3.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wps3_JsonResponse(buffer_arg) {
  return wps3_wps3_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wps3_UploadRequest(arg) {
  if (!(arg instanceof wps3_wps3_pb.UploadRequest)) {
    throw new Error('Expected argument of type wps3.UploadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wps3_UploadRequest(buffer_arg) {
  return wps3_wps3_pb.UploadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义 wps3 RPC 服务接口 
var Wps3ServiceService = exports.Wps3ServiceService = {
  upload: {
    path: '/wps3.Wps3Service/upload',
    requestStream: false,
    responseStream: false,
    requestType: wps3_wps3_pb.UploadRequest,
    responseType: wps3_wps3_pb.JsonResponse,
    requestSerialize: serialize_wps3_UploadRequest,
    requestDeserialize: deserialize_wps3_UploadRequest,
    responseSerialize: serialize_wps3_JsonResponse,
    responseDeserialize: deserialize_wps3_JsonResponse,
  },
  download: {
    path: '/wps3.Wps3Service/download',
    requestStream: false,
    responseStream: false,
    requestType: wps3_wps3_pb.DownloadRequest,
    responseType: wps3_wps3_pb.JsonResponse,
    requestSerialize: serialize_wps3_DownloadRequest,
    requestDeserialize: deserialize_wps3_DownloadRequest,
    responseSerialize: serialize_wps3_JsonResponse,
    responseDeserialize: deserialize_wps3_JsonResponse,
  },
};

exports.Wps3ServiceClient = grpc.makeGenericClientConstructor(Wps3ServiceService);
