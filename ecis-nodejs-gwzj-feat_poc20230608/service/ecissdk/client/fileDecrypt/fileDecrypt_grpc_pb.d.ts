// package: fileDecrypt
// file: fileDecrypt/fileDecrypt.proto

import * as grpc from '@grpc/grpc-js';
import * as fileDecrypt_fileDecrypt_pb from '../fileDecrypt/fileDecrypt_pb';

interface IFileDecryptServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  existDecryptFile: IFileDecryptServiceService_IexistDecryptFile;
  decryptFile: IFileDecryptServiceService_IdecryptFile;
  clearHistoryFile: IFileDecryptServiceService_IclearHistoryFile;
  preUploadFile: IFileDecryptServiceService_IpreUploadFile;
}

interface IFileDecryptServiceService_IexistDecryptFile extends grpc.MethodDefinition<fileDecrypt_fileDecrypt_pb.ExistDecryptFileRequest, fileDecrypt_fileDecrypt_pb.JsonResponse> {
  path: '/fileDecrypt.FileDecryptService/existDecryptFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileDecrypt_fileDecrypt_pb.ExistDecryptFileRequest>;
  requestDeserialize: grpc.deserialize<fileDecrypt_fileDecrypt_pb.ExistDecryptFileRequest>;
  responseSerialize: grpc.serialize<fileDecrypt_fileDecrypt_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileDecrypt_fileDecrypt_pb.JsonResponse>;
}

interface IFileDecryptServiceService_IdecryptFile extends grpc.MethodDefinition<fileDecrypt_fileDecrypt_pb.DecryptFileRequest, fileDecrypt_fileDecrypt_pb.JsonResponse> {
  path: '/fileDecrypt.FileDecryptService/decryptFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileDecrypt_fileDecrypt_pb.DecryptFileRequest>;
  requestDeserialize: grpc.deserialize<fileDecrypt_fileDecrypt_pb.DecryptFileRequest>;
  responseSerialize: grpc.serialize<fileDecrypt_fileDecrypt_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileDecrypt_fileDecrypt_pb.JsonResponse>;
}

interface IFileDecryptServiceService_IclearHistoryFile extends grpc.MethodDefinition<fileDecrypt_fileDecrypt_pb.ClearHistoryFileRequest, fileDecrypt_fileDecrypt_pb.JsonResponse> {
  path: '/fileDecrypt.FileDecryptService/clearHistoryFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileDecrypt_fileDecrypt_pb.ClearHistoryFileRequest>;
  requestDeserialize: grpc.deserialize<fileDecrypt_fileDecrypt_pb.ClearHistoryFileRequest>;
  responseSerialize: grpc.serialize<fileDecrypt_fileDecrypt_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileDecrypt_fileDecrypt_pb.JsonResponse>;
}

interface IFileDecryptServiceService_IpreUploadFile extends grpc.MethodDefinition<fileDecrypt_fileDecrypt_pb.PreUploadFileRequest, fileDecrypt_fileDecrypt_pb.JsonResponse> {
  path: '/fileDecrypt.FileDecryptService/preUploadFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileDecrypt_fileDecrypt_pb.PreUploadFileRequest>;
  requestDeserialize: grpc.deserialize<fileDecrypt_fileDecrypt_pb.PreUploadFileRequest>;
  responseSerialize: grpc.serialize<fileDecrypt_fileDecrypt_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileDecrypt_fileDecrypt_pb.JsonResponse>;
}

export const FileDecryptServiceService: IFileDecryptServiceService;
export interface IFileDecryptServiceServer extends grpc.UntypedServiceImplementation {
  existDecryptFile: grpc.handleUnaryCall<fileDecrypt_fileDecrypt_pb.ExistDecryptFileRequest, fileDecrypt_fileDecrypt_pb.JsonResponse>;
  decryptFile: grpc.handleUnaryCall<fileDecrypt_fileDecrypt_pb.DecryptFileRequest, fileDecrypt_fileDecrypt_pb.JsonResponse>;
  clearHistoryFile: grpc.handleUnaryCall<fileDecrypt_fileDecrypt_pb.ClearHistoryFileRequest, fileDecrypt_fileDecrypt_pb.JsonResponse>;
  preUploadFile: grpc.handleUnaryCall<fileDecrypt_fileDecrypt_pb.PreUploadFileRequest, fileDecrypt_fileDecrypt_pb.JsonResponse>;
}

export interface IFileDecryptServiceClient {
  existDecryptFile(request: fileDecrypt_fileDecrypt_pb.ExistDecryptFileRequest, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  existDecryptFile(request: fileDecrypt_fileDecrypt_pb.ExistDecryptFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  existDecryptFile(request: fileDecrypt_fileDecrypt_pb.ExistDecryptFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  decryptFile(request: fileDecrypt_fileDecrypt_pb.DecryptFileRequest, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  decryptFile(request: fileDecrypt_fileDecrypt_pb.DecryptFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  decryptFile(request: fileDecrypt_fileDecrypt_pb.DecryptFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  clearHistoryFile(request: fileDecrypt_fileDecrypt_pb.ClearHistoryFileRequest, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  clearHistoryFile(request: fileDecrypt_fileDecrypt_pb.ClearHistoryFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  clearHistoryFile(request: fileDecrypt_fileDecrypt_pb.ClearHistoryFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  preUploadFile(request: fileDecrypt_fileDecrypt_pb.PreUploadFileRequest, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  preUploadFile(request: fileDecrypt_fileDecrypt_pb.PreUploadFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  preUploadFile(request: fileDecrypt_fileDecrypt_pb.PreUploadFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class FileDecryptServiceClient extends grpc.Client implements IFileDecryptServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public existDecryptFile(request: fileDecrypt_fileDecrypt_pb.ExistDecryptFileRequest, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public existDecryptFile(request: fileDecrypt_fileDecrypt_pb.ExistDecryptFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public existDecryptFile(request: fileDecrypt_fileDecrypt_pb.ExistDecryptFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public decryptFile(request: fileDecrypt_fileDecrypt_pb.DecryptFileRequest, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public decryptFile(request: fileDecrypt_fileDecrypt_pb.DecryptFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public decryptFile(request: fileDecrypt_fileDecrypt_pb.DecryptFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public clearHistoryFile(request: fileDecrypt_fileDecrypt_pb.ClearHistoryFileRequest, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public clearHistoryFile(request: fileDecrypt_fileDecrypt_pb.ClearHistoryFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public clearHistoryFile(request: fileDecrypt_fileDecrypt_pb.ClearHistoryFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public preUploadFile(request: fileDecrypt_fileDecrypt_pb.PreUploadFileRequest, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public preUploadFile(request: fileDecrypt_fileDecrypt_pb.PreUploadFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public preUploadFile(request: fileDecrypt_fileDecrypt_pb.PreUploadFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileDecrypt_fileDecrypt_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

