// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var yunDoc_yunDoc_pb = require('../yunDoc/yunDoc_pb.js');

function serialize_yunDoc_BatchDownloadFileRequest(arg) {
  if (!(arg instanceof yunDoc_yunDoc_pb.BatchDownloadFileRequest)) {
    throw new Error('Expected argument of type yunDoc.BatchDownloadFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_yunDoc_BatchDownloadFileRequest(buffer_arg) {
  return yunDoc_yunDoc_pb.BatchDownloadFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_yunDoc_CreateFileRequest(arg) {
  if (!(arg instanceof yunDoc_yunDoc_pb.CreateFileRequest)) {
    throw new Error('Expected argument of type yunDoc.CreateFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_yunDoc_CreateFileRequest(buffer_arg) {
  return yunDoc_yunDoc_pb.CreateFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_yunDoc_CreateFilesUploadRequest(arg) {
  if (!(arg instanceof yunDoc_yunDoc_pb.CreateFilesUploadRequest)) {
    throw new Error('Expected argument of type yunDoc.CreateFilesUploadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_yunDoc_CreateFilesUploadRequest(buffer_arg) {
  return yunDoc_yunDoc_pb.CreateFilesUploadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_yunDoc_CreateFolderRequest(arg) {
  if (!(arg instanceof yunDoc_yunDoc_pb.CreateFolderRequest)) {
    throw new Error('Expected argument of type yunDoc.CreateFolderRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_yunDoc_CreateFolderRequest(buffer_arg) {
  return yunDoc_yunDoc_pb.CreateFolderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_yunDoc_DeleteFilePermissionRequest(arg) {
  if (!(arg instanceof yunDoc_yunDoc_pb.DeleteFilePermissionRequest)) {
    throw new Error('Expected argument of type yunDoc.DeleteFilePermissionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_yunDoc_DeleteFilePermissionRequest(buffer_arg) {
  return yunDoc_yunDoc_pb.DeleteFilePermissionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_yunDoc_DownloadFileRequest(arg) {
  if (!(arg instanceof yunDoc_yunDoc_pb.DownloadFileRequest)) {
    throw new Error('Expected argument of type yunDoc.DownloadFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_yunDoc_DownloadFileRequest(buffer_arg) {
  return yunDoc_yunDoc_pb.DownloadFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_yunDoc_GetFilePermissionsRequest(arg) {
  if (!(arg instanceof yunDoc_yunDoc_pb.GetFilePermissionsRequest)) {
    throw new Error('Expected argument of type yunDoc.GetFilePermissionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_yunDoc_GetFilePermissionsRequest(buffer_arg) {
  return yunDoc_yunDoc_pb.GetFilePermissionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_yunDoc_JsonResponse(arg) {
  if (!(arg instanceof yunDoc_yunDoc_pb.JsonResponse)) {
    throw new Error('Expected argument of type yunDoc.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_yunDoc_JsonResponse(buffer_arg) {
  return yunDoc_yunDoc_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_yunDoc_ListFilesRequest(arg) {
  if (!(arg instanceof yunDoc_yunDoc_pb.ListFilesRequest)) {
    throw new Error('Expected argument of type yunDoc.ListFilesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_yunDoc_ListFilesRequest(buffer_arg) {
  return yunDoc_yunDoc_pb.ListFilesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_yunDoc_UpdateFileRequest(arg) {
  if (!(arg instanceof yunDoc_yunDoc_pb.UpdateFileRequest)) {
    throw new Error('Expected argument of type yunDoc.UpdateFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_yunDoc_UpdateFileRequest(buffer_arg) {
  return yunDoc_yunDoc_pb.UpdateFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义云文档RPC服务接口 
var YunDocServiceService = exports.YunDocServiceService = {
  listFiles: {
    path: '/yunDoc.YunDocService/listFiles',
    requestStream: false,
    responseStream: false,
    requestType: yunDoc_yunDoc_pb.ListFilesRequest,
    responseType: yunDoc_yunDoc_pb.JsonResponse,
    requestSerialize: serialize_yunDoc_ListFilesRequest,
    requestDeserialize: deserialize_yunDoc_ListFilesRequest,
    responseSerialize: serialize_yunDoc_JsonResponse,
    responseDeserialize: deserialize_yunDoc_JsonResponse,
  },
  createFolder: {
    path: '/yunDoc.YunDocService/createFolder',
    requestStream: false,
    responseStream: false,
    requestType: yunDoc_yunDoc_pb.CreateFolderRequest,
    responseType: yunDoc_yunDoc_pb.JsonResponse,
    requestSerialize: serialize_yunDoc_CreateFolderRequest,
    requestDeserialize: deserialize_yunDoc_CreateFolderRequest,
    responseSerialize: serialize_yunDoc_JsonResponse,
    responseDeserialize: deserialize_yunDoc_JsonResponse,
  },
  getFilePermissions: {
    path: '/yunDoc.YunDocService/getFilePermissions',
    requestStream: false,
    responseStream: false,
    requestType: yunDoc_yunDoc_pb.GetFilePermissionsRequest,
    responseType: yunDoc_yunDoc_pb.JsonResponse,
    requestSerialize: serialize_yunDoc_GetFilePermissionsRequest,
    requestDeserialize: deserialize_yunDoc_GetFilePermissionsRequest,
    responseSerialize: serialize_yunDoc_JsonResponse,
    responseDeserialize: deserialize_yunDoc_JsonResponse,
  },
  deleteFilePermission: {
    path: '/yunDoc.YunDocService/deleteFilePermission',
    requestStream: false,
    responseStream: false,
    requestType: yunDoc_yunDoc_pb.DeleteFilePermissionRequest,
    responseType: yunDoc_yunDoc_pb.JsonResponse,
    requestSerialize: serialize_yunDoc_DeleteFilePermissionRequest,
    requestDeserialize: deserialize_yunDoc_DeleteFilePermissionRequest,
    responseSerialize: serialize_yunDoc_JsonResponse,
    responseDeserialize: deserialize_yunDoc_JsonResponse,
  },
  createFilesUpload: {
    path: '/yunDoc.YunDocService/createFilesUpload',
    requestStream: false,
    responseStream: false,
    requestType: yunDoc_yunDoc_pb.CreateFilesUploadRequest,
    responseType: yunDoc_yunDoc_pb.JsonResponse,
    requestSerialize: serialize_yunDoc_CreateFilesUploadRequest,
    requestDeserialize: deserialize_yunDoc_CreateFilesUploadRequest,
    responseSerialize: serialize_yunDoc_JsonResponse,
    responseDeserialize: deserialize_yunDoc_JsonResponse,
  },
  createFile: {
    path: '/yunDoc.YunDocService/createFile',
    requestStream: false,
    responseStream: false,
    requestType: yunDoc_yunDoc_pb.CreateFileRequest,
    responseType: yunDoc_yunDoc_pb.JsonResponse,
    requestSerialize: serialize_yunDoc_CreateFileRequest,
    requestDeserialize: deserialize_yunDoc_CreateFileRequest,
    responseSerialize: serialize_yunDoc_JsonResponse,
    responseDeserialize: deserialize_yunDoc_JsonResponse,
  },
  updateFile: {
    path: '/yunDoc.YunDocService/updateFile',
    requestStream: false,
    responseStream: false,
    requestType: yunDoc_yunDoc_pb.UpdateFileRequest,
    responseType: yunDoc_yunDoc_pb.JsonResponse,
    requestSerialize: serialize_yunDoc_UpdateFileRequest,
    requestDeserialize: deserialize_yunDoc_UpdateFileRequest,
    responseSerialize: serialize_yunDoc_JsonResponse,
    responseDeserialize: deserialize_yunDoc_JsonResponse,
  },
  downloadFile: {
    path: '/yunDoc.YunDocService/downloadFile',
    requestStream: false,
    responseStream: false,
    requestType: yunDoc_yunDoc_pb.DownloadFileRequest,
    responseType: yunDoc_yunDoc_pb.JsonResponse,
    requestSerialize: serialize_yunDoc_DownloadFileRequest,
    requestDeserialize: deserialize_yunDoc_DownloadFileRequest,
    responseSerialize: serialize_yunDoc_JsonResponse,
    responseDeserialize: deserialize_yunDoc_JsonResponse,
  },
  batchDownloadFile: {
    path: '/yunDoc.YunDocService/batchDownloadFile',
    requestStream: false,
    responseStream: false,
    requestType: yunDoc_yunDoc_pb.BatchDownloadFileRequest,
    responseType: yunDoc_yunDoc_pb.JsonResponse,
    requestSerialize: serialize_yunDoc_BatchDownloadFileRequest,
    requestDeserialize: deserialize_yunDoc_BatchDownloadFileRequest,
    responseSerialize: serialize_yunDoc_JsonResponse,
    responseDeserialize: deserialize_yunDoc_JsonResponse,
  },
};

exports.YunDocServiceClient = grpc.makeGenericClientConstructor(YunDocServiceService);
