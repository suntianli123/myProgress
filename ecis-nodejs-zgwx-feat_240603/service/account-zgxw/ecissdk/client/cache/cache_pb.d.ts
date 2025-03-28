// package: cache
// file: cache/cache.proto

import * as jspb from 'google-protobuf';

export class SetRequest extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  getExpire(): string;
  setExpire(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetRequest): SetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetRequest;
  static deserializeBinaryFromReader(message: SetRequest, reader: jspb.BinaryReader): SetRequest;
}

export namespace SetRequest {
  export type AsObject = {
    key: string,
    value: string,
    expire: string,
  }
}

export class GetRequest extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRequest): GetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRequest;
  static deserializeBinaryFromReader(message: GetRequest, reader: jspb.BinaryReader): GetRequest;
}

export namespace GetRequest {
  export type AsObject = {
    key: string,
  }
}

export class DelRequest extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DelRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DelRequest): DelRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DelRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DelRequest;
  static deserializeBinaryFromReader(message: DelRequest, reader: jspb.BinaryReader): DelRequest;
}

export namespace DelRequest {
  export type AsObject = {
    key: string,
  }
}

export class HSetRequest extends jspb.Message {
  getHash(): string;
  setHash(value: string): void;

  getField(): string;
  setField(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HSetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HSetRequest): HSetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HSetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HSetRequest;
  static deserializeBinaryFromReader(message: HSetRequest, reader: jspb.BinaryReader): HSetRequest;
}

export namespace HSetRequest {
  export type AsObject = {
    hash: string,
    field: string,
    value: string,
  }
}

export class HGetRequest extends jspb.Message {
  getHash(): string;
  setHash(value: string): void;

  getField(): string;
  setField(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HGetRequest): HGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HGetRequest;
  static deserializeBinaryFromReader(message: HGetRequest, reader: jspb.BinaryReader): HGetRequest;
}

export namespace HGetRequest {
  export type AsObject = {
    hash: string,
    field: string,
  }
}

export class HDelRequest extends jspb.Message {
  getHash(): string;
  setHash(value: string): void;

  getField(): string;
  setField(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HDelRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HDelRequest): HDelRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HDelRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HDelRequest;
  static deserializeBinaryFromReader(message: HDelRequest, reader: jspb.BinaryReader): HDelRequest;
}

export namespace HDelRequest {
  export type AsObject = {
    hash: string,
    field: string,
  }
}

export class HGetAllRequest extends jspb.Message {
  getHash(): string;
  setHash(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HGetAllRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HGetAllRequest): HGetAllRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HGetAllRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HGetAllRequest;
  static deserializeBinaryFromReader(message: HGetAllRequest, reader: jspb.BinaryReader): HGetAllRequest;
}

export namespace HGetAllRequest {
  export type AsObject = {
    hash: string,
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

