// package: devWpsplus
// file: devWpsplus/devWpsplus.proto

import * as jspb from 'google-protobuf';

export class GetCompUsersRequest extends jspb.Message {
  getCompId(): string;
  setCompId(value: string): void;

  getQueryStr(): string;
  setQueryStr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCompUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCompUsersRequest): GetCompUsersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCompUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCompUsersRequest;
  static deserializeBinaryFromReader(message: GetCompUsersRequest, reader: jspb.BinaryReader): GetCompUsersRequest;
}

export namespace GetCompUsersRequest {
  export type AsObject = {
    compId: string,
    queryStr: string,
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

