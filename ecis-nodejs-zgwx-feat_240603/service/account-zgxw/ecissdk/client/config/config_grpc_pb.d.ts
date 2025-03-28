// package: config
// file: config/config.proto

import * as grpc from '@grpc/grpc-js';
import * as config_config_pb from '../config/config_pb';

interface IConfigServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  put: IConfigServiceService_Iput;
  get: IConfigServiceService_Iget;
}

interface IConfigServiceService_Iput extends grpc.MethodDefinition<config_config_pb.ConfigSetRequest, config_config_pb.JsonResponse> {
  path: '/config.ConfigService/put'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<config_config_pb.ConfigSetRequest>;
  requestDeserialize: grpc.deserialize<config_config_pb.ConfigSetRequest>;
  responseSerialize: grpc.serialize<config_config_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<config_config_pb.JsonResponse>;
}

interface IConfigServiceService_Iget extends grpc.MethodDefinition<config_config_pb.ConfigGetRequest, config_config_pb.JsonResponse> {
  path: '/config.ConfigService/get'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<config_config_pb.ConfigGetRequest>;
  requestDeserialize: grpc.deserialize<config_config_pb.ConfigGetRequest>;
  responseSerialize: grpc.serialize<config_config_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<config_config_pb.JsonResponse>;
}

export const ConfigServiceService: IConfigServiceService;
export interface IConfigServiceServer extends grpc.UntypedServiceImplementation {
  put: grpc.handleUnaryCall<config_config_pb.ConfigSetRequest, config_config_pb.JsonResponse>;
  get: grpc.handleUnaryCall<config_config_pb.ConfigGetRequest, config_config_pb.JsonResponse>;
}

export interface IConfigServiceClient {
  put(request: config_config_pb.ConfigSetRequest, callback: (error: grpc.ServiceError | null, response: config_config_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  put(request: config_config_pb.ConfigSetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: config_config_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  put(request: config_config_pb.ConfigSetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: config_config_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  get(request: config_config_pb.ConfigGetRequest, callback: (error: grpc.ServiceError | null, response: config_config_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  get(request: config_config_pb.ConfigGetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: config_config_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  get(request: config_config_pb.ConfigGetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: config_config_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class ConfigServiceClient extends grpc.Client implements IConfigServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public put(request: config_config_pb.ConfigSetRequest, callback: (error: grpc.ServiceError | null, response: config_config_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public put(request: config_config_pb.ConfigSetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: config_config_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public put(request: config_config_pb.ConfigSetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: config_config_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public get(request: config_config_pb.ConfigGetRequest, callback: (error: grpc.ServiceError | null, response: config_config_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public get(request: config_config_pb.ConfigGetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: config_config_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public get(request: config_config_pb.ConfigGetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: config_config_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

