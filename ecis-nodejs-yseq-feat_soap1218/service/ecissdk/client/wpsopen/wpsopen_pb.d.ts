// package: wpsopen
// file: wpsopen/wpsopen.proto

import * as jspb from 'google-protobuf';

export class GetIdConfuseRequest extends jspb.Message {
  getQuerystr(): string;
  setQuerystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetIdConfuseRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetIdConfuseRequest): GetIdConfuseRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetIdConfuseRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetIdConfuseRequest;
  static deserializeBinaryFromReader(message: GetIdConfuseRequest, reader: jspb.BinaryReader): GetIdConfuseRequest;
}

export namespace GetIdConfuseRequest {
  export type AsObject = {
    querystr: string,
  }
}

export class GetFileInfoRequest extends jspb.Message {
  getQuerystr(): string;
  setQuerystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFileInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFileInfoRequest): GetFileInfoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFileInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFileInfoRequest;
  static deserializeBinaryFromReader(message: GetFileInfoRequest, reader: jspb.BinaryReader): GetFileInfoRequest;
}

export namespace GetFileInfoRequest {
  export type AsObject = {
    querystr: string,
  }
}

export class GetPreviewInnerFileInfoRequest extends jspb.Message {
  getQuerystr(): string;
  setQuerystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPreviewInnerFileInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPreviewInnerFileInfoRequest): GetPreviewInnerFileInfoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPreviewInnerFileInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPreviewInnerFileInfoRequest;
  static deserializeBinaryFromReader(message: GetPreviewInnerFileInfoRequest, reader: jspb.BinaryReader): GetPreviewInnerFileInfoRequest;
}

export namespace GetPreviewInnerFileInfoRequest {
  export type AsObject = {
    querystr: string,
  }
}

export class GetSaveFileUrlRequest extends jspb.Message {
  getQuerystr(): string;
  setQuerystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSaveFileUrlRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSaveFileUrlRequest): GetSaveFileUrlRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSaveFileUrlRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSaveFileUrlRequest;
  static deserializeBinaryFromReader(message: GetSaveFileUrlRequest, reader: jspb.BinaryReader): GetSaveFileUrlRequest;
}

export namespace GetSaveFileUrlRequest {
  export type AsObject = {
    querystr: string,
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

