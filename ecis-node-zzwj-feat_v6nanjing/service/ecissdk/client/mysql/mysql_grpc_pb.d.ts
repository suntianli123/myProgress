// package: mysql
// file: mysql/mysql.proto

import * as grpc from '@grpc/grpc-js';
import * as mysql_mysql_pb from '../mysql/mysql_pb';

interface IMysqlServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  select: IMysqlServiceService_Iselect;
  update: IMysqlServiceService_Iupdate;
  insert: IMysqlServiceService_Iinsert;
  delete: IMysqlServiceService_Idelete;
}

interface IMysqlServiceService_Iselect extends grpc.MethodDefinition<mysql_mysql_pb.CommonRequest, mysql_mysql_pb.JsonResponse> {
  path: '/mysql.MysqlService/select'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<mysql_mysql_pb.CommonRequest>;
  requestDeserialize: grpc.deserialize<mysql_mysql_pb.CommonRequest>;
  responseSerialize: grpc.serialize<mysql_mysql_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<mysql_mysql_pb.JsonResponse>;
}

interface IMysqlServiceService_Iupdate extends grpc.MethodDefinition<mysql_mysql_pb.CommonRequest, mysql_mysql_pb.JsonResponse> {
  path: '/mysql.MysqlService/update'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<mysql_mysql_pb.CommonRequest>;
  requestDeserialize: grpc.deserialize<mysql_mysql_pb.CommonRequest>;
  responseSerialize: grpc.serialize<mysql_mysql_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<mysql_mysql_pb.JsonResponse>;
}

interface IMysqlServiceService_Iinsert extends grpc.MethodDefinition<mysql_mysql_pb.CommonRequest, mysql_mysql_pb.JsonResponse> {
  path: '/mysql.MysqlService/insert'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<mysql_mysql_pb.CommonRequest>;
  requestDeserialize: grpc.deserialize<mysql_mysql_pb.CommonRequest>;
  responseSerialize: grpc.serialize<mysql_mysql_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<mysql_mysql_pb.JsonResponse>;
}

interface IMysqlServiceService_Idelete extends grpc.MethodDefinition<mysql_mysql_pb.CommonRequest, mysql_mysql_pb.JsonResponse> {
  path: '/mysql.MysqlService/delete'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<mysql_mysql_pb.CommonRequest>;
  requestDeserialize: grpc.deserialize<mysql_mysql_pb.CommonRequest>;
  responseSerialize: grpc.serialize<mysql_mysql_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<mysql_mysql_pb.JsonResponse>;
}

export const MysqlServiceService: IMysqlServiceService;
export interface IMysqlServiceServer extends grpc.UntypedServiceImplementation {
  select: grpc.handleUnaryCall<mysql_mysql_pb.CommonRequest, mysql_mysql_pb.JsonResponse>;
  update: grpc.handleUnaryCall<mysql_mysql_pb.CommonRequest, mysql_mysql_pb.JsonResponse>;
  insert: grpc.handleUnaryCall<mysql_mysql_pb.CommonRequest, mysql_mysql_pb.JsonResponse>;
  delete: grpc.handleUnaryCall<mysql_mysql_pb.CommonRequest, mysql_mysql_pb.JsonResponse>;
}

export interface IMysqlServiceClient {
  select(request: mysql_mysql_pb.CommonRequest, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  select(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  select(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  update(request: mysql_mysql_pb.CommonRequest, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  update(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  update(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  insert(request: mysql_mysql_pb.CommonRequest, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  insert(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  insert(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  delete(request: mysql_mysql_pb.CommonRequest, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  delete(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  delete(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class MysqlServiceClient extends grpc.Client implements IMysqlServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public select(request: mysql_mysql_pb.CommonRequest, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public select(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public select(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public update(request: mysql_mysql_pb.CommonRequest, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public update(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public update(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public insert(request: mysql_mysql_pb.CommonRequest, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public insert(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public insert(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public delete(request: mysql_mysql_pb.CommonRequest, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public delete(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public delete(request: mysql_mysql_pb.CommonRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mysql_mysql_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

