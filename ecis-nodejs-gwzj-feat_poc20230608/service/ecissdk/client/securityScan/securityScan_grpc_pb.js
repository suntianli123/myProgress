// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var securityScan_pb = require('./securityScan_pb.js');

function serialize_securityScan_GetFileDownloadRequest(arg) {
  if (!(arg instanceof securityScan_pb.GetFileDownloadRequest)) {
    throw new Error('Expected argument of type securityScan.GetFileDownloadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_securityScan_GetFileDownloadRequest(buffer_arg) {
  return securityScan_pb.GetFileDownloadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_securityScan_GetFileHistoryDownloadRequest(arg) {
  if (!(arg instanceof securityScan_pb.GetFileHistoryDownloadRequest)) {
    throw new Error('Expected argument of type securityScan.GetFileHistoryDownloadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_securityScan_GetFileHistoryDownloadRequest(buffer_arg) {
  return securityScan_pb.GetFileHistoryDownloadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_securityScan_GetFileHistoryRequest(arg) {
  if (!(arg instanceof securityScan_pb.GetFileHistoryRequest)) {
    throw new Error('Expected argument of type securityScan.GetFileHistoryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_securityScan_GetFileHistoryRequest(buffer_arg) {
  return securityScan_pb.GetFileHistoryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_securityScan_JsonResponse(arg) {
  if (!(arg instanceof securityScan_pb.JsonResponse)) {
    throw new Error('Expected argument of type securityScan.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_securityScan_JsonResponse(buffer_arg) {
  return securityScan_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_securityScan_ScanEngineCallBackRequest(arg) {
  if (!(arg instanceof securityScan_pb.ScanEngineCallBackRequest)) {
    throw new Error('Expected argument of type securityScan.ScanEngineCallBackRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_securityScan_ScanEngineCallBackRequest(buffer_arg) {
  return securityScan_pb.ScanEngineCallBackRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_securityScan_ScanEngineHeartBeatRequest(arg) {
  if (!(arg instanceof securityScan_pb.ScanEngineHeartBeatRequest)) {
    throw new Error('Expected argument of type securityScan.ScanEngineHeartBeatRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_securityScan_ScanEngineHeartBeatRequest(buffer_arg) {
  return securityScan_pb.ScanEngineHeartBeatRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义 SecurityScan RPC 服务接口 
var SecurityScanServiceService = exports.SecurityScanServiceService = {
  scanEngineHeartBeat: {
    path: '/securityScan.SecurityScanService/scanEngineHeartBeat',
    requestStream: false,
    responseStream: false,
    requestType: securityScan_pb.ScanEngineHeartBeatRequest,
    responseType: securityScan_pb.JsonResponse,
    requestSerialize: serialize_securityScan_ScanEngineHeartBeatRequest,
    requestDeserialize: deserialize_securityScan_ScanEngineHeartBeatRequest,
    responseSerialize: serialize_securityScan_JsonResponse,
    responseDeserialize: deserialize_securityScan_JsonResponse,
  },
  scanEngineCallBack: {
    path: '/securityScan.SecurityScanService/scanEngineCallBack',
    requestStream: false,
    responseStream: false,
    requestType: securityScan_pb.ScanEngineCallBackRequest,
    responseType: securityScan_pb.JsonResponse,
    requestSerialize: serialize_securityScan_ScanEngineCallBackRequest,
    requestDeserialize: deserialize_securityScan_ScanEngineCallBackRequest,
    responseSerialize: serialize_securityScan_JsonResponse,
    responseDeserialize: deserialize_securityScan_JsonResponse,
  },
  getFileDownload: {
    path: '/securityScan.SecurityScanService/getFileDownload',
    requestStream: false,
    responseStream: false,
    requestType: securityScan_pb.GetFileDownloadRequest,
    responseType: securityScan_pb.JsonResponse,
    requestSerialize: serialize_securityScan_GetFileDownloadRequest,
    requestDeserialize: deserialize_securityScan_GetFileDownloadRequest,
    responseSerialize: serialize_securityScan_JsonResponse,
    responseDeserialize: deserialize_securityScan_JsonResponse,
  },
  getFileHistoryDownload: {
    path: '/securityScan.SecurityScanService/getFileHistoryDownload',
    requestStream: false,
    responseStream: false,
    requestType: securityScan_pb.GetFileHistoryDownloadRequest,
    responseType: securityScan_pb.JsonResponse,
    requestSerialize: serialize_securityScan_GetFileHistoryDownloadRequest,
    requestDeserialize: deserialize_securityScan_GetFileHistoryDownloadRequest,
    responseSerialize: serialize_securityScan_JsonResponse,
    responseDeserialize: deserialize_securityScan_JsonResponse,
  },
  getFileHistory: {
    path: '/securityScan.SecurityScanService/getFileHistory',
    requestStream: false,
    responseStream: false,
    requestType: securityScan_pb.GetFileHistoryRequest,
    responseType: securityScan_pb.JsonResponse,
    requestSerialize: serialize_securityScan_GetFileHistoryRequest,
    requestDeserialize: deserialize_securityScan_GetFileHistoryRequest,
    responseSerialize: serialize_securityScan_JsonResponse,
    responseDeserialize: deserialize_securityScan_JsonResponse,
  },
};

exports.SecurityScanServiceClient = grpc.makeGenericClientConstructor(SecurityScanServiceService);
