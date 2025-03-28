// package: devWpsplus
// file: devWpsplus/devWpsplus.proto

import * as grpc from '@grpc/grpc-js';
import * as devWpsplus_devWpsplus_pb from '../devWpsplus/devWpsplus_pb';

interface IDevWpsplusServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getCompUsers: IDevWpsplusServiceService_IgetCompUsers;
}

interface IDevWpsplusServiceService_IgetCompUsers extends grpc.MethodDefinition<devWpsplus_devWpsplus_pb.GetCompUsersRequest, devWpsplus_devWpsplus_pb.JsonResponse> {
  path: '/devWpsplus.DevWpsplusService/getCompUsers'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<devWpsplus_devWpsplus_pb.GetCompUsersRequest>;
  requestDeserialize: grpc.deserialize<devWpsplus_devWpsplus_pb.GetCompUsersRequest>;
  responseSerialize: grpc.serialize<devWpsplus_devWpsplus_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<devWpsplus_devWpsplus_pb.JsonResponse>;
}

export const DevWpsplusServiceService: IDevWpsplusServiceService;
export interface IDevWpsplusServiceServer extends grpc.UntypedServiceImplementation {
  getCompUsers: grpc.handleUnaryCall<devWpsplus_devWpsplus_pb.GetCompUsersRequest, devWpsplus_devWpsplus_pb.JsonResponse>;
}

export interface IDevWpsplusServiceClient {
  getCompUsers(request: devWpsplus_devWpsplus_pb.GetCompUsersRequest, callback: (error: grpc.ServiceError | null, response: devWpsplus_devWpsplus_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getCompUsers(request: devWpsplus_devWpsplus_pb.GetCompUsersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: devWpsplus_devWpsplus_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getCompUsers(request: devWpsplus_devWpsplus_pb.GetCompUsersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: devWpsplus_devWpsplus_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class DevWpsplusServiceClient extends grpc.Client implements IDevWpsplusServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public getCompUsers(request: devWpsplus_devWpsplus_pb.GetCompUsersRequest, callback: (error: grpc.ServiceError | null, response: devWpsplus_devWpsplus_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getCompUsers(request: devWpsplus_devWpsplus_pb.GetCompUsersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: devWpsplus_devWpsplus_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getCompUsers(request: devWpsplus_devWpsplus_pb.GetCompUsersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: devWpsplus_devWpsplus_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

