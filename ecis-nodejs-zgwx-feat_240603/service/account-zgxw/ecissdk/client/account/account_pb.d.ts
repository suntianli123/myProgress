// package: account
// file: account/account.proto

import * as jspb from 'google-protobuf';

export class IsLoginRequest extends jspb.Message {
  getWpsSid(): string;
  setWpsSid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IsLoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IsLoginRequest): IsLoginRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IsLoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IsLoginRequest;
  static deserializeBinaryFromReader(message: IsLoginRequest, reader: jspb.BinaryReader): IsLoginRequest;
}

export namespace IsLoginRequest {
  export type AsObject = {
    wpsSid: string,
  }
}

export class GetUserBySidRequest extends jspb.Message {
  getWpsSid(): string;
  setWpsSid(value: string): void;

  getCsrf(): string;
  setCsrf(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserBySidRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserBySidRequest): GetUserBySidRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserBySidRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserBySidRequest;
  static deserializeBinaryFromReader(message: GetUserBySidRequest, reader: jspb.BinaryReader): GetUserBySidRequest;
}

export namespace GetUserBySidRequest {
  export type AsObject = {
    wpsSid: string,
    csrf: string,
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

