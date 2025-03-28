// package: devAccount
// file: devAccount/devAccount.proto

import * as grpc from '@grpc/grpc-js';
import * as devAccount_devAccount_pb from '../devAccount/devAccount_pb';

interface IDevAccountServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getUserById: IDevAccountServiceService_IgetUserById;
}

interface IDevAccountServiceService_IgetUserById extends grpc.MethodDefinition<devAccount_devAccount_pb.GetUserByIdRequest, devAccount_devAccount_pb.JsonResponse> {
  path: '/devAccount.DevAccountService/getUserById'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<devAccount_devAccount_pb.GetUserByIdRequest>;
  requestDeserialize: grpc.deserialize<devAccount_devAccount_pb.GetUserByIdRequest>;
  responseSerialize: grpc.serialize<devAccount_devAccount_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<devAccount_devAccount_pb.JsonResponse>;
}

export const DevAccountServiceService: IDevAccountServiceService;
export interface IDevAccountServiceServer extends grpc.UntypedServiceImplementation {
  getUserById: grpc.handleUnaryCall<devAccount_devAccount_pb.GetUserByIdRequest, devAccount_devAccount_pb.JsonResponse>;
}

export interface IDevAccountServiceClient {
  getUserById(request: devAccount_devAccount_pb.GetUserByIdRequest, callback: (error: grpc.ServiceError | null, response: devAccount_devAccount_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getUserById(request: devAccount_devAccount_pb.GetUserByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: devAccount_devAccount_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  getUserById(request: devAccount_devAccount_pb.GetUserByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: devAccount_devAccount_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class DevAccountServiceClient extends grpc.Client implements IDevAccountServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public getUserById(request: devAccount_devAccount_pb.GetUserByIdRequest, callback: (error: grpc.ServiceError | null, response: devAccount_devAccount_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getUserById(request: devAccount_devAccount_pb.GetUserByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: devAccount_devAccount_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public getUserById(request: devAccount_devAccount_pb.GetUserByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: devAccount_devAccount_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

