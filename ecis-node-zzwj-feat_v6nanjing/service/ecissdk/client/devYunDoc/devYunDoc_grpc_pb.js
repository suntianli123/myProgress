// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var devYunDoc_devYunDoc_pb = require('../devYunDoc/devYunDoc_pb.js');

function serialize_devYunDoc_CreateFileRequest(arg) {
  if (!(arg instanceof devYunDoc_devYunDoc_pb.CreateFileRequest)) {
    throw new Error('Expected argument of type devYunDoc.CreateFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_devYunDoc_CreateFileRequest(buffer_arg) {
  return devYunDoc_devYunDoc_pb.CreateFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_devYunDoc_CreateFilesUploadRequest(arg) {
  if (!(arg instanceof devYunDoc_devYunDoc_pb.CreateFilesUploadRequest)) {
    throw new Error('Expected argument of type devYunDoc.CreateFilesUploadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_devYunDoc_CreateFilesUploadRequest(buffer_arg) {
  return devYunDoc_devYunDoc_pb.CreateFilesUploadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_devYunDoc_DownloadFileRequest(arg) {
  if (!(arg instanceof devYunDoc_devYunDoc_pb.DownloadFileRequest)) {
    throw new Error('Expected argument of type devYunDoc.DownloadFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_devYunDoc_DownloadFileRequest(buffer_arg) {
  return devYunDoc_devYunDoc_pb.DownloadFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_devYunDoc_JsonResponse(arg) {
  if (!(arg instanceof devYunDoc_devYunDoc_pb.JsonResponse)) {
    throw new Error('Expected argument of type devYunDoc.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_devYunDoc_JsonResponse(buffer_arg) {
  return devYunDoc_devYunDoc_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义云文档开发者RPC服务接口 
var DevYunDocServiceService = exports.DevYunDocServiceService = {
  createFilesUpload: {
    path: '/devYunDoc.DevYunDocService/createFilesUpload',
    requestStream: false,
    responseStream: false,
    requestType: devYunDoc_devYunDoc_pb.CreateFilesUploadRequest,
    responseType: devYunDoc_devYunDoc_pb.JsonResponse,
    requestSerialize: serialize_devYunDoc_CreateFilesUploadRequest,
    requestDeserialize: deserialize_devYunDoc_CreateFilesUploadRequest,
    responseSerialize: serialize_devYunDoc_JsonResponse,
    responseDeserialize: deserialize_devYunDoc_JsonResponse,
  },
  createFile: {
    path: '/devYunDoc.DevYunDocService/createFile',
    requestStream: false,
    responseStream: false,
    requestType: devYunDoc_devYunDoc_pb.CreateFileRequest,
    responseType: devYunDoc_devYunDoc_pb.JsonResponse,
    requestSerialize: serialize_devYunDoc_CreateFileRequest,
    requestDeserialize: deserialize_devYunDoc_CreateFileRequest,
    responseSerialize: serialize_devYunDoc_JsonResponse,
    responseDeserialize: deserialize_devYunDoc_JsonResponse,
  },
  downloadFile: {
    path: '/devYunDoc.DevYunDocService/downloadFile',
    requestStream: false,
    responseStream: false,
    requestType: devYunDoc_devYunDoc_pb.DownloadFileRequest,
    responseType: devYunDoc_devYunDoc_pb.JsonResponse,
    requestSerialize: serialize_devYunDoc_DownloadFileRequest,
    requestDeserialize: deserialize_devYunDoc_DownloadFileRequest,
    responseSerialize: serialize_devYunDoc_JsonResponse,
    responseDeserialize: deserialize_devYunDoc_JsonResponse,
  },
};

exports.DevYunDocServiceClient = grpc.makeGenericClientConstructor(DevYunDocServiceService);
