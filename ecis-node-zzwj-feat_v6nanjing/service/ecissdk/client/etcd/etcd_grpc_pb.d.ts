// package: etcd
// file: etcd/etcd.proto

import * as grpc from '@grpc/grpc-js';
import * as etcd_etcd_pb from '../etcd/etcd_pb';

interface IEtcdServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  put: IEtcdServiceService_Iput;
  get: IEtcdServiceService_Iget;
  delete: IEtcdServiceService_Idelete;
  lock: IEtcdServiceService_Ilock;
  release: IEtcdServiceService_Irelease;
  getAll: IEtcdServiceService_IgetAll;
}

interface IEtcdServiceService_Iput extends grpc.MethodDefinition<etcd_etcd_pb.SetRequest, etcd_etcd_pb.JsonResponse> {
  path: '/etcd.EtcdService/put'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<etcd_etcd_pb.SetRequest>;
  requestDeserialize: grpc.deserialize<etcd_etcd_pb.SetRequest>;
  responseSerialize: grpc.serialize<etcd_etcd_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<etcd_etcd_pb.JsonResponse>;
}

interface IEtcdServiceService_Iget extends grpc.MethodDefinition<etcd_etcd_pb.GetRequest, etcd_etcd_pb.JsonResponse> {
  path: '/etcd.EtcdService/get'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<etcd_etcd_pb.GetRequest>;
  requestDeserialize: grpc.deserialize<etcd_etcd_pb.GetRequest>;
  responseSerialize: grpc.serialize<etcd_etcd_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<etcd_etcd_pb.JsonResponse>;
}

interface IEtcdServiceService_Idelete extends grpc.MethodDefinition<etcd_etcd_pb.DelRequest, etcd_etcd_pb.JsonResponse> {
  path: '/etcd.EtcdService/delete'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<etcd_etcd_pb.DelRequest>;
  requestDeserialize: grpc.deserialize<etcd_etcd_pb.DelRequest>;
  responseSerialize: grpc.serialize<etcd_etcd_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<etcd_etcd_pb.JsonResponse>;
}

interface IEtcdServiceService_Ilock extends grpc.MethodDefinition<etcd_etcd_pb.LockRequest, etcd_etcd_pb.JsonResponse> {
  path: '/etcd.EtcdService/lock'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<etcd_etcd_pb.LockRequest>;
  requestDeserialize: grpc.deserialize<etcd_etcd_pb.LockRequest>;
  responseSerialize: grpc.serialize<etcd_etcd_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<etcd_etcd_pb.JsonResponse>;
}

interface IEtcdServiceService_Irelease extends grpc.MethodDefinition<etcd_etcd_pb.ReleaseRequest, etcd_etcd_pb.JsonResponse> {
  path: '/etcd.EtcdService/release'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<etcd_etcd_pb.ReleaseRequest>;
  requestDeserialize: grpc.deserialize<etcd_etcd_pb.ReleaseRequest>;
  responseSerialize: grpc.serialize<etcd_etcd_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<etcd_etcd_pb.JsonResponse>;
}

interface IEtcdServiceService_IgetAll extends grpc.MethodDefinition<etcd_etcd_pb.GetAllRequest, etcd_etcd_pb.JsonResponse> {
  path: '/etcd.EtcdService/getAll'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<etcd_etcd_pb.GetAllRequest>;
  requestDeserialize: grpc.deserialize<etcd_etcd_pb.GetAllRequest>;
  responseSerialize: grpc.serialize<etcd_etcd_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<etcd_etcd_pb.JsonResponse>;
}

export const EtcdServiceService: IEtcdServiceService;
export interface IEtcdServiceServer extends grpc.UntypedServiceImplementation {
  put: grpc.handleUnaryCall<etcd_etcd_pb.SetRequest, etcd_etcd_pb.JsonResponse>;
  get: grpc.handleUnaryCall<etcd_etcd_pb.GetRequest, etcd_etcd_pb.JsonResponse>;
  delete: grpc.handleUnaryCall<etcd_etcd_pb.DelRequest, etcd_etcd_pb.JsonResponse>;
  lock: grpc.handleUnaryCall<etcd_etcd_pb.LockRequest, etcd_etcd_pb.JsonResponse>;
  release: grpc.handleUnaryCall<etcd_etcd_pb.ReleaseRequest, etcd_etcd_pb.JsonResponse>;
  getAll: grpc.handleUnaryCall<etcd_etcd_pb.GetAllRequest, etcd_etcd_pb.JsonResponse>;
}

export interface IEtcdServiceClient {
  put(request: etcd_etcd_pb.SetRequest, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  put(request: etcd_etcd_pb.SetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  put(request: etcd_etcd_pb.SetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  get(request: etcd_etcd_pb.GetRequest, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  get(request: etcd_etcd_pb.GetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  get(request: etcd_etcd_pb.GetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  delete(request: etcd_etcd_pb.DelRequest, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  delete(request: etcd_etcd_pb.DelRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  delete(request: etcd_etcd_pb.DelRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  lock(request: etcd_etcd_pb.LockRequest, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  lock(request: etcd_etcd_pb.LockRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  lock(request: etcd_etcd_pb.LockRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  release(request: etcd_etcd_pb.ReleaseRequest, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  release(request: etcd_etcd_pb.ReleaseRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  release(request: etcd_etcd_pb.ReleaseRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getAll(request: etcd_etcd_pb.GetAllRequest, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getAll(request: etcd_etcd_pb.GetAllRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getAll(request: etcd_etcd_pb.GetAllRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class EtcdServiceClient extends grpc.Client implements IEtcdServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public put(request: etcd_etcd_pb.SetRequest, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public put(request: etcd_etcd_pb.SetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public put(request: etcd_etcd_pb.SetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public get(request: etcd_etcd_pb.GetRequest, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public get(request: etcd_etcd_pb.GetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public get(request: etcd_etcd_pb.GetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public delete(request: etcd_etcd_pb.DelRequest, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public delete(request: etcd_etcd_pb.DelRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public delete(request: etcd_etcd_pb.DelRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public lock(request: etcd_etcd_pb.LockRequest, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public lock(request: etcd_etcd_pb.LockRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public lock(request: etcd_etcd_pb.LockRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public release(request: etcd_etcd_pb.ReleaseRequest, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public release(request: etcd_etcd_pb.ReleaseRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public release(request: etcd_etcd_pb.ReleaseRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getAll(request: etcd_etcd_pb.GetAllRequest, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getAll(request: etcd_etcd_pb.GetAllRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getAll(request: etcd_etcd_pb.GetAllRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: etcd_etcd_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

