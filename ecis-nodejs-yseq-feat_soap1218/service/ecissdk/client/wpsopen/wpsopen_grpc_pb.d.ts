// package: wpsopen
// file: wpsopen/wpsopen.proto

import * as grpc from '@grpc/grpc-js';
import * as wpsopen_wpsopen_pb from '../wpsopen/wpsopen_pb';

interface IWpsopenServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getIdConfuse: IWpsopenServiceService_IgetIdConfuse;
  getFileInfo: IWpsopenServiceService_IgetFileInfo;
  getPreviewInnerFileInfo: IWpsopenServiceService_IgetPreviewInnerFileInfo;
  getSaveFileUrl: IWpsopenServiceService_IgetSaveFileUrl;
}

interface IWpsopenServiceService_IgetIdConfuse extends grpc.MethodDefinition<wpsopen_wpsopen_pb.GetIdConfuseRequest, wpsopen_wpsopen_pb.JsonResponse> {
  path: '/wpsopen.WpsopenService/getIdConfuse'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<wpsopen_wpsopen_pb.GetIdConfuseRequest>;
  requestDeserialize: grpc.deserialize<wpsopen_wpsopen_pb.GetIdConfuseRequest>;
  responseSerialize: grpc.serialize<wpsopen_wpsopen_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<wpsopen_wpsopen_pb.JsonResponse>;
}

interface IWpsopenServiceService_IgetFileInfo extends grpc.MethodDefinition<wpsopen_wpsopen_pb.GetFileInfoRequest, wpsopen_wpsopen_pb.JsonResponse> {
  path: '/wpsopen.WpsopenService/getFileInfo'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<wpsopen_wpsopen_pb.GetFileInfoRequest>;
  requestDeserialize: grpc.deserialize<wpsopen_wpsopen_pb.GetFileInfoRequest>;
  responseSerialize: grpc.serialize<wpsopen_wpsopen_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<wpsopen_wpsopen_pb.JsonResponse>;
}

interface IWpsopenServiceService_IgetPreviewInnerFileInfo extends grpc.MethodDefinition<wpsopen_wpsopen_pb.GetPreviewInnerFileInfoRequest, wpsopen_wpsopen_pb.JsonResponse> {
  path: '/wpsopen.WpsopenService/getPreviewInnerFileInfo'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<wpsopen_wpsopen_pb.GetPreviewInnerFileInfoRequest>;
  requestDeserialize: grpc.deserialize<wpsopen_wpsopen_pb.GetPreviewInnerFileInfoRequest>;
  responseSerialize: grpc.serialize<wpsopen_wpsopen_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<wpsopen_wpsopen_pb.JsonResponse>;
}

interface IWpsopenServiceService_IgetSaveFileUrl extends grpc.MethodDefinition<wpsopen_wpsopen_pb.GetSaveFileUrlRequest, wpsopen_wpsopen_pb.JsonResponse> {
  path: '/wpsopen.WpsopenService/getSaveFileUrl'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<wpsopen_wpsopen_pb.GetSaveFileUrlRequest>;
  requestDeserialize: grpc.deserialize<wpsopen_wpsopen_pb.GetSaveFileUrlRequest>;
  responseSerialize: grpc.serialize<wpsopen_wpsopen_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<wpsopen_wpsopen_pb.JsonResponse>;
}

export const WpsopenServiceService: IWpsopenServiceService;
export interface IWpsopenServiceServer extends grpc.UntypedServiceImplementation {
  getIdConfuse: grpc.handleUnaryCall<wpsopen_wpsopen_pb.GetIdConfuseRequest, wpsopen_wpsopen_pb.JsonResponse>;
  getFileInfo: grpc.handleUnaryCall<wpsopen_wpsopen_pb.GetFileInfoRequest, wpsopen_wpsopen_pb.JsonResponse>;
  getPreviewInnerFileInfo: grpc.handleUnaryCall<wpsopen_wpsopen_pb.GetPreviewInnerFileInfoRequest, wpsopen_wpsopen_pb.JsonResponse>;
  getSaveFileUrl: grpc.handleUnaryCall<wpsopen_wpsopen_pb.GetSaveFileUrlRequest, wpsopen_wpsopen_pb.JsonResponse>;
}

export interface IWpsopenServiceClient {
  getIdConfuse(request: wpsopen_wpsopen_pb.GetIdConfuseRequest, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getIdConfuse(request: wpsopen_wpsopen_pb.GetIdConfuseRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getIdConfuse(request: wpsopen_wpsopen_pb.GetIdConfuseRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFileInfo(request: wpsopen_wpsopen_pb.GetFileInfoRequest, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFileInfo(request: wpsopen_wpsopen_pb.GetFileInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFileInfo(request: wpsopen_wpsopen_pb.GetFileInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getPreviewInnerFileInfo(request: wpsopen_wpsopen_pb.GetPreviewInnerFileInfoRequest, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getPreviewInnerFileInfo(request: wpsopen_wpsopen_pb.GetPreviewInnerFileInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getPreviewInnerFileInfo(request: wpsopen_wpsopen_pb.GetPreviewInnerFileInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getSaveFileUrl(request: wpsopen_wpsopen_pb.GetSaveFileUrlRequest, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getSaveFileUrl(request: wpsopen_wpsopen_pb.GetSaveFileUrlRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getSaveFileUrl(request: wpsopen_wpsopen_pb.GetSaveFileUrlRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class WpsopenServiceClient extends grpc.Client implements IWpsopenServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public getIdConfuse(request: wpsopen_wpsopen_pb.GetIdConfuseRequest, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getIdConfuse(request: wpsopen_wpsopen_pb.GetIdConfuseRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getIdConfuse(request: wpsopen_wpsopen_pb.GetIdConfuseRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFileInfo(request: wpsopen_wpsopen_pb.GetFileInfoRequest, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFileInfo(request: wpsopen_wpsopen_pb.GetFileInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFileInfo(request: wpsopen_wpsopen_pb.GetFileInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getPreviewInnerFileInfo(request: wpsopen_wpsopen_pb.GetPreviewInnerFileInfoRequest, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getPreviewInnerFileInfo(request: wpsopen_wpsopen_pb.GetPreviewInnerFileInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getPreviewInnerFileInfo(request: wpsopen_wpsopen_pb.GetPreviewInnerFileInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getSaveFileUrl(request: wpsopen_wpsopen_pb.GetSaveFileUrlRequest, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getSaveFileUrl(request: wpsopen_wpsopen_pb.GetSaveFileUrlRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getSaveFileUrl(request: wpsopen_wpsopen_pb.GetSaveFileUrlRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wpsopen_wpsopen_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

