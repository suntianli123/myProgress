// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var fileDecrypt_fileDecrypt_pb = require('../fileDecrypt/fileDecrypt_pb.js');

function serialize_fileDecrypt_ClearHistoryFileRequest(arg) {
  if (!(arg instanceof fileDecrypt_fileDecrypt_pb.ClearHistoryFileRequest)) {
    throw new Error('Expected argument of type fileDecrypt.ClearHistoryFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileDecrypt_ClearHistoryFileRequest(buffer_arg) {
  return fileDecrypt_fileDecrypt_pb.ClearHistoryFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileDecrypt_DecryptFileRequest(arg) {
  if (!(arg instanceof fileDecrypt_fileDecrypt_pb.DecryptFileRequest)) {
    throw new Error('Expected argument of type fileDecrypt.DecryptFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileDecrypt_DecryptFileRequest(buffer_arg) {
  return fileDecrypt_fileDecrypt_pb.DecryptFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileDecrypt_ExistDecryptFileRequest(arg) {
  if (!(arg instanceof fileDecrypt_fileDecrypt_pb.ExistDecryptFileRequest)) {
    throw new Error('Expected argument of type fileDecrypt.ExistDecryptFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileDecrypt_ExistDecryptFileRequest(buffer_arg) {
  return fileDecrypt_fileDecrypt_pb.ExistDecryptFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileDecrypt_JsonResponse(arg) {
  if (!(arg instanceof fileDecrypt_fileDecrypt_pb.JsonResponse)) {
    throw new Error('Expected argument of type fileDecrypt.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileDecrypt_JsonResponse(buffer_arg) {
  return fileDecrypt_fileDecrypt_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileDecrypt_PreUploadFileRequest(arg) {
  if (!(arg instanceof fileDecrypt_fileDecrypt_pb.PreUploadFileRequest)) {
    throw new Error('Expected argument of type fileDecrypt.PreUploadFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileDecrypt_PreUploadFileRequest(buffer_arg) {
  return fileDecrypt_fileDecrypt_pb.PreUploadFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义全局路由服务接口 
var FileDecryptServiceService = exports.FileDecryptServiceService = {
  existDecryptFile: {
    path: '/fileDecrypt.FileDecryptService/existDecryptFile',
    requestStream: false,
    responseStream: false,
    requestType: fileDecrypt_fileDecrypt_pb.ExistDecryptFileRequest,
    responseType: fileDecrypt_fileDecrypt_pb.JsonResponse,
    requestSerialize: serialize_fileDecrypt_ExistDecryptFileRequest,
    requestDeserialize: deserialize_fileDecrypt_ExistDecryptFileRequest,
    responseSerialize: serialize_fileDecrypt_JsonResponse,
    responseDeserialize: deserialize_fileDecrypt_JsonResponse,
  },
  decryptFile: {
    path: '/fileDecrypt.FileDecryptService/decryptFile',
    requestStream: false,
    responseStream: false,
    requestType: fileDecrypt_fileDecrypt_pb.DecryptFileRequest,
    responseType: fileDecrypt_fileDecrypt_pb.JsonResponse,
    requestSerialize: serialize_fileDecrypt_DecryptFileRequest,
    requestDeserialize: deserialize_fileDecrypt_DecryptFileRequest,
    responseSerialize: serialize_fileDecrypt_JsonResponse,
    responseDeserialize: deserialize_fileDecrypt_JsonResponse,
  },
  clearHistoryFile: {
    path: '/fileDecrypt.FileDecryptService/clearHistoryFile',
    requestStream: false,
    responseStream: false,
    requestType: fileDecrypt_fileDecrypt_pb.ClearHistoryFileRequest,
    responseType: fileDecrypt_fileDecrypt_pb.JsonResponse,
    requestSerialize: serialize_fileDecrypt_ClearHistoryFileRequest,
    requestDeserialize: deserialize_fileDecrypt_ClearHistoryFileRequest,
    responseSerialize: serialize_fileDecrypt_JsonResponse,
    responseDeserialize: deserialize_fileDecrypt_JsonResponse,
  },
  preUploadFile: {
    path: '/fileDecrypt.FileDecryptService/preUploadFile',
    requestStream: false,
    responseStream: false,
    requestType: fileDecrypt_fileDecrypt_pb.PreUploadFileRequest,
    responseType: fileDecrypt_fileDecrypt_pb.JsonResponse,
    requestSerialize: serialize_fileDecrypt_PreUploadFileRequest,
    requestDeserialize: deserialize_fileDecrypt_PreUploadFileRequest,
    responseSerialize: serialize_fileDecrypt_JsonResponse,
    responseDeserialize: deserialize_fileDecrypt_JsonResponse,
  },
};

exports.FileDecryptServiceClient = grpc.makeGenericClientConstructor(FileDecryptServiceService);
