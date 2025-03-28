// package: devYunDoc
// file: devYunDoc/devYunDoc.proto

import * as grpc from '@grpc/grpc-js';
import * as devYunDoc_devYunDoc_pb from '../devYunDoc/devYunDoc_pb';

interface IDevYunDocServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  createFilesUpload: IDevYunDocServiceService_IcreateFilesUpload;
  createFile: IDevYunDocServiceService_IcreateFile;
  downloadFile: IDevYunDocServiceService_IdownloadFile;
}

interface IDevYunDocServiceService_IcreateFilesUpload extends grpc.MethodDefinition<devYunDoc_devYunDoc_pb.CreateFilesUploadRequest, devYunDoc_devYunDoc_pb.JsonResponse> {
  path: '/devYunDoc.DevYunDocService/createFilesUpload'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<devYunDoc_devYunDoc_pb.CreateFilesUploadRequest>;
  requestDeserialize: grpc.deserialize<devYunDoc_devYunDoc_pb.CreateFilesUploadRequest>;
  responseSerialize: grpc.serialize<devYunDoc_devYunDoc_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<devYunDoc_devYunDoc_pb.JsonResponse>;
}

interface IDevYunDocServiceService_IcreateFile extends grpc.MethodDefinition<devYunDoc_devYunDoc_pb.CreateFileRequest, devYunDoc_devYunDoc_pb.JsonResponse> {
  path: '/devYunDoc.DevYunDocService/createFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<devYunDoc_devYunDoc_pb.CreateFileRequest>;
  requestDeserialize: grpc.deserialize<devYunDoc_devYunDoc_pb.CreateFileRequest>;
  responseSerialize: grpc.serialize<devYunDoc_devYunDoc_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<devYunDoc_devYunDoc_pb.JsonResponse>;
}

interface IDevYunDocServiceService_IdownloadFile extends grpc.MethodDefinition<devYunDoc_devYunDoc_pb.DownloadFileRequest, devYunDoc_devYunDoc_pb.JsonResponse> {
  path: '/devYunDoc.DevYunDocService/downloadFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<devYunDoc_devYunDoc_pb.DownloadFileRequest>;
  requestDeserialize: grpc.deserialize<devYunDoc_devYunDoc_pb.DownloadFileRequest>;
  responseSerialize: grpc.serialize<devYunDoc_devYunDoc_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<devYunDoc_devYunDoc_pb.JsonResponse>;
}

export const DevYunDocServiceService: IDevYunDocServiceService;
export interface IDevYunDocServiceServer extends grpc.UntypedServiceImplementation {
  createFilesUpload: grpc.handleUnaryCall<devYunDoc_devYunDoc_pb.CreateFilesUploadRequest, devYunDoc_devYunDoc_pb.JsonResponse>;
  createFile: grpc.handleUnaryCall<devYunDoc_devYunDoc_pb.CreateFileRequest, devYunDoc_devYunDoc_pb.JsonResponse>;
  downloadFile: grpc.handleUnaryCall<devYunDoc_devYunDoc_pb.DownloadFileRequest, devYunDoc_devYunDoc_pb.JsonResponse>;
}

export interface IDevYunDocServiceClient {
  createFilesUpload(request: devYunDoc_devYunDoc_pb.CreateFilesUploadRequest, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createFilesUpload(request: devYunDoc_devYunDoc_pb.CreateFilesUploadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createFilesUpload(request: devYunDoc_devYunDoc_pb.CreateFilesUploadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createFile(request: devYunDoc_devYunDoc_pb.CreateFileRequest, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createFile(request: devYunDoc_devYunDoc_pb.CreateFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createFile(request: devYunDoc_devYunDoc_pb.CreateFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadFile(request: devYunDoc_devYunDoc_pb.DownloadFileRequest, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadFile(request: devYunDoc_devYunDoc_pb.DownloadFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadFile(request: devYunDoc_devYunDoc_pb.DownloadFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class DevYunDocServiceClient extends grpc.Client implements IDevYunDocServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public createFilesUpload(request: devYunDoc_devYunDoc_pb.CreateFilesUploadRequest, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createFilesUpload(request: devYunDoc_devYunDoc_pb.CreateFilesUploadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createFilesUpload(request: devYunDoc_devYunDoc_pb.CreateFilesUploadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createFile(request: devYunDoc_devYunDoc_pb.CreateFileRequest, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createFile(request: devYunDoc_devYunDoc_pb.CreateFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createFile(request: devYunDoc_devYunDoc_pb.CreateFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadFile(request: devYunDoc_devYunDoc_pb.DownloadFileRequest, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadFile(request: devYunDoc_devYunDoc_pb.DownloadFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadFile(request: devYunDoc_devYunDoc_pb.DownloadFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: devYunDoc_devYunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

