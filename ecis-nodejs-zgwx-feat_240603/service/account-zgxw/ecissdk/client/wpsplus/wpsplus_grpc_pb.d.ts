// package: wpsplus
// file: wpsplus/wpsplus.proto

import * as grpc from '@grpc/grpc-js';
import * as wpsplus_wpsplus_pb from '../wpsplus/wpsplus_pb';

interface IWpsplusServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getDeptUsers: IWpsplusServiceService_IgetDeptUsers;
}

interface IWpsplusServiceService_IgetDeptUsers extends grpc.MethodDefinition<wpsplus_wpsplus_pb.GetDeptUsersRequest, wpsplus_wpsplus_pb.JsonResponse> {
  path: '/wpsplus.WpsplusService/getDeptUsers'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<wpsplus_wpsplus_pb.GetDeptUsersRequest>;
  requestDeserialize: grpc.deserialize<wpsplus_wpsplus_pb.GetDeptUsersRequest>;
  responseSerialize: grpc.serialize<wpsplus_wpsplus_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<wpsplus_wpsplus_pb.JsonResponse>;
}

export const WpsplusServiceService: IWpsplusServiceService;
export interface IWpsplusServiceServer extends grpc.UntypedServiceImplementation {
  getDeptUsers: grpc.handleUnaryCall<wpsplus_wpsplus_pb.GetDeptUsersRequest, wpsplus_wpsplus_pb.JsonResponse>;
}

export interface IWpsplusServiceClient {
  getDeptUsers(request: wpsplus_wpsplus_pb.GetDeptUsersRequest, callback: (error: grpc.ServiceError | null, response: wpsplus_wpsplus_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getDeptUsers(request: wpsplus_wpsplus_pb.GetDeptUsersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wpsplus_wpsplus_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getDeptUsers(request: wpsplus_wpsplus_pb.GetDeptUsersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wpsplus_wpsplus_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class WpsplusServiceClient extends grpc.Client implements IWpsplusServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public getDeptUsers(request: wpsplus_wpsplus_pb.GetDeptUsersRequest, callback: (error: grpc.ServiceError | null, response: wpsplus_wpsplus_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getDeptUsers(request: wpsplus_wpsplus_pb.GetDeptUsersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wpsplus_wpsplus_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getDeptUsers(request: wpsplus_wpsplus_pb.GetDeptUsersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wpsplus_wpsplus_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

