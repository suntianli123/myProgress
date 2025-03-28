// package: secDoc
// file: secdoc.proto

import * as grpc from '@grpc/grpc-js';
import * as secdoc_pb from './secdoc_pb';

interface ISecDocServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  encrypt: ISecDocServiceService_Iencrypt;
  decrypt: ISecDocServiceService_Idecrypt;
  queryDocumentCode: ISecDocServiceService_IqueryDocumentCode;
  updateDocRights: ISecDocServiceService_IupdateDocRights;
  queryUserDepartments: ISecDocServiceService_IqueryUserDepartments;
  getSecureDocumentUpdateUrl: ISecDocServiceService_IgetSecureDocumentUpdateUrl;
  updateSecureDocument: ISecDocServiceService_IupdateSecureDocument;
}

interface ISecDocServiceService_Iencrypt extends grpc.MethodDefinition<secdoc_pb.EncryptParamReq, secdoc_pb.StreamDataResponse> {
  path: '/secDoc.SecDocService/encrypt'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<secdoc_pb.EncryptParamReq>;
  requestDeserialize: grpc.deserialize<secdoc_pb.EncryptParamReq>;
  responseSerialize: grpc.serialize<secdoc_pb.StreamDataResponse>;
  responseDeserialize: grpc.deserialize<secdoc_pb.StreamDataResponse>;
}

interface ISecDocServiceService_Idecrypt extends grpc.MethodDefinition<secdoc_pb.DecryptParamReq, secdoc_pb.StreamDataResponse> {
  path: '/secDoc.SecDocService/decrypt'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<secdoc_pb.DecryptParamReq>;
  requestDeserialize: grpc.deserialize<secdoc_pb.DecryptParamReq>;
  responseSerialize: grpc.serialize<secdoc_pb.StreamDataResponse>;
  responseDeserialize: grpc.deserialize<secdoc_pb.StreamDataResponse>;
}

interface ISecDocServiceService_IqueryDocumentCode extends grpc.MethodDefinition<secdoc_pb.QueryDocumentParamReq, secdoc_pb.JsonDataResponse> {
  path: '/secDoc.SecDocService/queryDocumentCode'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<secdoc_pb.QueryDocumentParamReq>;
  requestDeserialize: grpc.deserialize<secdoc_pb.QueryDocumentParamReq>;
  responseSerialize: grpc.serialize<secdoc_pb.JsonDataResponse>;
  responseDeserialize: grpc.deserialize<secdoc_pb.JsonDataResponse>;
}

interface ISecDocServiceService_IupdateDocRights extends grpc.MethodDefinition<secdoc_pb.UpdateDocRightsParamReq, secdoc_pb.JsonDataResponse> {
  path: '/secDoc.SecDocService/updateDocRights'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<secdoc_pb.UpdateDocRightsParamReq>;
  requestDeserialize: grpc.deserialize<secdoc_pb.UpdateDocRightsParamReq>;
  responseSerialize: grpc.serialize<secdoc_pb.JsonDataResponse>;
  responseDeserialize: grpc.deserialize<secdoc_pb.JsonDataResponse>;
}

interface ISecDocServiceService_IqueryUserDepartments extends grpc.MethodDefinition<secdoc_pb.QueryUserDepartmentsReq, secdoc_pb.JsonDataResponse> {
  path: '/secDoc.SecDocService/queryUserDepartments'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<secdoc_pb.QueryUserDepartmentsReq>;
  requestDeserialize: grpc.deserialize<secdoc_pb.QueryUserDepartmentsReq>;
  responseSerialize: grpc.serialize<secdoc_pb.JsonDataResponse>;
  responseDeserialize: grpc.deserialize<secdoc_pb.JsonDataResponse>;
}

interface ISecDocServiceService_IgetSecureDocumentUpdateUrl extends grpc.MethodDefinition<secdoc_pb.GetSecureDocumentUpdateUrlReq, secdoc_pb.JsonDataResponse> {
  path: '/secDoc.SecDocService/getSecureDocumentUpdateUrl'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<secdoc_pb.GetSecureDocumentUpdateUrlReq>;
  requestDeserialize: grpc.deserialize<secdoc_pb.GetSecureDocumentUpdateUrlReq>;
  responseSerialize: grpc.serialize<secdoc_pb.JsonDataResponse>;
  responseDeserialize: grpc.deserialize<secdoc_pb.JsonDataResponse>;
}

interface ISecDocServiceService_IupdateSecureDocument extends grpc.MethodDefinition<secdoc_pb.UpdateSecureDocumentReq, secdoc_pb.JsonDataResponse> {
  path: '/secDoc.SecDocService/updateSecureDocument'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<secdoc_pb.UpdateSecureDocumentReq>;
  requestDeserialize: grpc.deserialize<secdoc_pb.UpdateSecureDocumentReq>;
  responseSerialize: grpc.serialize<secdoc_pb.JsonDataResponse>;
  responseDeserialize: grpc.deserialize<secdoc_pb.JsonDataResponse>;
}

export const SecDocServiceService: ISecDocServiceService;
export interface ISecDocServiceServer extends grpc.UntypedServiceImplementation {
  encrypt: grpc.handleUnaryCall<secdoc_pb.EncryptParamReq, secdoc_pb.StreamDataResponse>;
  decrypt: grpc.handleUnaryCall<secdoc_pb.DecryptParamReq, secdoc_pb.StreamDataResponse>;
  queryDocumentCode: grpc.handleUnaryCall<secdoc_pb.QueryDocumentParamReq, secdoc_pb.JsonDataResponse>;
  updateDocRights: grpc.handleUnaryCall<secdoc_pb.UpdateDocRightsParamReq, secdoc_pb.JsonDataResponse>;
  queryUserDepartments: grpc.handleUnaryCall<secdoc_pb.QueryUserDepartmentsReq, secdoc_pb.JsonDataResponse>;
  getSecureDocumentUpdateUrl: grpc.handleUnaryCall<secdoc_pb.GetSecureDocumentUpdateUrlReq, secdoc_pb.JsonDataResponse>;
  updateSecureDocument: grpc.handleUnaryCall<secdoc_pb.UpdateSecureDocumentReq, secdoc_pb.JsonDataResponse>;
}

export interface ISecDocServiceClient {
  encrypt(request: secdoc_pb.EncryptParamReq, callback: (error: grpc.ServiceError | null, response: secdoc_pb.StreamDataResponse) => void): grpc.ClientUnaryCall;
  encrypt(request: secdoc_pb.EncryptParamReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secdoc_pb.StreamDataResponse) => void): grpc.ClientUnaryCall;
  encrypt(request: secdoc_pb.EncryptParamReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secdoc_pb.StreamDataResponse) => void): grpc.ClientUnaryCall;
  decrypt(request: secdoc_pb.DecryptParamReq, callback: (error: grpc.ServiceError | null, response: secdoc_pb.StreamDataResponse) => void): grpc.ClientUnaryCall;
  decrypt(request: secdoc_pb.DecryptParamReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secdoc_pb.StreamDataResponse) => void): grpc.ClientUnaryCall;
  decrypt(request: secdoc_pb.DecryptParamReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secdoc_pb.StreamDataResponse) => void): grpc.ClientUnaryCall;
  queryDocumentCode(request: secdoc_pb.QueryDocumentParamReq, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  queryDocumentCode(request: secdoc_pb.QueryDocumentParamReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  queryDocumentCode(request: secdoc_pb.QueryDocumentParamReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  updateDocRights(request: secdoc_pb.UpdateDocRightsParamReq, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  updateDocRights(request: secdoc_pb.UpdateDocRightsParamReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  updateDocRights(request: secdoc_pb.UpdateDocRightsParamReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  queryUserDepartments(request: secdoc_pb.QueryUserDepartmentsReq, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  queryUserDepartments(request: secdoc_pb.QueryUserDepartmentsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  queryUserDepartments(request: secdoc_pb.QueryUserDepartmentsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  getSecureDocumentUpdateUrl(request: secdoc_pb.GetSecureDocumentUpdateUrlReq, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  getSecureDocumentUpdateUrl(request: secdoc_pb.GetSecureDocumentUpdateUrlReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  getSecureDocumentUpdateUrl(request: secdoc_pb.GetSecureDocumentUpdateUrlReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  updateSecureDocument(request: secdoc_pb.UpdateSecureDocumentReq, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  updateSecureDocument(request: secdoc_pb.UpdateSecureDocumentReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  updateSecureDocument(request: secdoc_pb.UpdateSecureDocumentReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
}

export class SecDocServiceClient extends grpc.Client implements ISecDocServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public encrypt(request: secdoc_pb.EncryptParamReq, callback: (error: grpc.ServiceError | null, response: secdoc_pb.StreamDataResponse) => void): grpc.ClientUnaryCall;
  public encrypt(request: secdoc_pb.EncryptParamReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secdoc_pb.StreamDataResponse) => void): grpc.ClientUnaryCall;
  public encrypt(request: secdoc_pb.EncryptParamReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secdoc_pb.StreamDataResponse) => void): grpc.ClientUnaryCall;
  public decrypt(request: secdoc_pb.DecryptParamReq, callback: (error: grpc.ServiceError | null, response: secdoc_pb.StreamDataResponse) => void): grpc.ClientUnaryCall;
  public decrypt(request: secdoc_pb.DecryptParamReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secdoc_pb.StreamDataResponse) => void): grpc.ClientUnaryCall;
  public decrypt(request: secdoc_pb.DecryptParamReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secdoc_pb.StreamDataResponse) => void): grpc.ClientUnaryCall;
  public queryDocumentCode(request: secdoc_pb.QueryDocumentParamReq, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  public queryDocumentCode(request: secdoc_pb.QueryDocumentParamReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  public queryDocumentCode(request: secdoc_pb.QueryDocumentParamReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  public updateDocRights(request: secdoc_pb.UpdateDocRightsParamReq, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  public updateDocRights(request: secdoc_pb.UpdateDocRightsParamReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  public updateDocRights(request: secdoc_pb.UpdateDocRightsParamReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  public queryUserDepartments(request: secdoc_pb.QueryUserDepartmentsReq, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  public queryUserDepartments(request: secdoc_pb.QueryUserDepartmentsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  public queryUserDepartments(request: secdoc_pb.QueryUserDepartmentsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  public getSecureDocumentUpdateUrl(request: secdoc_pb.GetSecureDocumentUpdateUrlReq, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  public getSecureDocumentUpdateUrl(request: secdoc_pb.GetSecureDocumentUpdateUrlReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  public getSecureDocumentUpdateUrl(request: secdoc_pb.GetSecureDocumentUpdateUrlReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  public updateSecureDocument(request: secdoc_pb.UpdateSecureDocumentReq, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  public updateSecureDocument(request: secdoc_pb.UpdateSecureDocumentReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
  public updateSecureDocument(request: secdoc_pb.UpdateSecureDocumentReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secdoc_pb.JsonDataResponse) => void): grpc.ClientUnaryCall;
}

