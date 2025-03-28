// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var fileScan_fileScan_pb = require('../fileScan/fileScan_pb.js');

function serialize_fileScan_CreateMetaTypeRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.CreateMetaTypeRequest)) {
    throw new Error('Expected argument of type fileScan.CreateMetaTypeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_CreateMetaTypeRequest(buffer_arg) {
  return fileScan_fileScan_pb.CreateMetaTypeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_CreateMetadataRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.CreateMetadataRequest)) {
    throw new Error('Expected argument of type fileScan.CreateMetadataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_CreateMetadataRequest(buffer_arg) {
  return fileScan_fileScan_pb.CreateMetadataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_CreateObjectTermsRelationRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.CreateObjectTermsRelationRequest)) {
    throw new Error('Expected argument of type fileScan.CreateObjectTermsRelationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_CreateObjectTermsRelationRequest(buffer_arg) {
  return fileScan_fileScan_pb.CreateObjectTermsRelationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_CreateTermRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.CreateTermRequest)) {
    throw new Error('Expected argument of type fileScan.CreateTermRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_CreateTermRequest(buffer_arg) {
  return fileScan_fileScan_pb.CreateTermRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_DelMetadataRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.DelMetadataRequest)) {
    throw new Error('Expected argument of type fileScan.DelMetadataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_DelMetadataRequest(buffer_arg) {
  return fileScan_fileScan_pb.DelMetadataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_DelObjectTermRelationRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.DelObjectTermRelationRequest)) {
    throw new Error('Expected argument of type fileScan.DelObjectTermRelationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_DelObjectTermRelationRequest(buffer_arg) {
  return fileScan_fileScan_pb.DelObjectTermRelationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_DownloadFileRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.DownloadFileRequest)) {
    throw new Error('Expected argument of type fileScan.DownloadFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_DownloadFileRequest(buffer_arg) {
  return fileScan_fileScan_pb.DownloadFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_DownloadFirstRecycleFileRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.DownloadFirstRecycleFileRequest)) {
    throw new Error('Expected argument of type fileScan.DownloadFirstRecycleFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_DownloadFirstRecycleFileRequest(buffer_arg) {
  return fileScan_fileScan_pb.DownloadFirstRecycleFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_DownloadHistoryFileRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.DownloadHistoryFileRequest)) {
    throw new Error('Expected argument of type fileScan.DownloadHistoryFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_DownloadHistoryFileRequest(buffer_arg) {
  return fileScan_fileScan_pb.DownloadHistoryFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_GetCorpGroupInfoRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.GetCorpGroupInfoRequest)) {
    throw new Error('Expected argument of type fileScan.GetCorpGroupInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_GetCorpGroupInfoRequest(buffer_arg) {
  return fileScan_fileScan_pb.GetCorpGroupInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_GetFileParentNamesRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.GetFileParentNamesRequest)) {
    throw new Error('Expected argument of type fileScan.GetFileParentNamesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_GetFileParentNamesRequest(buffer_arg) {
  return fileScan_fileScan_pb.GetFileParentNamesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_GetFilePathNamesRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.GetFilePathNamesRequest)) {
    throw new Error('Expected argument of type fileScan.GetFilePathNamesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_GetFilePathNamesRequest(buffer_arg) {
  return fileScan_fileScan_pb.GetFilePathNamesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_GetFilesInfoRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.GetFilesInfoRequest)) {
    throw new Error('Expected argument of type fileScan.GetFilesInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_GetFilesInfoRequest(buffer_arg) {
  return fileScan_fileScan_pb.GetFilesInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_GetObjectTermRelationRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.GetObjectTermRelationRequest)) {
    throw new Error('Expected argument of type fileScan.GetObjectTermRelationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_GetObjectTermRelationRequest(buffer_arg) {
  return fileScan_fileScan_pb.GetObjectTermRelationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_GetTermRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.GetTermRequest)) {
    throw new Error('Expected argument of type fileScan.GetTermRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_GetTermRequest(buffer_arg) {
  return fileScan_fileScan_pb.GetTermRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_JsonResponse(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.JsonResponse)) {
    throw new Error('Expected argument of type fileScan.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_JsonResponse(buffer_arg) {
  return fileScan_fileScan_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_ListFileRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.ListFileRequest)) {
    throw new Error('Expected argument of type fileScan.ListFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_ListFileRequest(buffer_arg) {
  return fileScan_fileScan_pb.ListFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_ListObjectTermsRelationRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.ListObjectTermsRelationRequest)) {
    throw new Error('Expected argument of type fileScan.ListObjectTermsRelationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_ListObjectTermsRelationRequest(buffer_arg) {
  return fileScan_fileScan_pb.ListObjectTermsRelationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fileScan_UpdateTermRequest(arg) {
  if (!(arg instanceof fileScan_fileScan_pb.UpdateTermRequest)) {
    throw new Error('Expected argument of type fileScan.UpdateTermRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fileScan_UpdateTermRequest(buffer_arg) {
  return fileScan_fileScan_pb.UpdateTermRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义 fileScan RPC 服务接口 
var FileScanServiceService = exports.FileScanServiceService = {
  getFileParentNames: {
    path: '/fileScan.FileScanService/getFileParentNames',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.GetFileParentNamesRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_GetFileParentNamesRequest,
    requestDeserialize: deserialize_fileScan_GetFileParentNamesRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  getCorpGroupInfo: {
    path: '/fileScan.FileScanService/getCorpGroupInfo',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.GetCorpGroupInfoRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_GetCorpGroupInfoRequest,
    requestDeserialize: deserialize_fileScan_GetCorpGroupInfoRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  getFilesInfo: {
    path: '/fileScan.FileScanService/getFilesInfo',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.GetFilesInfoRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_GetFilesInfoRequest,
    requestDeserialize: deserialize_fileScan_GetFilesInfoRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  getFilePathNames: {
    path: '/fileScan.FileScanService/getFilePathNames',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.GetFilePathNamesRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_GetFilePathNamesRequest,
    requestDeserialize: deserialize_fileScan_GetFilePathNamesRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  downloadFile: {
    path: '/fileScan.FileScanService/downloadFile',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.DownloadFileRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_DownloadFileRequest,
    requestDeserialize: deserialize_fileScan_DownloadFileRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  downloadFirstRecycleFile: {
    path: '/fileScan.FileScanService/downloadFirstRecycleFile',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.DownloadFirstRecycleFileRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_DownloadFirstRecycleFileRequest,
    requestDeserialize: deserialize_fileScan_DownloadFirstRecycleFileRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  downloadHistoryFile: {
    path: '/fileScan.FileScanService/downloadHistoryFile',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.DownloadHistoryFileRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_DownloadHistoryFileRequest,
    requestDeserialize: deserialize_fileScan_DownloadHistoryFileRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  createTerm: {
    path: '/fileScan.FileScanService/createTerm',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.CreateTermRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_CreateTermRequest,
    requestDeserialize: deserialize_fileScan_CreateTermRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  updateTerm: {
    path: '/fileScan.FileScanService/updateTerm',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.UpdateTermRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_UpdateTermRequest,
    requestDeserialize: deserialize_fileScan_UpdateTermRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  getTerm: {
    path: '/fileScan.FileScanService/getTerm',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.GetTermRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_GetTermRequest,
    requestDeserialize: deserialize_fileScan_GetTermRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  createObjectTermsRelation: {
    path: '/fileScan.FileScanService/createObjectTermsRelation',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.CreateObjectTermsRelationRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_CreateObjectTermsRelationRequest,
    requestDeserialize: deserialize_fileScan_CreateObjectTermsRelationRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  listObjectTermsRelation: {
    path: '/fileScan.FileScanService/listObjectTermsRelation',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.ListObjectTermsRelationRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_ListObjectTermsRelationRequest,
    requestDeserialize: deserialize_fileScan_ListObjectTermsRelationRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  getObjectTermRelation: {
    path: '/fileScan.FileScanService/getObjectTermRelation',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.GetObjectTermRelationRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_GetObjectTermRelationRequest,
    requestDeserialize: deserialize_fileScan_GetObjectTermRelationRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  delObjectTermRelation: {
    path: '/fileScan.FileScanService/delObjectTermRelation',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.DelObjectTermRelationRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_DelObjectTermRelationRequest,
    requestDeserialize: deserialize_fileScan_DelObjectTermRelationRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  createMetaType: {
    path: '/fileScan.FileScanService/createMetaType',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.CreateMetaTypeRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_CreateMetaTypeRequest,
    requestDeserialize: deserialize_fileScan_CreateMetaTypeRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  createMetadata: {
    path: '/fileScan.FileScanService/createMetadata',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.CreateMetadataRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_CreateMetadataRequest,
    requestDeserialize: deserialize_fileScan_CreateMetadataRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  delMetadata: {
    path: '/fileScan.FileScanService/delMetadata',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.DelMetadataRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_DelMetadataRequest,
    requestDeserialize: deserialize_fileScan_DelMetadataRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
  listFile: {
    path: '/fileScan.FileScanService/listFile',
    requestStream: false,
    responseStream: false,
    requestType: fileScan_fileScan_pb.ListFileRequest,
    responseType: fileScan_fileScan_pb.JsonResponse,
    requestSerialize: serialize_fileScan_ListFileRequest,
    requestDeserialize: deserialize_fileScan_ListFileRequest,
    responseSerialize: serialize_fileScan_JsonResponse,
    responseDeserialize: deserialize_fileScan_JsonResponse,
  },
};

exports.FileScanServiceClient = grpc.makeGenericClientConstructor(FileScanServiceService);
