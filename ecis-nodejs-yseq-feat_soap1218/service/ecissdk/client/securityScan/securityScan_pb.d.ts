// package: securityScan
// file: securityScan.proto

import * as jspb from 'google-protobuf';

export class ScanEngineHeartBeatRequest extends jspb.Message {
  getBodystr(): string;
  setBodystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ScanEngineHeartBeatRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ScanEngineHeartBeatRequest): ScanEngineHeartBeatRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ScanEngineHeartBeatRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ScanEngineHeartBeatRequest;
  static deserializeBinaryFromReader(message: ScanEngineHeartBeatRequest, reader: jspb.BinaryReader): ScanEngineHeartBeatRequest;
}

export namespace ScanEngineHeartBeatRequest {
  export type AsObject = {
    bodystr: string,
  }
}

export class ScanEngineCallBackRequest extends jspb.Message {
  getBodystr(): string;
  setBodystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ScanEngineCallBackRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ScanEngineCallBackRequest): ScanEngineCallBackRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ScanEngineCallBackRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ScanEngineCallBackRequest;
  static deserializeBinaryFromReader(message: ScanEngineCallBackRequest, reader: jspb.BinaryReader): ScanEngineCallBackRequest;
}

export namespace ScanEngineCallBackRequest {
  export type AsObject = {
    bodystr: string,
  }
}

export class GetFileDownloadRequest extends jspb.Message {
  getGroupid(): string;
  setGroupid(value: string): void;

  getFileid(): string;
  setFileid(value: string): void;

  getQuerystr(): string;
  setQuerystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFileDownloadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFileDownloadRequest): GetFileDownloadRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFileDownloadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFileDownloadRequest;
  static deserializeBinaryFromReader(message: GetFileDownloadRequest, reader: jspb.BinaryReader): GetFileDownloadRequest;
}

export namespace GetFileDownloadRequest {
  export type AsObject = {
    groupid: string,
    fileid: string,
    querystr: string,
  }
}

export class GetFileHistoryDownloadRequest extends jspb.Message {
  getHistoryid(): string;
  setHistoryid(value: string): void;

  getQuerystr(): string;
  setQuerystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFileHistoryDownloadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFileHistoryDownloadRequest): GetFileHistoryDownloadRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFileHistoryDownloadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFileHistoryDownloadRequest;
  static deserializeBinaryFromReader(message: GetFileHistoryDownloadRequest, reader: jspb.BinaryReader): GetFileHistoryDownloadRequest;
}

export namespace GetFileHistoryDownloadRequest {
  export type AsObject = {
    historyid: string,
    querystr: string,
  }
}

export class GetFileHistoryRequest extends jspb.Message {
  getFileid(): string;
  setFileid(value: string): void;

  getQuerystr(): string;
  setQuerystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFileHistoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFileHistoryRequest): GetFileHistoryRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFileHistoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFileHistoryRequest;
  static deserializeBinaryFromReader(message: GetFileHistoryRequest, reader: jspb.BinaryReader): GetFileHistoryRequest;
}

export namespace GetFileHistoryRequest {
  export type AsObject = {
    fileid: string,
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

