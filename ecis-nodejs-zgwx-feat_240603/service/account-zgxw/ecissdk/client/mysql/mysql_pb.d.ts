// package: mysql
// file: mysql/mysql.proto

import * as jspb from 'google-protobuf';

export class CommonRequest extends jspb.Message {
  getDbname(): string;
  setDbname(value: string): void;

  getSql(): string;
  setSql(value: string): void;

  getValues(): string;
  setValues(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommonRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CommonRequest): CommonRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommonRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommonRequest;
  static deserializeBinaryFromReader(message: CommonRequest, reader: jspb.BinaryReader): CommonRequest;
}

export namespace CommonRequest {
  export type AsObject = {
    dbname: string,
    sql: string,
    values: string,
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

