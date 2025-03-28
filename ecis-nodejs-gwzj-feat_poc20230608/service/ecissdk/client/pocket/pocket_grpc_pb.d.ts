// package: pocket
// file: pocket.proto

import * as grpc from '@grpc/grpc-js';
import * as pocket_pb from './pocket_pb';

interface IPocketServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getProfile: IPocketServiceService_IgetProfile;
  updateProfile: IPocketServiceService_IupdateProfile;
  getFileDownloadUrl: IPocketServiceService_IgetFileDownloadUrl;
  uploadFile: IPocketServiceService_IuploadFile;
}

interface IPocketServiceService_IgetProfile extends grpc.MethodDefinition<pocket_pb.NullRequest, pocket_pb.CommonResponse> {
  path: '/pocket.PocketService/getProfile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<pocket_pb.NullRequest>;
  requestDeserialize: grpc.deserialize<pocket_pb.NullRequest>;
  responseSerialize: grpc.serialize<pocket_pb.CommonResponse>;
  responseDeserialize: grpc.deserialize<pocket_pb.CommonResponse>;
}

interface IPocketServiceService_IupdateProfile extends grpc.MethodDefinition<pocket_pb.UpdateProfileRequest, pocket_pb.CommonResponse> {
  path: '/pocket.PocketService/updateProfile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<pocket_pb.UpdateProfileRequest>;
  requestDeserialize: grpc.deserialize<pocket_pb.UpdateProfileRequest>;
  responseSerialize: grpc.serialize<pocket_pb.CommonResponse>;
  responseDeserialize: grpc.deserialize<pocket_pb.CommonResponse>;
}

interface IPocketServiceService_IgetFileDownloadUrl extends grpc.MethodDefinition<pocket_pb.GetFileDownloadUrlRequest, pocket_pb.GetFileDownloadUrlResponse> {
  path: '/pocket.PocketService/getFileDownloadUrl'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<pocket_pb.GetFileDownloadUrlRequest>;
  requestDeserialize: grpc.deserialize<pocket_pb.GetFileDownloadUrlRequest>;
  responseSerialize: grpc.serialize<pocket_pb.GetFileDownloadUrlResponse>;
  responseDeserialize: grpc.deserialize<pocket_pb.GetFileDownloadUrlResponse>;
}

interface IPocketServiceService_IuploadFile extends grpc.MethodDefinition<pocket_pb.UploadFileRequest, pocket_pb.UploadFileResponse> {
  path: '/pocket.PocketService/uploadFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<pocket_pb.UploadFileRequest>;
  requestDeserialize: grpc.deserialize<pocket_pb.UploadFileRequest>;
  responseSerialize: grpc.serialize<pocket_pb.UploadFileResponse>;
  responseDeserialize: grpc.deserialize<pocket_pb.UploadFileResponse>;
}

export const PocketServiceService: IPocketServiceService;
export interface IPocketServiceServer extends grpc.UntypedServiceImplementation {
  getProfile: grpc.handleUnaryCall<pocket_pb.NullRequest, pocket_pb.CommonResponse>;
  updateProfile: grpc.handleUnaryCall<pocket_pb.UpdateProfileRequest, pocket_pb.CommonResponse>;
  getFileDownloadUrl: grpc.handleUnaryCall<pocket_pb.GetFileDownloadUrlRequest, pocket_pb.GetFileDownloadUrlResponse>;
  uploadFile: grpc.handleUnaryCall<pocket_pb.UploadFileRequest, pocket_pb.UploadFileResponse>;
}

export interface IPocketServiceClient {
  getProfile(request: pocket_pb.NullRequest, callback: (error: grpc.ServiceError | null, response: pocket_pb.CommonResponse) => void): grpc.ClientUnaryCall;
  getProfile(request: pocket_pb.NullRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pocket_pb.CommonResponse) => void): grpc.ClientUnaryCall;
  getProfile(request: pocket_pb.NullRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pocket_pb.CommonResponse) => void): grpc.ClientUnaryCall;
  updateProfile(request: pocket_pb.UpdateProfileRequest, callback: (error: grpc.ServiceError | null, response: pocket_pb.CommonResponse) => void): grpc.ClientUnaryCall;
  updateProfile(request: pocket_pb.UpdateProfileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pocket_pb.CommonResponse) => void): grpc.ClientUnaryCall;
  updateProfile(request: pocket_pb.UpdateProfileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pocket_pb.CommonResponse) => void): grpc.ClientUnaryCall;
  getFileDownloadUrl(request: pocket_pb.GetFileDownloadUrlRequest, callback: (error: grpc.ServiceError | null, response: pocket_pb.GetFileDownloadUrlResponse) => void): grpc.ClientUnaryCall;
  getFileDownloadUrl(request: pocket_pb.GetFileDownloadUrlRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pocket_pb.GetFileDownloadUrlResponse) => void): grpc.ClientUnaryCall;
  getFileDownloadUrl(request: pocket_pb.GetFileDownloadUrlRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pocket_pb.GetFileDownloadUrlResponse) => void): grpc.ClientUnaryCall;
  uploadFile(request: pocket_pb.UploadFileRequest, callback: (error: grpc.ServiceError | null, response: pocket_pb.UploadFileResponse) => void): grpc.ClientUnaryCall;
  uploadFile(request: pocket_pb.UploadFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pocket_pb.UploadFileResponse) => void): grpc.ClientUnaryCall;
  uploadFile(request: pocket_pb.UploadFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pocket_pb.UploadFileResponse) => void): grpc.ClientUnaryCall;
}

export class PocketServiceClient extends grpc.Client implements IPocketServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public getProfile(request: pocket_pb.NullRequest, callback: (error: grpc.ServiceError | null, response: pocket_pb.CommonResponse) => void): grpc.ClientUnaryCall;
  public getProfile(request: pocket_pb.NullRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pocket_pb.CommonResponse) => void): grpc.ClientUnaryCall;
  public getProfile(request: pocket_pb.NullRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pocket_pb.CommonResponse) => void): grpc.ClientUnaryCall;
  public updateProfile(request: pocket_pb.UpdateProfileRequest, callback: (error: grpc.ServiceError | null, response: pocket_pb.CommonResponse) => void): grpc.ClientUnaryCall;
  public updateProfile(request: pocket_pb.UpdateProfileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pocket_pb.CommonResponse) => void): grpc.ClientUnaryCall;
  public updateProfile(request: pocket_pb.UpdateProfileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pocket_pb.CommonResponse) => void): grpc.ClientUnaryCall;
  public getFileDownloadUrl(request: pocket_pb.GetFileDownloadUrlRequest, callback: (error: grpc.ServiceError | null, response: pocket_pb.GetFileDownloadUrlResponse) => void): grpc.ClientUnaryCall;
  public getFileDownloadUrl(request: pocket_pb.GetFileDownloadUrlRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pocket_pb.GetFileDownloadUrlResponse) => void): grpc.ClientUnaryCall;
  public getFileDownloadUrl(request: pocket_pb.GetFileDownloadUrlRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pocket_pb.GetFileDownloadUrlResponse) => void): grpc.ClientUnaryCall;
  public uploadFile(request: pocket_pb.UploadFileRequest, callback: (error: grpc.ServiceError | null, response: pocket_pb.UploadFileResponse) => void): grpc.ClientUnaryCall;
  public uploadFile(request: pocket_pb.UploadFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pocket_pb.UploadFileResponse) => void): grpc.ClientUnaryCall;
  public uploadFile(request: pocket_pb.UploadFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pocket_pb.UploadFileResponse) => void): grpc.ClientUnaryCall;
}

