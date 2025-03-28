// package: fileScan
// file: fileScan/fileScan.proto

import * as grpc from '@grpc/grpc-js';
import * as fileScan_fileScan_pb from '../fileScan/fileScan_pb';

interface IFileScanServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getFileParentNames: IFileScanServiceService_IgetFileParentNames;
  getCorpGroupInfo: IFileScanServiceService_IgetCorpGroupInfo;
  getFilesInfo: IFileScanServiceService_IgetFilesInfo;
  getFilePathNames: IFileScanServiceService_IgetFilePathNames;
  downloadFile: IFileScanServiceService_IdownloadFile;
  downloadFirstRecycleFile: IFileScanServiceService_IdownloadFirstRecycleFile;
  downloadHistoryFile: IFileScanServiceService_IdownloadHistoryFile;
  createTerm: IFileScanServiceService_IcreateTerm;
  updateTerm: IFileScanServiceService_IupdateTerm;
  getTerm: IFileScanServiceService_IgetTerm;
  createObjectTermsRelation: IFileScanServiceService_IcreateObjectTermsRelation;
  listObjectTermsRelation: IFileScanServiceService_IlistObjectTermsRelation;
  getObjectTermRelation: IFileScanServiceService_IgetObjectTermRelation;
  delObjectTermRelation: IFileScanServiceService_IdelObjectTermRelation;
  createMetaType: IFileScanServiceService_IcreateMetaType;
  createMetadata: IFileScanServiceService_IcreateMetadata;
  delMetadata: IFileScanServiceService_IdelMetadata;
  listFile: IFileScanServiceService_IlistFile;
}

interface IFileScanServiceService_IgetFileParentNames extends grpc.MethodDefinition<fileScan_fileScan_pb.GetFileParentNamesRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/getFileParentNames'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.GetFileParentNamesRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.GetFileParentNamesRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IgetCorpGroupInfo extends grpc.MethodDefinition<fileScan_fileScan_pb.GetCorpGroupInfoRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/getCorpGroupInfo'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.GetCorpGroupInfoRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.GetCorpGroupInfoRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IgetFilesInfo extends grpc.MethodDefinition<fileScan_fileScan_pb.GetFilesInfoRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/getFilesInfo'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.GetFilesInfoRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.GetFilesInfoRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IgetFilePathNames extends grpc.MethodDefinition<fileScan_fileScan_pb.GetFilePathNamesRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/getFilePathNames'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.GetFilePathNamesRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.GetFilePathNamesRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IdownloadFile extends grpc.MethodDefinition<fileScan_fileScan_pb.DownloadFileRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/downloadFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.DownloadFileRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.DownloadFileRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IdownloadFirstRecycleFile extends grpc.MethodDefinition<fileScan_fileScan_pb.DownloadFirstRecycleFileRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/downloadFirstRecycleFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.DownloadFirstRecycleFileRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.DownloadFirstRecycleFileRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IdownloadHistoryFile extends grpc.MethodDefinition<fileScan_fileScan_pb.DownloadHistoryFileRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/downloadHistoryFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.DownloadHistoryFileRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.DownloadHistoryFileRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IcreateTerm extends grpc.MethodDefinition<fileScan_fileScan_pb.CreateTermRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/createTerm'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.CreateTermRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.CreateTermRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IupdateTerm extends grpc.MethodDefinition<fileScan_fileScan_pb.UpdateTermRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/updateTerm'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.UpdateTermRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.UpdateTermRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IgetTerm extends grpc.MethodDefinition<fileScan_fileScan_pb.GetTermRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/getTerm'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.GetTermRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.GetTermRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IcreateObjectTermsRelation extends grpc.MethodDefinition<fileScan_fileScan_pb.CreateObjectTermsRelationRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/createObjectTermsRelation'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.CreateObjectTermsRelationRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.CreateObjectTermsRelationRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IlistObjectTermsRelation extends grpc.MethodDefinition<fileScan_fileScan_pb.ListObjectTermsRelationRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/listObjectTermsRelation'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.ListObjectTermsRelationRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.ListObjectTermsRelationRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IgetObjectTermRelation extends grpc.MethodDefinition<fileScan_fileScan_pb.GetObjectTermRelationRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/getObjectTermRelation'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.GetObjectTermRelationRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.GetObjectTermRelationRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IdelObjectTermRelation extends grpc.MethodDefinition<fileScan_fileScan_pb.DelObjectTermRelationRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/delObjectTermRelation'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.DelObjectTermRelationRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.DelObjectTermRelationRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IcreateMetaType extends grpc.MethodDefinition<fileScan_fileScan_pb.CreateMetaTypeRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/createMetaType'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.CreateMetaTypeRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.CreateMetaTypeRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IcreateMetadata extends grpc.MethodDefinition<fileScan_fileScan_pb.CreateMetadataRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/createMetadata'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.CreateMetadataRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.CreateMetadataRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IdelMetadata extends grpc.MethodDefinition<fileScan_fileScan_pb.DelMetadataRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/delMetadata'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.DelMetadataRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.DelMetadataRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

interface IFileScanServiceService_IlistFile extends grpc.MethodDefinition<fileScan_fileScan_pb.ListFileRequest, fileScan_fileScan_pb.JsonResponse> {
  path: '/fileScan.FileScanService/listFile'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<fileScan_fileScan_pb.ListFileRequest>;
  requestDeserialize: grpc.deserialize<fileScan_fileScan_pb.ListFileRequest>;
  responseSerialize: grpc.serialize<fileScan_fileScan_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<fileScan_fileScan_pb.JsonResponse>;
}

export const FileScanServiceService: IFileScanServiceService;
export interface IFileScanServiceServer extends grpc.UntypedServiceImplementation {
  getFileParentNames: grpc.handleUnaryCall<fileScan_fileScan_pb.GetFileParentNamesRequest, fileScan_fileScan_pb.JsonResponse>;
  getCorpGroupInfo: grpc.handleUnaryCall<fileScan_fileScan_pb.GetCorpGroupInfoRequest, fileScan_fileScan_pb.JsonResponse>;
  getFilesInfo: grpc.handleUnaryCall<fileScan_fileScan_pb.GetFilesInfoRequest, fileScan_fileScan_pb.JsonResponse>;
  getFilePathNames: grpc.handleUnaryCall<fileScan_fileScan_pb.GetFilePathNamesRequest, fileScan_fileScan_pb.JsonResponse>;
  downloadFile: grpc.handleUnaryCall<fileScan_fileScan_pb.DownloadFileRequest, fileScan_fileScan_pb.JsonResponse>;
  downloadFirstRecycleFile: grpc.handleUnaryCall<fileScan_fileScan_pb.DownloadFirstRecycleFileRequest, fileScan_fileScan_pb.JsonResponse>;
  downloadHistoryFile: grpc.handleUnaryCall<fileScan_fileScan_pb.DownloadHistoryFileRequest, fileScan_fileScan_pb.JsonResponse>;
  createTerm: grpc.handleUnaryCall<fileScan_fileScan_pb.CreateTermRequest, fileScan_fileScan_pb.JsonResponse>;
  updateTerm: grpc.handleUnaryCall<fileScan_fileScan_pb.UpdateTermRequest, fileScan_fileScan_pb.JsonResponse>;
  getTerm: grpc.handleUnaryCall<fileScan_fileScan_pb.GetTermRequest, fileScan_fileScan_pb.JsonResponse>;
  createObjectTermsRelation: grpc.handleUnaryCall<fileScan_fileScan_pb.CreateObjectTermsRelationRequest, fileScan_fileScan_pb.JsonResponse>;
  listObjectTermsRelation: grpc.handleUnaryCall<fileScan_fileScan_pb.ListObjectTermsRelationRequest, fileScan_fileScan_pb.JsonResponse>;
  getObjectTermRelation: grpc.handleUnaryCall<fileScan_fileScan_pb.GetObjectTermRelationRequest, fileScan_fileScan_pb.JsonResponse>;
  delObjectTermRelation: grpc.handleUnaryCall<fileScan_fileScan_pb.DelObjectTermRelationRequest, fileScan_fileScan_pb.JsonResponse>;
  createMetaType: grpc.handleUnaryCall<fileScan_fileScan_pb.CreateMetaTypeRequest, fileScan_fileScan_pb.JsonResponse>;
  createMetadata: grpc.handleUnaryCall<fileScan_fileScan_pb.CreateMetadataRequest, fileScan_fileScan_pb.JsonResponse>;
  delMetadata: grpc.handleUnaryCall<fileScan_fileScan_pb.DelMetadataRequest, fileScan_fileScan_pb.JsonResponse>;
  listFile: grpc.handleUnaryCall<fileScan_fileScan_pb.ListFileRequest, fileScan_fileScan_pb.JsonResponse>;
}

export interface IFileScanServiceClient {
  getFileParentNames(request: fileScan_fileScan_pb.GetFileParentNamesRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFileParentNames(request: fileScan_fileScan_pb.GetFileParentNamesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFileParentNames(request: fileScan_fileScan_pb.GetFileParentNamesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getCorpGroupInfo(request: fileScan_fileScan_pb.GetCorpGroupInfoRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getCorpGroupInfo(request: fileScan_fileScan_pb.GetCorpGroupInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getCorpGroupInfo(request: fileScan_fileScan_pb.GetCorpGroupInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFilesInfo(request: fileScan_fileScan_pb.GetFilesInfoRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFilesInfo(request: fileScan_fileScan_pb.GetFilesInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFilesInfo(request: fileScan_fileScan_pb.GetFilesInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFilePathNames(request: fileScan_fileScan_pb.GetFilePathNamesRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFilePathNames(request: fileScan_fileScan_pb.GetFilePathNamesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getFilePathNames(request: fileScan_fileScan_pb.GetFilePathNamesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadFile(request: fileScan_fileScan_pb.DownloadFileRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadFile(request: fileScan_fileScan_pb.DownloadFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadFile(request: fileScan_fileScan_pb.DownloadFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadFirstRecycleFile(request: fileScan_fileScan_pb.DownloadFirstRecycleFileRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadFirstRecycleFile(request: fileScan_fileScan_pb.DownloadFirstRecycleFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadFirstRecycleFile(request: fileScan_fileScan_pb.DownloadFirstRecycleFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadHistoryFile(request: fileScan_fileScan_pb.DownloadHistoryFileRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadHistoryFile(request: fileScan_fileScan_pb.DownloadHistoryFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  downloadHistoryFile(request: fileScan_fileScan_pb.DownloadHistoryFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createTerm(request: fileScan_fileScan_pb.CreateTermRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createTerm(request: fileScan_fileScan_pb.CreateTermRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createTerm(request: fileScan_fileScan_pb.CreateTermRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  updateTerm(request: fileScan_fileScan_pb.UpdateTermRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  updateTerm(request: fileScan_fileScan_pb.UpdateTermRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  updateTerm(request: fileScan_fileScan_pb.UpdateTermRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getTerm(request: fileScan_fileScan_pb.GetTermRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getTerm(request: fileScan_fileScan_pb.GetTermRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getTerm(request: fileScan_fileScan_pb.GetTermRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createObjectTermsRelation(request: fileScan_fileScan_pb.CreateObjectTermsRelationRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createObjectTermsRelation(request: fileScan_fileScan_pb.CreateObjectTermsRelationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createObjectTermsRelation(request: fileScan_fileScan_pb.CreateObjectTermsRelationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  listObjectTermsRelation(request: fileScan_fileScan_pb.ListObjectTermsRelationRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  listObjectTermsRelation(request: fileScan_fileScan_pb.ListObjectTermsRelationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  listObjectTermsRelation(request: fileScan_fileScan_pb.ListObjectTermsRelationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getObjectTermRelation(request: fileScan_fileScan_pb.GetObjectTermRelationRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getObjectTermRelation(request: fileScan_fileScan_pb.GetObjectTermRelationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getObjectTermRelation(request: fileScan_fileScan_pb.GetObjectTermRelationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  delObjectTermRelation(request: fileScan_fileScan_pb.DelObjectTermRelationRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  delObjectTermRelation(request: fileScan_fileScan_pb.DelObjectTermRelationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  delObjectTermRelation(request: fileScan_fileScan_pb.DelObjectTermRelationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createMetaType(request: fileScan_fileScan_pb.CreateMetaTypeRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createMetaType(request: fileScan_fileScan_pb.CreateMetaTypeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createMetaType(request: fileScan_fileScan_pb.CreateMetaTypeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createMetadata(request: fileScan_fileScan_pb.CreateMetadataRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createMetadata(request: fileScan_fileScan_pb.CreateMetadataRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  createMetadata(request: fileScan_fileScan_pb.CreateMetadataRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  delMetadata(request: fileScan_fileScan_pb.DelMetadataRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  delMetadata(request: fileScan_fileScan_pb.DelMetadataRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  delMetadata(request: fileScan_fileScan_pb.DelMetadataRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  listFile(request: fileScan_fileScan_pb.ListFileRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  listFile(request: fileScan_fileScan_pb.ListFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  listFile(request: fileScan_fileScan_pb.ListFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class FileScanServiceClient extends grpc.Client implements IFileScanServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public getFileParentNames(request: fileScan_fileScan_pb.GetFileParentNamesRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFileParentNames(request: fileScan_fileScan_pb.GetFileParentNamesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFileParentNames(request: fileScan_fileScan_pb.GetFileParentNamesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getCorpGroupInfo(request: fileScan_fileScan_pb.GetCorpGroupInfoRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getCorpGroupInfo(request: fileScan_fileScan_pb.GetCorpGroupInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getCorpGroupInfo(request: fileScan_fileScan_pb.GetCorpGroupInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFilesInfo(request: fileScan_fileScan_pb.GetFilesInfoRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFilesInfo(request: fileScan_fileScan_pb.GetFilesInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFilesInfo(request: fileScan_fileScan_pb.GetFilesInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFilePathNames(request: fileScan_fileScan_pb.GetFilePathNamesRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFilePathNames(request: fileScan_fileScan_pb.GetFilePathNamesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getFilePathNames(request: fileScan_fileScan_pb.GetFilePathNamesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadFile(request: fileScan_fileScan_pb.DownloadFileRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadFile(request: fileScan_fileScan_pb.DownloadFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadFile(request: fileScan_fileScan_pb.DownloadFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadFirstRecycleFile(request: fileScan_fileScan_pb.DownloadFirstRecycleFileRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadFirstRecycleFile(request: fileScan_fileScan_pb.DownloadFirstRecycleFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadFirstRecycleFile(request: fileScan_fileScan_pb.DownloadFirstRecycleFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadHistoryFile(request: fileScan_fileScan_pb.DownloadHistoryFileRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadHistoryFile(request: fileScan_fileScan_pb.DownloadHistoryFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public downloadHistoryFile(request: fileScan_fileScan_pb.DownloadHistoryFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createTerm(request: fileScan_fileScan_pb.CreateTermRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createTerm(request: fileScan_fileScan_pb.CreateTermRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createTerm(request: fileScan_fileScan_pb.CreateTermRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public updateTerm(request: fileScan_fileScan_pb.UpdateTermRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public updateTerm(request: fileScan_fileScan_pb.UpdateTermRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public updateTerm(request: fileScan_fileScan_pb.UpdateTermRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getTerm(request: fileScan_fileScan_pb.GetTermRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getTerm(request: fileScan_fileScan_pb.GetTermRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getTerm(request: fileScan_fileScan_pb.GetTermRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createObjectTermsRelation(request: fileScan_fileScan_pb.CreateObjectTermsRelationRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createObjectTermsRelation(request: fileScan_fileScan_pb.CreateObjectTermsRelationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createObjectTermsRelation(request: fileScan_fileScan_pb.CreateObjectTermsRelationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public listObjectTermsRelation(request: fileScan_fileScan_pb.ListObjectTermsRelationRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public listObjectTermsRelation(request: fileScan_fileScan_pb.ListObjectTermsRelationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public listObjectTermsRelation(request: fileScan_fileScan_pb.ListObjectTermsRelationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getObjectTermRelation(request: fileScan_fileScan_pb.GetObjectTermRelationRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getObjectTermRelation(request: fileScan_fileScan_pb.GetObjectTermRelationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getObjectTermRelation(request: fileScan_fileScan_pb.GetObjectTermRelationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public delObjectTermRelation(request: fileScan_fileScan_pb.DelObjectTermRelationRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public delObjectTermRelation(request: fileScan_fileScan_pb.DelObjectTermRelationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public delObjectTermRelation(request: fileScan_fileScan_pb.DelObjectTermRelationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createMetaType(request: fileScan_fileScan_pb.CreateMetaTypeRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createMetaType(request: fileScan_fileScan_pb.CreateMetaTypeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createMetaType(request: fileScan_fileScan_pb.CreateMetaTypeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createMetadata(request: fileScan_fileScan_pb.CreateMetadataRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createMetadata(request: fileScan_fileScan_pb.CreateMetadataRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public createMetadata(request: fileScan_fileScan_pb.CreateMetadataRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public delMetadata(request: fileScan_fileScan_pb.DelMetadataRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public delMetadata(request: fileScan_fileScan_pb.DelMetadataRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public delMetadata(request: fileScan_fileScan_pb.DelMetadataRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public listFile(request: fileScan_fileScan_pb.ListFileRequest, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public listFile(request: fileScan_fileScan_pb.ListFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public listFile(request: fileScan_fileScan_pb.ListFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileScan_fileScan_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

