// package: appAuth
// file: appAuth/appAuth.proto

import * as grpc from '@grpc/grpc-js';
import * as appAuth_appAuth_pb from '../appAuth/appAuth_pb';

interface IAppAuthServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  auth: IAppAuthServiceService_Iauth;
}

interface IAppAuthServiceService_Iauth extends grpc.MethodDefinition<appAuth_appAuth_pb.AuthRequest, appAuth_appAuth_pb.AuthResponse> {
  path: '/appAuth.AppAuthService/auth'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<appAuth_appAuth_pb.AuthRequest>;
  requestDeserialize: grpc.deserialize<appAuth_appAuth_pb.AuthRequest>;
  responseSerialize: grpc.serialize<appAuth_appAuth_pb.AuthResponse>;
  responseDeserialize: grpc.deserialize<appAuth_appAuth_pb.AuthResponse>;
}

export const AppAuthServiceService: IAppAuthServiceService;
export interface IAppAuthServiceServer extends grpc.UntypedServiceImplementation {
  auth: grpc.handleUnaryCall<appAuth_appAuth_pb.AuthRequest, appAuth_appAuth_pb.AuthResponse>;
}

export interface IAppAuthServiceClient {
  auth(request: appAuth_appAuth_pb.AuthRequest, callback: (error: grpc.ServiceError | null, response: appAuth_appAuth_pb.AuthResponse) => void): grpc.ClientUnaryCall;
  auth(request: appAuth_appAuth_pb.AuthRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: appAuth_appAuth_pb.AuthResponse) => void): grpc.ClientUnaryCall;
  auth(request: appAuth_appAuth_pb.AuthRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: appAuth_appAuth_pb.AuthResponse) => void): grpc.ClientUnaryCall;
}

export class AppAuthServiceClient extends grpc.Client implements IAppAuthServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public auth(request: appAuth_appAuth_pb.AuthRequest, callback: (error: grpc.ServiceError | null, response: appAuth_appAuth_pb.AuthResponse) => void): grpc.ClientUnaryCall;
  public auth(request: appAuth_appAuth_pb.AuthRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: appAuth_appAuth_pb.AuthResponse) => void): grpc.ClientUnaryCall;
  public auth(request: appAuth_appAuth_pb.AuthRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: appAuth_appAuth_pb.AuthResponse) => void): grpc.ClientUnaryCall;
}

