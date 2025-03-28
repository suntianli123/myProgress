// package: cache
// file: cache/cache.proto

import * as grpc from '@grpc/grpc-js';
import * as cache_cache_pb from '../cache/cache_pb';

interface ICacheServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  set: ICacheServiceService_Iset;
  get: ICacheServiceService_Iget;
  del: ICacheServiceService_Idel;
  hSet: ICacheServiceService_IhSet;
  hGet: ICacheServiceService_IhGet;
  hDel: ICacheServiceService_IhDel;
  hGetAll: ICacheServiceService_IhGetAll;
}

interface ICacheServiceService_Iset extends grpc.MethodDefinition<cache_cache_pb.SetRequest, cache_cache_pb.JsonResponse> {
  path: '/cache.CacheService/set'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<cache_cache_pb.SetRequest>;
  requestDeserialize: grpc.deserialize<cache_cache_pb.SetRequest>;
  responseSerialize: grpc.serialize<cache_cache_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<cache_cache_pb.JsonResponse>;
}

interface ICacheServiceService_Iget extends grpc.MethodDefinition<cache_cache_pb.GetRequest, cache_cache_pb.JsonResponse> {
  path: '/cache.CacheService/get'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<cache_cache_pb.GetRequest>;
  requestDeserialize: grpc.deserialize<cache_cache_pb.GetRequest>;
  responseSerialize: grpc.serialize<cache_cache_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<cache_cache_pb.JsonResponse>;
}

interface ICacheServiceService_Idel extends grpc.MethodDefinition<cache_cache_pb.DelRequest, cache_cache_pb.JsonResponse> {
  path: '/cache.CacheService/del'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<cache_cache_pb.DelRequest>;
  requestDeserialize: grpc.deserialize<cache_cache_pb.DelRequest>;
  responseSerialize: grpc.serialize<cache_cache_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<cache_cache_pb.JsonResponse>;
}

interface ICacheServiceService_IhSet extends grpc.MethodDefinition<cache_cache_pb.HSetRequest, cache_cache_pb.JsonResponse> {
  path: '/cache.CacheService/hSet'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<cache_cache_pb.HSetRequest>;
  requestDeserialize: grpc.deserialize<cache_cache_pb.HSetRequest>;
  responseSerialize: grpc.serialize<cache_cache_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<cache_cache_pb.JsonResponse>;
}

interface ICacheServiceService_IhGet extends grpc.MethodDefinition<cache_cache_pb.HGetRequest, cache_cache_pb.JsonResponse> {
  path: '/cache.CacheService/hGet'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<cache_cache_pb.HGetRequest>;
  requestDeserialize: grpc.deserialize<cache_cache_pb.HGetRequest>;
  responseSerialize: grpc.serialize<cache_cache_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<cache_cache_pb.JsonResponse>;
}

interface ICacheServiceService_IhDel extends grpc.MethodDefinition<cache_cache_pb.HDelRequest, cache_cache_pb.JsonResponse> {
  path: '/cache.CacheService/hDel'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<cache_cache_pb.HDelRequest>;
  requestDeserialize: grpc.deserialize<cache_cache_pb.HDelRequest>;
  responseSerialize: grpc.serialize<cache_cache_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<cache_cache_pb.JsonResponse>;
}

interface ICacheServiceService_IhGetAll extends grpc.MethodDefinition<cache_cache_pb.HGetAllRequest, cache_cache_pb.JsonResponse> {
  path: '/cache.CacheService/hGetAll'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<cache_cache_pb.HGetAllRequest>;
  requestDeserialize: grpc.deserialize<cache_cache_pb.HGetAllRequest>;
  responseSerialize: grpc.serialize<cache_cache_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<cache_cache_pb.JsonResponse>;
}

export const CacheServiceService: ICacheServiceService;
export interface ICacheServiceServer extends grpc.UntypedServiceImplementation {
  set: grpc.handleUnaryCall<cache_cache_pb.SetRequest, cache_cache_pb.JsonResponse>;
  get: grpc.handleUnaryCall<cache_cache_pb.GetRequest, cache_cache_pb.JsonResponse>;
  del: grpc.handleUnaryCall<cache_cache_pb.DelRequest, cache_cache_pb.JsonResponse>;
  hSet: grpc.handleUnaryCall<cache_cache_pb.HSetRequest, cache_cache_pb.JsonResponse>;
  hGet: grpc.handleUnaryCall<cache_cache_pb.HGetRequest, cache_cache_pb.JsonResponse>;
  hDel: grpc.handleUnaryCall<cache_cache_pb.HDelRequest, cache_cache_pb.JsonResponse>;
  hGetAll: grpc.handleUnaryCall<cache_cache_pb.HGetAllRequest, cache_cache_pb.JsonResponse>;
}

export interface ICacheServiceClient {
  set(request: cache_cache_pb.SetRequest, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  set(request: cache_cache_pb.SetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  set(request: cache_cache_pb.SetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  get(request: cache_cache_pb.GetRequest, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  get(request: cache_cache_pb.GetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  get(request: cache_cache_pb.GetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  del(request: cache_cache_pb.DelRequest, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  del(request: cache_cache_pb.DelRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  del(request: cache_cache_pb.DelRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  hSet(request: cache_cache_pb.HSetRequest, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  hSet(request: cache_cache_pb.HSetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  hSet(request: cache_cache_pb.HSetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  hGet(request: cache_cache_pb.HGetRequest, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  hGet(request: cache_cache_pb.HGetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  hGet(request: cache_cache_pb.HGetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  hDel(request: cache_cache_pb.HDelRequest, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  hDel(request: cache_cache_pb.HDelRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  hDel(request: cache_cache_pb.HDelRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  hGetAll(request: cache_cache_pb.HGetAllRequest, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  hGetAll(request: cache_cache_pb.HGetAllRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  hGetAll(request: cache_cache_pb.HGetAllRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class CacheServiceClient extends grpc.Client implements ICacheServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public set(request: cache_cache_pb.SetRequest, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public set(request: cache_cache_pb.SetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public set(request: cache_cache_pb.SetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public get(request: cache_cache_pb.GetRequest, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public get(request: cache_cache_pb.GetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public get(request: cache_cache_pb.GetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public del(request: cache_cache_pb.DelRequest, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public del(request: cache_cache_pb.DelRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public del(request: cache_cache_pb.DelRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public hSet(request: cache_cache_pb.HSetRequest, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public hSet(request: cache_cache_pb.HSetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public hSet(request: cache_cache_pb.HSetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public hGet(request: cache_cache_pb.HGetRequest, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public hGet(request: cache_cache_pb.HGetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public hGet(request: cache_cache_pb.HGetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public hDel(request: cache_cache_pb.HDelRequest, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public hDel(request: cache_cache_pb.HDelRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public hDel(request: cache_cache_pb.HDelRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public hGetAll(request: cache_cache_pb.HGetAllRequest, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public hGetAll(request: cache_cache_pb.HGetAllRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public hGetAll(request: cache_cache_pb.HGetAllRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cache_cache_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

