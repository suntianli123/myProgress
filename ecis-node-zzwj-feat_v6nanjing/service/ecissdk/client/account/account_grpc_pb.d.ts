// package: account
// file: account/account.proto

import * as grpc from '@grpc/grpc-js'
import * as account_account_pb from '../account/account_pb'

interface IAccountServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  isLogin: IAccountServiceService_IisLogin;
  getUserBySid: IAccountServiceService_IgetUserBySid;
}

interface IAccountServiceService_IisLogin extends grpc.MethodDefinition<account_account_pb.IsLoginRequest, account_account_pb.JsonResponse> {
  path: '/account.AccountService/isLogin'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<account_account_pb.IsLoginRequest>;
  requestDeserialize: grpc.deserialize<account_account_pb.IsLoginRequest>;
  responseSerialize: grpc.serialize<account_account_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<account_account_pb.JsonResponse>;
}

interface IAccountServiceService_IgetUserBySid extends grpc.MethodDefinition<account_account_pb.GetUserBySidRequest, account_account_pb.JsonResponse> {
  path: '/account.AccountService/getUserBySid'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<account_account_pb.GetUserBySidRequest>;
  requestDeserialize: grpc.deserialize<account_account_pb.GetUserBySidRequest>;
  responseSerialize: grpc.serialize<account_account_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<account_account_pb.JsonResponse>;
}

export const AccountServiceService: IAccountServiceService
export interface IAccountServiceServer extends grpc.UntypedServiceImplementation {
  isLogin: grpc.handleUnaryCall<account_account_pb.IsLoginRequest, account_account_pb.JsonResponse>;
  getUserBySid: grpc.handleUnaryCall<account_account_pb.GetUserBySidRequest, account_account_pb.JsonResponse>;
}

export interface IAccountServiceClient {
  isLogin(request: account_account_pb.IsLoginRequest, callback: (error: grpc.ServiceError | null, response: account_account_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  isLogin(request: account_account_pb.IsLoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: account_account_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  isLogin(request: account_account_pb.IsLoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: account_account_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getUserBySid(request: account_account_pb.GetUserBySidRequest, callback: (error: grpc.ServiceError | null, response: account_account_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getUserBySid(request: account_account_pb.GetUserBySidRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: account_account_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getUserBySid(request: account_account_pb.GetUserBySidRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: account_account_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class AccountServiceClient extends grpc.Client implements IAccountServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public isLogin(request: account_account_pb.IsLoginRequest, callback: (error: grpc.ServiceError | null, response: account_account_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public isLogin(request: account_account_pb.IsLoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: account_account_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public isLogin(request: account_account_pb.IsLoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: account_account_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getUserBySid(request: account_account_pb.GetUserBySidRequest, callback: (error: grpc.ServiceError | null, response: account_account_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getUserBySid(request: account_account_pb.GetUserBySidRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: account_account_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getUserBySid(request: account_account_pb.GetUserBySidRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: account_account_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}
