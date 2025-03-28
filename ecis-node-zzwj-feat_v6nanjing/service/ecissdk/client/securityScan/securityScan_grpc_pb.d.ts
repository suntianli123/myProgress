// package: securityScan
// file: securityScan.proto

import * as grpc from '@grpc/grpc-js';
import * as securityScan_pb from './securityScan_pb';

interface ISecurityScanServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  scanEngineHeartBeat: ISecurityScanServiceService_IscanEngineHeartBeat;
  scanEngineCallBack: ISecurityScanServiceService_IscanEngineCallBack;
  getFileDownload: ISecurityScanServiceService_IgetFileDownload;
  getFileHistoryDownload: ISecurityScanServiceService_IgetFileHistoryDownload;
  getFileHistory: ISecurityScanServiceService_IgetFileHistory;
}

interface ISecurityScanServiceService_IscanEngineHeartBeat extends grpc.MethodDefinition<securityScan_pb.ScanEngineHeartBeatRequest, securityScan_pb.JsonResponse> {
  path: '/securityScan.SecurityScanService/scanEngineHeartBeat'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<securityScan_pb.ScanEngineHeartBeatRequest>;
  requestDeserialize: grpc.deserialize<securityScan_pb.ScanEngineHeartBeatRequest>;
  responseSerialize: grpc.serialize<securityScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<securityScan_pb.JsonResponse>;
}

interface ISecurityScanServiceService_IscanEngineCallBack extends grpc.MethodDefinition<securityScan_pb.ScanEngineCallBackRequest, securityScan_pb.JsonResponse> {
  path: '/securityScan.SecurityScanService/scanEngineCallBack'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<securityScan_pb.ScanEngineCallBackRequest>;
  requestDeserialize: grpc.deserialize<securityScan_pb.ScanEngineCallBackRequest>;
  responseSerialize: grpc.serialize<securityScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<securityScan_pb.JsonResponse>;
}

interface ISecurityScanServiceService_IgetFileDownload extends grpc.MethodDefinition<securityScan_pb.GetFileDownloadRequest, securityScan_pb.JsonResponse> {
  path: '/securityScan.SecurityScanService/getFileDownload'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<securityScan_pb.GetFileDownloadRequest>;
  requestDeserialize: grpc.deserialize<securityScan_pb.GetFileDownloadRequest>;
  responseSerialize: grpc.serialize<securityScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<securityScan_pb.JsonResponse>;
}

interface ISecurityScanServiceService_IgetFileHistoryDownload extends grpc.MethodDefinition<securityScan_pb.GetFileHistoryDownloadRequest, securityScan_pb.JsonResponse> {
  path: '/securityScan.SecurityScanService/getFileHistoryDownload'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<securityScan_pb.GetFileHistoryDownloadRequest>;
  requestDeserialize: grpc.deserialize<securityScan_pb.GetFileHistoryDownloadRequest>;
  responseSerialize: grpc.serialize<securityScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<securityScan_pb.JsonResponse>;
}

interface ISecurityScanServiceService_IgetFileHistory extends grpc.MethodDefinition<securityScan_pb.GetFileHistoryRequest, securityScan_pb.JsonResponse> {
  path: '/securityScan.SecurityScanService/getFileHistory'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<securityScan_pb.GetFileHistoryRequest>;
  requestDeserialize: grpc.deserialize<securityScan_pb.GetFileHistoryRequest>;
  responseSerialize: grpc.serialize<securityScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<securityScan_pb.JsonResponse>;
}

export const SecurityScanServiceService: ISecurityScanServiceService;
export interface ISecurityScanServiceServer extends grpc.UntypedServiceImplementation {
  scanEngineHeartBeat: grpc.handleUnaryCall<securityScan_pb.ScanEngineHeartBeatRequest, securityScan_pb.JsonResponse>;
  scanEngineCallBack: grpc.handleUnaryCall<securityScan_pb.ScanEngineCallBackRequest, securityScan_pb.JsonResponse>;
  getFileDownload: grpc.handleUnaryCall<securityScan_pb.GetFileDownloadRequest, securityScan_pb.JsonResponse>;
  getFileHistoryDownload: grpc.handleUnaryCall<securityScan_pb.GetFileHistoryDownloadRequest, securityScan_pb.JsonResponse>;
  getFileHistory: grpc.handleUnaryCall<securityScan_pb.GetFileHistoryRequest, securityScan_pb.JsonResponse>;
}

export interface ISecurityScanServiceClient {
  scanEngineHeartBeat(request: securityScan_pb.ScanEngineHeartBeatRequest, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  scanEngineHeartBeat(request: securityScan_pb.ScanEngineHeartBeatRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  scanEngineHeartBeat(request: securityScan_pb.ScanEngineHeartBeatRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  scanEngineCallBack(request: securityScan_pb.ScanEngineCallBackRequest, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  scanEngineCallBack(request: securityScan_pb.ScanEngineCallBackRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  scanEngineCallBack(request: securityScan_pb.ScanEngineCallBackRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFileDownload(request: securityScan_pb.GetFileDownloadRequest, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFileDownload(request: securityScan_pb.GetFileDownloadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFileDownload(request: securityScan_pb.GetFileDownloadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFileHistoryDownload(request: securityScan_pb.GetFileHistoryDownloadRequest, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFileHistoryDownload(request: securityScan_pb.GetFileHistoryDownloadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFileHistoryDownload(request: securityScan_pb.GetFileHistoryDownloadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFileHistory(request: securityScan_pb.GetFileHistoryRequest, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFileHistory(request: securityScan_pb.GetFileHistoryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFileHistory(request: securityScan_pb.GetFileHistoryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class SecurityScanServiceClient extends grpc.Client implements ISecurityScanServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public scanEngineHeartBeat(request: securityScan_pb.ScanEngineHeartBeatRequest, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public scanEngineHeartBeat(request: securityScan_pb.ScanEngineHeartBeatRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public scanEngineHeartBeat(request: securityScan_pb.ScanEngineHeartBeatRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public scanEngineCallBack(request: securityScan_pb.ScanEngineCallBackRequest, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public scanEngineCallBack(request: securityScan_pb.ScanEngineCallBackRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public scanEngineCallBack(request: securityScan_pb.ScanEngineCallBackRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFileDownload(request: securityScan_pb.GetFileDownloadRequest, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFileDownload(request: securityScan_pb.GetFileDownloadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFileDownload(request: securityScan_pb.GetFileDownloadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFileHistoryDownload(request: securityScan_pb.GetFileHistoryDownloadRequest, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFileHistoryDownload(request: securityScan_pb.GetFileHistoryDownloadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFileHistoryDownload(request: securityScan_pb.GetFileHistoryDownloadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFileHistory(request: securityScan_pb.GetFileHistoryRequest, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFileHistory(request: securityScan_pb.GetFileHistoryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFileHistory(request: securityScan_pb.GetFileHistoryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: securityScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

