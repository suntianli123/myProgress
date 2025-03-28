// package: wps3
// file: wps3/wps3.proto

import * as grpc from '@grpc/grpc-js';
import * as wps3_wps3_pb from '../wps3/wps3_pb';

interface IWps3ServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  upload: IWps3ServiceService_Iupload;
  download: IWps3ServiceService_Idownload;
}

interface IWps3ServiceService_Iupload extends grpc.MethodDefinition<wps3_wps3_pb.UploadRequest, wps3_wps3_pb.JsonResponse> {
  path: '/wps3.Wps3Service/upload'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<wps3_wps3_pb.UploadRequest>;
  requestDeserialize: grpc.deserialize<wps3_wps3_pb.UploadRequest>;
  responseSerialize: grpc.serialize<wps3_wps3_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<wps3_wps3_pb.JsonResponse>;
}

interface IWps3ServiceService_Idownload extends grpc.MethodDefinition<wps3_wps3_pb.DownloadRequest, wps3_wps3_pb.JsonResponse> {
  path: '/wps3.Wps3Service/download'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<wps3_wps3_pb.DownloadRequest>;
  requestDeserialize: grpc.deserialize<wps3_wps3_pb.DownloadRequest>;
  responseSerialize: grpc.serialize<wps3_wps3_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<wps3_wps3_pb.JsonResponse>;
}

export const Wps3ServiceService: IWps3ServiceService;
export interface IWps3ServiceServer extends grpc.UntypedServiceImplementation {
  upload: grpc.handleUnaryCall<wps3_wps3_pb.UploadRequest, wps3_wps3_pb.JsonResponse>;
  download: grpc.handleUnaryCall<wps3_wps3_pb.DownloadRequest, wps3_wps3_pb.JsonResponse>;
}

export interface IWps3ServiceClient {
  upload(request: wps3_wps3_pb.UploadRequest, callback: (error: grpc.ServiceError | null, response: wps3_wps3_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  upload(request: wps3_wps3_pb.UploadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wps3_wps3_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  upload(request: wps3_wps3_pb.UploadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wps3_wps3_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  download(request: wps3_wps3_pb.DownloadRequest, callback: (error: grpc.ServiceError | null, response: wps3_wps3_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  download(request: wps3_wps3_pb.DownloadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wps3_wps3_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  download(request: wps3_wps3_pb.DownloadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wps3_wps3_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class Wps3ServiceClient extends grpc.Client implements IWps3ServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public upload(request: wps3_wps3_pb.UploadRequest, callback: (error: grpc.ServiceError | null, response: wps3_wps3_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public upload(request: wps3_wps3_pb.UploadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wps3_wps3_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public upload(request: wps3_wps3_pb.UploadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wps3_wps3_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public download(request: wps3_wps3_pb.DownloadRequest, callback: (error: grpc.ServiceError | null, response: wps3_wps3_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public download(request: wps3_wps3_pb.DownloadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wps3_wps3_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public download(request: wps3_wps3_pb.DownloadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wps3_wps3_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

