// package: globalRouter
// file: globalRouter/globalRouter.proto

import * as grpc from '@grpc/grpc-js';
import * as globalRouter_globalRouter_pb from '../globalRouter/globalRouter_pb';

interface IGlobalRouterServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  bindRoute: IGlobalRouterServiceService_IbindRoute;
}

interface IGlobalRouterServiceService_IbindRoute extends grpc.MethodDefinition<globalRouter_globalRouter_pb.BindRouteRequest, globalRouter_globalRouter_pb.JsonResponse> {
  path: '/globalRouter.GlobalRouterService/bindRoute'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<globalRouter_globalRouter_pb.BindRouteRequest>;
  requestDeserialize: grpc.deserialize<globalRouter_globalRouter_pb.BindRouteRequest>;
  responseSerialize: grpc.serialize<globalRouter_globalRouter_pb.JsonResponse>;
  responseDeserialize: grpc.deserialize<globalRouter_globalRouter_pb.JsonResponse>;
}

export const GlobalRouterServiceService: IGlobalRouterServiceService;
export interface IGlobalRouterServiceServer extends grpc.UntypedServiceImplementation {
  bindRoute: grpc.handleUnaryCall<globalRouter_globalRouter_pb.BindRouteRequest, globalRouter_globalRouter_pb.JsonResponse>;
}

export interface IGlobalRouterServiceClient {
  bindRoute(request: globalRouter_globalRouter_pb.BindRouteRequest, callback: (error: grpc.ServiceError | null, response: globalRouter_globalRouter_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  bindRoute(request: globalRouter_globalRouter_pb.BindRouteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: globalRouter_globalRouter_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  bindRoute(request: globalRouter_globalRouter_pb.BindRouteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: globalRouter_globalRouter_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

export class GlobalRouterServiceClient extends grpc.Client implements IGlobalRouterServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public bindRoute(request: globalRouter_globalRouter_pb.BindRouteRequest, callback: (error: grpc.ServiceError | null, response: globalRouter_globalRouter_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public bindRoute(request: globalRouter_globalRouter_pb.BindRouteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: globalRouter_globalRouter_pb.JsonResponse) => void): grpc.ClientUnaryCall;
  public bindRoute(request: globalRouter_globalRouter_pb.BindRouteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: globalRouter_globalRouter_pb.JsonResponse) => void): grpc.ClientUnaryCall;
}

