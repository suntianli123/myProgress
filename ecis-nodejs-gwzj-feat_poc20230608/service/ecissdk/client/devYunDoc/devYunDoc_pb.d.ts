// package: devYunDoc
// file: devYunDoc/devYunDoc.proto

import * as jspb from 'google-protobuf';

export class CreateFilesUploadRequest extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): void;

  getName(): string;
  setName(value: string): void;

  getSize(): number;
  setSize(value: number): void;

  clearParentPathList(): void;
  getParentPathList(): Array<string>;
  setParentPathList(value: Array<string>): void;
  addParentPath(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateFilesUploadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateFilesUploadRequest): CreateFilesUploadRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateFilesUploadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateFilesUploadRequest;
  static deserializeBinaryFromReader(message: CreateFilesUploadRequest, reader: jspb.BinaryReader): CreateFilesUploadRequest;
}

export namespace CreateFilesUploadRequest {
  export type AsObject = {
    userid: number,
    name: string,
    size: number,
    parentPathList: Array<string>,
  }
}

export class CreateFileRequest extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): void;

  getName(): string;
  setName(value: string): void;

  getSha1(): string;
  setSha1(value: string): void;

  getSize(): number;
  setSize(value: number): void;

  getGroupid(): number;
  setGroupid(value: number): void;

  getParentid(): number;
  setParentid(value: number): void;

  clearParentPathList(): void;
  getParentPathList(): Array<string>;
  setParentPathList(value: Array<string>): void;
  addParentPath(value: string, index?: number): string;

  getEtag(): string;
  setEtag(value: string): void;

  getMustCreate(): boolean;
  setMustCreate(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateFileRequest): CreateFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateFileRequest;
  static deserializeBinaryFromReader(message: CreateFileRequest, reader: jspb.BinaryReader): CreateFileRequest;
}

export namespace CreateFileRequest {
  export type AsObject = {
    userid: number,
    name: string,
    sha1: string,
    size: number,
    groupid: number,
    parentid: number,
    parentPathList: Array<string>,
    etag: string,
    mustCreate: boolean,
  }
}

export class DownloadFileRequest extends jspb.Message {
  getFileid(): number;
  setFileid(value: number): void;

  getUserid(): number;
  setUserid(value: number): void;

  getReqByInternal(): boolean;
  setReqByInternal(value: boolean): void;

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
    fileid: number,
    userid: number,
    reqByInternal: boolean,
  }
}

export class JsonResponse extends jspb.Message {
  getStat(): string;
  setStat(value: string): void;

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
    stat: string,
    result: string,
    data: string,
    msg: string,
  }
}

