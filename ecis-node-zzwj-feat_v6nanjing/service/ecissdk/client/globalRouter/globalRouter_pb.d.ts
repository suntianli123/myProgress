// package: globalRouter
// file: globalRouter/globalRouter.proto

import * as jspb from 'google-protobuf';

export class BindRouteRequest extends jspb.Message {
  getSrcRoutePath(): string;
  setSrcRoutePath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BindRouteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BindRouteRequest): BindRouteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BindRouteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BindRouteRequest;
  static deserializeBinaryFromReader(message: BindRouteRequest, reader: jspb.BinaryReader): BindRouteRequest;
}

export namespace BindRouteRequest {
  export type AsObject = {
    srcRoutePath: string,
  }
}

export class JsonResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  getData(): string;
  setData(value: string): void;

  getMsg(): string;
  setMsg(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JsonResponse.AsObject;
  static toObject(includeInstance: boolean, msg: JsonResponse): JsonResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: JsonResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JsonResponse;
  static deserializeBinaryFromReader(message: JsonResponse, reader: jspb.BinaryReader): JsonResponse;
}

export namespace JsonResponse {
  export type AsObject = {
    result: string,
    data: string,
    msg: string,
  }
}

