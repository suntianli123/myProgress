// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var pocket_pb = require('./pocket_pb.js');

function serialize_pocket_CommonResponse(arg) {
  if (!(arg instanceof pocket_pb.CommonResponse)) {
    throw new Error('Expected argument of type pocket.CommonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pocket_CommonResponse(buffer_arg) {
  return pocket_pb.CommonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pocket_GetFileDownloadUrlRequest(arg) {
  if (!(arg instanceof pocket_pb.GetFileDownloadUrlRequest)) {
    throw new Error('Expected argument of type pocket.GetFileDownloadUrlRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pocket_GetFileDownloadUrlRequest(buffer_arg) {
  return pocket_pb.GetFileDownloadUrlRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pocket_GetFileDownloadUrlResponse(arg) {
  if (!(arg instanceof pocket_pb.GetFileDownloadUrlResponse)) {
    throw new Error('Expected argument of type pocket.GetFileDownloadUrlResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pocket_GetFileDownloadUrlResponse(buffer_arg) {
  return pocket_pb.GetFileDownloadUrlResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pocket_NullRequest(arg) {
  if (!(arg instanceof pocket_pb.NullRequest)) {
    throw new Error('Expected argument of type pocket.NullRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pocket_NullRequest(buffer_arg) {
  return pocket_pb.NullRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pocket_UpdateProfileRequest(arg) {
  if (!(arg instanceof pocket_pb.UpdateProfileRequest)) {
    throw new Error('Expected argument of type pocket.UpdateProfileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pocket_UpdateProfileRequest(buffer_arg) {
  return pocket_pb.UpdateProfileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pocket_UploadFileRequest(arg) {
  if (!(arg instanceof pocket_pb.UploadFileRequest)) {
    throw new Error('Expected argument of type pocket.UploadFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pocket_UploadFileRequest(buffer_arg) {
  return pocket_pb.UploadFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pocket_UploadFileResponse(arg) {
  if (!(arg instanceof pocket_pb.UploadFileResponse)) {
    throw new Error('Expected argument of type pocket.UploadFileResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pocket_UploadFileResponse(buffer_arg) {
  return pocket_pb.UploadFileResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义 fileScan RPC 服务接口 
var PocketServiceService = exports.PocketServiceService = {
  getProfile: {
    path: '/pocket.PocketService/getProfile',
    requestStream: false,
    responseStream: false,
    requestType: pocket_pb.NullRequest,
    responseType: pocket_pb.CommonResponse,
    requestSerialize: serialize_pocket_NullRequest,
    requestDeserialize: deserialize_pocket_NullRequest,
    responseSerialize: serialize_pocket_CommonResponse,
    responseDeserialize: deserialize_pocket_CommonResponse,
  },
  updateProfile: {
    path: '/pocket.PocketService/updateProfile',
    requestStream: false,
    responseStream: false,
    requestType: pocket_pb.UpdateProfileRequest,
    responseType: pocket_pb.CommonResponse,
    requestSerialize: serialize_pocket_UpdateProfileRequest,
    requestDeserialize: deserialize_pocket_UpdateProfileRequest,
    responseSerialize: serialize_pocket_CommonResponse,
    responseDeserialize: deserialize_pocket_CommonResponse,
  },
  getFileDownloadUrl: {
    path: '/pocket.PocketService/getFileDownloadUrl',
    requestStream: false,
    responseStream: false,
    requestType: pocket_pb.GetFileDownloadUrlRequest,
    responseType: pocket_pb.GetFileDownloadUrlResponse,
    requestSerialize: serialize_pocket_GetFileDownloadUrlRequest,
    requestDeserialize: deserialize_pocket_GetFileDownloadUrlRequest,
    responseSerialize: serialize_pocket_GetFileDownloadUrlResponse,
    responseDeserialize: deserialize_pocket_GetFileDownloadUrlResponse,
  },
  uploadFile: {
    path: '/pocket.PocketService/uploadFile',
    requestStream: false,
    responseStream: false,
    requestType: pocket_pb.UploadFileRequest,
    responseType: pocket_pb.UploadFileResponse,
    requestSerialize: serialize_pocket_UploadFileRequest,
    requestDeserialize: deserialize_pocket_UploadFileRequest,
    responseSerialize: serialize_pocket_UploadFileResponse,
    responseDeserialize: deserialize_pocket_UploadFileResponse,
  },
};

exports.PocketServiceClient = grpc.makeGenericClientConstructor(PocketServiceService);
