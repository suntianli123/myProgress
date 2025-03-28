// package: wpsplus
// file: wpsplus/wpsplus.proto

import * as jspb from 'google-protobuf';

export class GetDeptUsersRequest extends jspb.Message {
  getCompId(): string;
  setCompId(value: string): void;

  getDeptId(): string;
  setDeptId(value: string): void;

  getQueryStr(): string;
  setQueryStr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDeptUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDeptUsersRequest): GetDeptUsersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetDeptUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDeptUsersRequest;
  static deserializeBinaryFromReader(message: GetDeptUsersRequest, reader: jspb.BinaryReader): GetDeptUsersRequest;
}

export namespace GetDeptUsersRequest {
  export type AsObject = {
    compId: string,
    deptId: string,
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

