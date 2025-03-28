// package: yunDoc
// file: yunDoc/yunDoc.proto

import * as grpc from '@grpc/grpc-js';
import * as yunDoc_yunDoc_pb from '../yunDoc/yunDoc_pb';

interface IYunDocServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  listFiles: IYunDocServiceService_IlistFiles;
  createFolder: IYunDocServiceService_IcreateFolder;
  getFilePermissions: IYunDocServiceService_IgetFilePermissions;
  deleteFilePermission: IYunDocServiceService_IdeleteFilePermission;
  createFilesUpload: IYunDocServiceService_IcreateFilesUpload;
  createFile: IYunDocServiceService_IcreateFile;
  updateFile: IYunDocServiceService_IupdateFile;
  downloadFile: IYunDocServiceService_IdownloadFile;
  batchDownloadFile: IYunDocServiceService_IbatchDownloadFile;
}

interface IYunDocServiceService_IlistFiles extends grpc.MethodDefinition<yunDoc_yunDoc_pb.ListFilesRequest, yunDoc_yunDoc_pb.JsonResponse> {
  path: '/yunDoc.YunDocService/listFiles'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<yunDoc_yunDoc_pb.ListFilesRequest>;
  requestDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.ListFilesRequest>;
  responseSerialize: grpc.serialize<yunDoc_yunDoc_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.JsonResponse>;
}

interface IYunDocServiceService_IcreateFolder extends grpc.MethodDefinition<yunDoc_yunDoc_pb.CreateFolderRequest, yunDoc_yunDoc_pb.JsonResponse> {
  path: '/yunDoc.YunDocService/createFolder'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<yunDoc_yunDoc_pb.CreateFolderRequest>;
  requestDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.CreateFolderRequest>;
  responseSerialize: grpc.serialize<yunDoc_yunDoc_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.JsonResponse>;
}

interface IYunDocServiceService_IgetFilePermissions extends grpc.MethodDefinition<yunDoc_yunDoc_pb.GetFilePermissionsRequest, yunDoc_yunDoc_pb.JsonResponse> {
  path: '/yunDoc.YunDocService/getFilePermissions'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<yunDoc_yunDoc_pb.GetFilePermissionsRequest>;
  requestDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.GetFilePermissionsRequest>;
  responseSerialize: grpc.serialize<yunDoc_yunDoc_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.JsonResponse>;
}

interface IYunDocServiceService_IdeleteFilePermission extends grpc.MethodDefinition<yunDoc_yunDoc_pb.DeleteFilePermissionRequest, yunDoc_yunDoc_pb.JsonResponse> {
  path: '/yunDoc.YunDocService/deleteFilePermission'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<yunDoc_yunDoc_pb.DeleteFilePermissionRequest>;
  requestDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.DeleteFilePermissionRequest>;
  responseSerialize: grpc.serialize<yunDoc_yunDoc_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.JsonResponse>;
}

interface IYunDocServiceService_IcreateFilesUpload extends grpc.MethodDefinition<yunDoc_yunDoc_pb.CreateFilesUploadRequest, yunDoc_yunDoc_pb.JsonResponse> {
  path: '/yunDoc.YunDocService/createFilesUpload'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<yunDoc_yunDoc_pb.CreateFilesUploadRequest>;
  requestDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.CreateFilesUploadRequest>;
  responseSerialize: grpc.serialize<yunDoc_yunDoc_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.JsonResponse>;
}

interface IYunDocServiceService_IcreateFile extends grpc.MethodDefinition<yunDoc_yunDoc_pb.CreateFileRequest, yunDoc_yunDoc_pb.JsonResponse> {
  path: '/yunDoc.YunDocService/createFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<yunDoc_yunDoc_pb.CreateFileRequest>;
  requestDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.CreateFileRequest>;
  responseSerialize: grpc.serialize<yunDoc_yunDoc_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.JsonResponse>;
}

interface IYunDocServiceService_IupdateFile extends grpc.MethodDefinition<yunDoc_yunDoc_pb.UpdateFileRequest, yunDoc_yunDoc_pb.JsonResponse> {
  path: '/yunDoc.YunDocService/updateFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<yunDoc_yunDoc_pb.UpdateFileRequest>;
  requestDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.UpdateFileRequest>;
  responseSerialize: grpc.serialize<yunDoc_yunDoc_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.JsonResponse>;
}

interface IYunDocServiceService_IdownloadFile extends grpc.MethodDefinition<yunDoc_yunDoc_pb.DownloadFileRequest, yunDoc_yunDoc_pb.JsonResponse> {
  path: '/yunDoc.YunDocService/downloadFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<yunDoc_yunDoc_pb.DownloadFileRequest>;
  requestDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.DownloadFileRequest>;
  responseSerialize: grpc.serialize<yunDoc_yunDoc_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.JsonResponse>;
}

interface IYunDocServiceService_IbatchDownloadFile extends grpc.MethodDefinition<yunDoc_yunDoc_pb.BatchDownloadFileRequest, yunDoc_yunDoc_pb.JsonResponse> {
  path: '/yunDoc.YunDocService/batchDownloadFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<yunDoc_yunDoc_pb.BatchDownloadFileRequest>;
  requestDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.BatchDownloadFileRequest>;
  responseSerialize: grpc.serialize<yunDoc_yunDoc_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<yunDoc_yunDoc_pb.JsonResponse>;
}

export const YunDocServiceService: IYunDocServiceService;
export interface IYunDocServiceServer extends grpc.UntypedServiceImplementation {
  listFiles: grpc.handleUnaryCall<yunDoc_yunDoc_pb.ListFilesRequest, yunDoc_yunDoc_pb.JsonResponse>;
  createFolder: grpc.handleUnaryCall<yunDoc_yunDoc_pb.CreateFolderRequest, yunDoc_yunDoc_pb.JsonResponse>;
  getFilePermissions: grpc.handleUnaryCall<yunDoc_yunDoc_pb.GetFilePermissionsRequest, yunDoc_yunDoc_pb.JsonResponse>;
  deleteFilePermission: grpc.handleUnaryCall<yunDoc_yunDoc_pb.DeleteFilePermissionRequest, yunDoc_yunDoc_pb.JsonResponse>;
  createFilesUpload: grpc.handleUnaryCall<yunDoc_yunDoc_pb.CreateFilesUploadRequest, yunDoc_yunDoc_pb.JsonResponse>;
  createFile: grpc.handleUnaryCall<yunDoc_yunDoc_pb.CreateFileRequest, yunDoc_yunDoc_pb.JsonResponse>;
  updateFile: grpc.handleUnaryCall<yunDoc_yunDoc_pb.UpdateFileRequest, yunDoc_yunDoc_pb.JsonResponse>;
  downloadFile: grpc.handleUnaryCall<yunDoc_yunDoc_pb.DownloadFileRequest, yunDoc_yunDoc_pb.JsonResponse>;
  batchDownloadFile: grpc.handleUnaryCall<yunDoc_yunDoc_pb.BatchDownloadFileRequest, yunDoc_yunDoc_pb.JsonResponse>;
}

export interface IYunDocServiceClient {
  listFiles(request: yunDoc_yunDoc_pb.ListFilesRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  listFiles(request: yunDoc_yunDoc_pb.ListFilesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  listFiles(request: yunDoc_yunDoc_pb.ListFilesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createFolder(request: yunDoc_yunDoc_pb.CreateFolderRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createFolder(request: yunDoc_yunDoc_pb.CreateFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createFolder(request: yunDoc_yunDoc_pb.CreateFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFilePermissions(request: yunDoc_yunDoc_pb.GetFilePermissionsRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFilePermissions(request: yunDoc_yunDoc_pb.GetFilePermissionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFilePermissions(request: yunDoc_yunDoc_pb.GetFilePermissionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  deleteFilePermission(request: yunDoc_yunDoc_pb.DeleteFilePermissionRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  deleteFilePermission(request: yunDoc_yunDoc_pb.DeleteFilePermissionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  deleteFilePermission(request: yunDoc_yunDoc_pb.DeleteFilePermissionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createFilesUpload(request: yunDoc_yunDoc_pb.CreateFilesUploadRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createFilesUpload(request: yunDoc_yunDoc_pb.CreateFilesUploadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createFilesUpload(request: yunDoc_yunDoc_pb.CreateFilesUploadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createFile(request: yunDoc_yunDoc_pb.CreateFileRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createFile(request: yunDoc_yunDoc_pb.CreateFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createFile(request: yunDoc_yunDoc_pb.CreateFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  updateFile(request: yunDoc_yunDoc_pb.UpdateFileRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  updateFile(request: yunDoc_yunDoc_pb.UpdateFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  updateFile(request: yunDoc_yunDoc_pb.UpdateFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadFile(request: yunDoc_yunDoc_pb.DownloadFileRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadFile(request: yunDoc_yunDoc_pb.DownloadFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadFile(request: yunDoc_yunDoc_pb.DownloadFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  batchDownloadFile(request: yunDoc_yunDoc_pb.BatchDownloadFileRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  batchDownloadFile(request: yunDoc_yunDoc_pb.BatchDownloadFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  batchDownloadFile(request: yunDoc_yunDoc_pb.BatchDownloadFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class YunDocServiceClient extends grpc.Client implements IYunDocServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public listFiles(request: yunDoc_yunDoc_pb.ListFilesRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public listFiles(request: yunDoc_yunDoc_pb.ListFilesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public listFiles(request: yunDoc_yunDoc_pb.ListFilesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createFolder(request: yunDoc_yunDoc_pb.CreateFolderRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createFolder(request: yunDoc_yunDoc_pb.CreateFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createFolder(request: yunDoc_yunDoc_pb.CreateFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFilePermissions(request: yunDoc_yunDoc_pb.GetFilePermissionsRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFilePermissions(request: yunDoc_yunDoc_pb.GetFilePermissionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFilePermissions(request: yunDoc_yunDoc_pb.GetFilePermissionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public deleteFilePermission(request: yunDoc_yunDoc_pb.DeleteFilePermissionRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public deleteFilePermission(request: yunDoc_yunDoc_pb.DeleteFilePermissionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public deleteFilePermission(request: yunDoc_yunDoc_pb.DeleteFilePermissionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createFilesUpload(request: yunDoc_yunDoc_pb.CreateFilesUploadRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createFilesUpload(request: yunDoc_yunDoc_pb.CreateFilesUploadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createFilesUpload(request: yunDoc_yunDoc_pb.CreateFilesUploadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createFile(request: yunDoc_yunDoc_pb.CreateFileRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createFile(request: yunDoc_yunDoc_pb.CreateFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createFile(request: yunDoc_yunDoc_pb.CreateFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public updateFile(request: yunDoc_yunDoc_pb.UpdateFileRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public updateFile(request: yunDoc_yunDoc_pb.UpdateFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public updateFile(request: yunDoc_yunDoc_pb.UpdateFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadFile(request: yunDoc_yunDoc_pb.DownloadFileRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadFile(request: yunDoc_yunDoc_pb.DownloadFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadFile(request: yunDoc_yunDoc_pb.DownloadFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public batchDownloadFile(request: yunDoc_yunDoc_pb.BatchDownloadFileRequest, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public batchDownloadFile(request: yunDoc_yunDoc_pb.BatchDownloadFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public batchDownloadFile(request: yunDoc_yunDoc_pb.BatchDownloadFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: yunDoc_yunDoc_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

