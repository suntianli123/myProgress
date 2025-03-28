// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var wpsopen_wpsopen_pb = require('../wpsopen/wpsopen_pb.js');

function serialize_wpsopen_GetFileInfoRequest(arg) {
  if (!(arg instanceof wpsopen_wpsopen_pb.GetFileInfoRequest)) {
    throw new Error('Expected argument of type wpsopen.GetFileInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wpsopen_GetFileInfoRequest(buffer_arg) {
  return wpsopen_wpsopen_pb.GetFileInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wpsopen_GetIdConfuseRequest(arg) {
  if (!(arg instanceof wpsopen_wpsopen_pb.GetIdConfuseRequest)) {
    throw new Error('Expected argument of type wpsopen.GetIdConfuseRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wpsopen_GetIdConfuseRequest(buffer_arg) {
  return wpsopen_wpsopen_pb.GetIdConfuseRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wpsopen_GetPreviewInnerFileInfoRequest(arg) {
  if (!(arg instanceof wpsopen_wpsopen_pb.GetPreviewInnerFileInfoRequest)) {
    throw new Error('Expected argument of type wpsopen.GetPreviewInnerFileInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wpsopen_GetPreviewInnerFileInfoRequest(buffer_arg) {
  return wpsopen_wpsopen_pb.GetPreviewInnerFileInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wpsopen_GetSaveFileUrlRequest(arg) {
  if (!(arg instanceof wpsopen_wpsopen_pb.GetSaveFileUrlRequest)) {
    throw new Error('Expected argument of type wpsopen.GetSaveFileUrlRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wpsopen_GetSaveFileUrlRequest(buffer_arg) {
  return wpsopen_wpsopen_pb.GetSaveFileUrlRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wpsopen_JsonResponse(arg) {
  if (!(arg instanceof wpsopen_wpsopen_pb.JsonResponse)) {
    throw new Error('Expected argument of type wpsopen.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wpsopen_JsonResponse(buffer_arg) {
  return wpsopen_wpsopen_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var WpsopenServiceService = exports.WpsopenServiceService = {
  getIdConfuse: {
    path: '/wpsopen.WpsopenService/getIdConfuse',
    requestStream: false,
    responseStream: false,
    requestType: wpsopen_wpsopen_pb.GetIdConfuseRequest,
    responseType: wpsopen_wpsopen_pb.JsonResponse,
    requestSerialize: serialize_wpsopen_GetIdConfuseRequest,
    requestDeserialize: deserialize_wpsopen_GetIdConfuseRequest,
    responseSerialize: serialize_wpsopen_JsonResponse,
    responseDeserialize: deserialize_wpsopen_JsonResponse,
  },
  getFileInfo: {
    path: '/wpsopen.WpsopenService/getFileInfo',
    requestStream: false,
    responseStream: false,
    requestType: wpsopen_wpsopen_pb.GetFileInfoRequest,
    responseType: wpsopen_wpsopen_pb.JsonResponse,
    requestSerialize: serialize_wpsopen_GetFileInfoRequest,
    requestDeserialize: deserialize_wpsopen_GetFileInfoRequest,
    responseSerialize: serialize_wpsopen_JsonResponse,
    responseDeserialize: deserialize_wpsopen_JsonResponse,
  },
  getPreviewInnerFileInfo: {
    path: '/wpsopen.WpsopenService/getPreviewInnerFileInfo',
    requestStream: false,
    responseStream: false,
    requestType: wpsopen_wpsopen_pb.GetPreviewInnerFileInfoRequest,
    responseType: wpsopen_wpsopen_pb.JsonResponse,
    requestSerialize: serialize_wpsopen_GetPreviewInnerFileInfoRequest,
    requestDeserialize: deserialize_wpsopen_GetPreviewInnerFileInfoRequest,
    responseSerialize: serialize_wpsopen_JsonResponse,
    responseDeserialize: deserialize_wpsopen_JsonResponse,
  },
  getSaveFileUrl: {
    path: '/wpsopen.WpsopenService/getSaveFileUrl',
    requestStream: false,
    responseStream: false,
    requestType: wpsopen_wpsopen_pb.GetSaveFileUrlRequest,
    responseType: wpsopen_wpsopen_pb.JsonResponse,
    requestSerialize: serialize_wpsopen_GetSaveFileUrlRequest,
    requestDeserialize: deserialize_wpsopen_GetSaveFileUrlRequest,
    responseSerialize: serialize_wpsopen_JsonResponse,
    responseDeserialize: deserialize_wpsopen_JsonResponse,
  },
};

exports.WpsopenServiceClient = grpc.makeGenericClientConstructor(WpsopenServiceService);
