// package: fileScan
// file: fileScan/fileScan.proto

import * as jspb from 'google-protobuf';

export class GetFileParentNamesRequest extends jspb.Message {
  getGroupid(): string;
  setGroupid(value: string): void;

  getFileid(): string;
  setFileid(value: string): void;

  getQuerystr(): string;
  setQuerystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFileParentNamesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFileParentNamesRequest): GetFileParentNamesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFileParentNamesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFileParentNamesRequest;
  static deserializeBinaryFromReader(message: GetFileParentNamesRequest, reader: jspb.BinaryReader): GetFileParentNamesRequest;
}

export namespace GetFileParentNamesRequest {
  export type AsObject = {
    groupid: string,
    fileid: string,
    querystr: string,
  }
}

export class GetCorpGroupInfoRequest extends jspb.Message {
  getGroupid(): string;
  setGroupid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCorpGroupInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCorpGroupInfoRequest): GetCorpGroupInfoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCorpGroupInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCorpGroupInfoRequest;
  static deserializeBinaryFromReader(message: GetCorpGroupInfoRequest, reader: jspb.BinaryReader): GetCorpGroupInfoRequest;
}

export namespace GetCorpGroupInfoRequest {
  export type AsObject = {
    groupid: string,
  }
}

export class GetFilesInfoRequest extends jspb.Message {
  getQuerystr(): string;
  setQuerystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFilesInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFilesInfoRequest): GetFilesInfoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFilesInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFilesInfoRequest;
  static deserializeBinaryFromReader(message: GetFilesInfoRequest, reader: jspb.BinaryReader): GetFilesInfoRequest;
}

export namespace GetFilesInfoRequest {
  export type AsObject = {
    querystr: string,
  }
}

export class GetFilePathNamesRequest extends jspb.Message {
  getGroupid(): string;
  setGroupid(value: string): void;

  getFileid(): string;
  setFileid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFilePathNamesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFilePathNamesRequest): GetFilePathNamesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFilePathNamesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFilePathNamesRequest;
  static deserializeBinaryFromReader(message: GetFilePathNamesRequest, reader: jspb.BinaryReader): GetFilePathNamesRequest;
}

export namespace GetFilePathNamesRequest {
  export type AsObject = {
    groupid: string,
    fileid: string,
  }
}

export class DownloadFileRequest extends jspb.Message {
  getFileid(): string;
  setFileid(value: string): void;

  getQuerystr(): string;
  setQuerystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadFileRequest): DownloadFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DownloadFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadFileRequest;
  static deserializeBinaryFromReader(message: DownloadFileRequest, reader: jspb.BinaryReader): DownloadFileRequest;
}

export namespace DownloadFileRequest {
  export type AsObject = {
    fileid: string,
    querystr: string,
  }
}

export class DownloadFirstRecycleFileRequest extends jspb.Message {
  getFileid(): string;
  setFileid(value: string): void;

  getQuerystr(): string;
  setQuerystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadFirstRecycleFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadFirstRecycleFileRequest): DownloadFirstRecycleFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DownloadFirstRecycleFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadFirstRecycleFileRequest;
  static deserializeBinaryFromReader(message: DownloadFirstRecycleFileRequest, reader: jspb.BinaryReader): DownloadFirstRecycleFileRequest;
}

export namespace DownloadFirstRecycleFileRequest {
  export type AsObject = {
    fileid: string,
    querystr: string,
  }
}

export class DownloadHistoryFileRequest extends jspb.Message {
  getHistoryid(): string;
  setHistoryid(value: string): void;

  getQuerystr(): string;
  setQuerystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadHistoryFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadHistoryFileRequest): DownloadHistoryFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DownloadHistoryFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadHistoryFileRequest;
  static deserializeBinaryFromReader(message: DownloadHistoryFileRequest, reader: jspb.BinaryReader): DownloadHistoryFileRequest;
}

export namespace DownloadHistoryFileRequest {
  export type AsObject = {
    historyid: string,
    querystr: string,
  }
}

export class CreateTermRequest extends jspb.Message {
  getBodystr(): string;
  setBodystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTermRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTermRequest): CreateTermRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateTermRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTermRequest;
  static deserializeBinaryFromReader(message: CreateTermRequest, reader: jspb.BinaryReader): CreateTermRequest;
}

export namespace CreateTermRequest {
  export type AsObject = {
    bodystr: string,
  }
}

export class UpdateTermRequest extends jspb.Message {
  getQuerystr(): string;
  setQuerystr(value: string): void;

  getBodystr(): string;
  setBodystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateTermRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateTermRequest): UpdateTermRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateTermRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateTermRequest;
  static deserializeBinaryFromReader(message: UpdateTermRequest, reader: jspb.BinaryReader): UpdateTermRequest;
}

export namespace UpdateTermRequest {
  export type AsObject = {
    querystr: string,
    bodystr: string,
  }
}

export class GetTermRequest extends jspb.Message {
  getQuerystr(): string;
  setQuerystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTermRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTermRequest): GetTermRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTermRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTermRequest;
  static deserializeBinaryFromReader(message: GetTermRequest, reader: jspb.BinaryReader): GetTermRequest;
}

export namespace GetTermRequest {
  export type AsObject = {
    querystr: string,
  }
}

export class CreateObjectTermsRelationRequest extends jspb.Message {
  getBodystr(): string;
  setBodystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateObjectTermsRelationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateObjectTermsRelationRequest): CreateObjectTermsRelationRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateObjectTermsRelationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateObjectTermsRelationRequest;
  static deserializeBinaryFromReader(message: CreateObjectTermsRelationRequest, reader: jspb.BinaryReader): CreateObjectTermsRelationRequest;
}

export namespace CreateObjectTermsRelationRequest {
  export type AsObject = {
    bodystr: string,
  }
}

export class ListObjectTermsRelationRequest extends jspb.Message {
  getBodystr(): string;
  setBodystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListObjectTermsRelationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListObjectTermsRelationRequest): ListObjectTermsRelationRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListObjectTermsRelationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListObjectTermsRelationRequest;
  static deserializeBinaryFromReader(message: ListObjectTermsRelationRequest, reader: jspb.BinaryReader): ListObjectTermsRelationRequest;
}

export namespace ListObjectTermsRelationRequest {
  export type AsObject = {
    bodystr: string,
  }
}

export class GetObjectTermRelationRequest extends jspb.Message {
  getQuerystr(): string;
  setQuerystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetObjectTermRelationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetObjectTermRelationRequest): GetObjectTermRelationRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetObjectTermRelationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetObjectTermRelationRequest;
  static deserializeBinaryFromReader(message: GetObjectTermRelationRequest, reader: jspb.BinaryReader): GetObjectTermRelationRequest;
}

export namespace GetObjectTermRelationRequest {
  export type AsObject = {
    querystr: string,
  }
}

export class DelObjectTermRelationRequest extends jspb.Message {
  getBodystr(): string;
  setBodystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DelObjectTermRelationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DelObjectTermRelationRequest): DelObjectTermRelationRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DelObjectTermRelationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DelObjectTermRelationRequest;
  static deserializeBinaryFromReader(message: DelObjectTermRelationRequest, reader: jspb.BinaryReader): DelObjectTermRelationRequest;
}

export namespace DelObjectTermRelationRequest {
  export type AsObject = {
    bodystr: string,
  }
}

export class CreateMetaTypeRequest extends jspb.Message {
  getQuerystr(): string;
  setQuerystr(value: string): void;

  getBodystr(): string;
  setBodystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateMetaTypeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateMetaTypeRequest): CreateMetaTypeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateMetaTypeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateMetaTypeRequest;
  static deserializeBinaryFromReader(message: CreateMetaTypeRequest, reader: jspb.BinaryReader): CreateMetaTypeRequest;
}

export namespace CreateMetaTypeRequest {
  export type AsObject = {
    querystr: string,
    bodystr: string,
  }
}

export class CreateMetadataRequest extends jspb.Message {
  getBodystr(): string;
  setBodystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateMetadataRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateMetadataRequest): CreateMetadataRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateMetadataRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateMetadataRequest;
  static deserializeBinaryFromReader(message: CreateMetadataRequest, reader: jspb.BinaryReader): CreateMetadataRequest;
}

export namespace CreateMetadataRequest {
  export type AsObject = {
    bodystr: string,
  }
}

export class DelMetadataRequest extends jspb.Message {
  getQuerystr(): string;
  setQuerystr(value: string): void;

  getBodystr(): string;
  setBodystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DelMetadataRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DelMetadataRequest): DelMetadataRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DelMetadataRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DelMetadataRequest;
  static deserializeBinaryFromReader(message: DelMetadataRequest, reader: jspb.BinaryReader): DelMetadataRequest;
}

export namespace DelMetadataRequest {
  export type AsObject = {
    querystr: string,
    bodystr: string,
  }
}

export class ListFileRequest extends jspb.Message {
  getBodystr(): string;
  setBodystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListFileRequest): ListFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListFileRequest;
  static deserializeBinaryFromReader(message: ListFileRequest, reader: jspb.BinaryReader): ListFileRequest;
}

export namespace ListFileRequest {
  export type AsObject = {
    bodystr: string,
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

