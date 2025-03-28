// package: yunDoc
// file: yunDoc/yunDoc.proto

import * as jspb from 'google-protobuf';

export class ListFilesRequest extends jspb.Message {
  getCount(): number;
  setCount(value: number): void;

  getFilter(): string;
  setFilter(value: string): void;

  getGroupid(): number;
  setGroupid(value: number): void;

  clearIgnoreList(): void;
  getIgnoreList(): Array<string>;
  setIgnoreList(value: Array<string>): void;
  addIgnore(value: string, index?: number): string;

  clearIncludeList(): void;
  getIncludeList(): Array<string>;
  setIncludeList(value: Array<string>): void;
  addInclude(value: string, index?: number): string;

  getIncludeExts(): string;
  setIncludeExts(value: string): void;

  getLinkgroup(): boolean;
  setLinkgroup(value: boolean): void;

  getOffset(): number;
  setOffset(value: number): void;

  getOrder(): string;
  setOrder(value: string): void;

  getOrderby(): string;
  setOrderby(value: string): void;

  getParentid(): number;
  setParentid(value: number): void;

  getReviewPicThumbnail(): boolean;
  setReviewPicThumbnail(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListFilesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListFilesRequest): ListFilesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListFilesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListFilesRequest;
  static deserializeBinaryFromReader(message: ListFilesRequest, reader: jspb.BinaryReader): ListFilesRequest;
}

export namespace ListFilesRequest {
  export type AsObject = {
    count: number,
    filter: string,
    groupid: number,
    ignoreList: Array<string>,
    includeList: Array<string>,
    includeExts: string,
    linkgroup: boolean,
    offset: number,
    order: string,
    orderby: string,
    parentid: number,
    reviewPicThumbnail: boolean,
  }
}

export class CreateFolderRequest extends jspb.Message {
  getGroupid(): number;
  setGroupid(value: number): void;

  getMustCreate(): boolean;
  setMustCreate(value: boolean): void;

  getName(): string;
  setName(value: string): void;

  clearParentPathList(): void;
  getParentPathList(): Array<string>;
  setParentPathList(value: Array<string>): void;
  addParentPath(value: string, index?: number): string;

  getParentid(): number;
  setParentid(value: number): void;

  getRetrieveExistent(): boolean;
  setRetrieveExistent(value: boolean): void;

  getCsrfmiddlewaretoken(): string;
  setCsrfmiddlewaretoken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateFolderRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateFolderRequest): CreateFolderRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateFolderRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateFolderRequest;
  static deserializeBinaryFromReader(message: CreateFolderRequest, reader: jspb.BinaryReader): CreateFolderRequest;
}

export namespace CreateFolderRequest {
  export type AsObject = {
    groupid: number,
    mustCreate: boolean,
    name: string,
    parentPathList: Array<string>,
    parentid: number,
    retrieveExistent: boolean,
    csrfmiddlewaretoken: string,
  }
}

export class GetFilePermissionsRequest extends jspb.Message {
  getGroupid(): number;
  setGroupid(value: number): void;

  getFileid(): number;
  setFileid(value: number): void;

  getNext(): string;
  setNext(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFilePermissionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFilePermissionsRequest): GetFilePermissionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFilePermissionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFilePermissionsRequest;
  static deserializeBinaryFromReader(message: GetFilePermissionsRequest, reader: jspb.BinaryReader): GetFilePermissionsRequest;
}

export namespace GetFilePermissionsRequest {
  export type AsObject = {
    groupid: number,
    fileid: number,
    next: string,
  }
}

export class DeleteFilePermissionRequest extends jspb.Message {
  getGroupid(): number;
  setGroupid(value: number): void;

  getFileid(): number;
  setFileid(value: number): void;

  getSubjectId(): number;
  setSubjectId(value: number): void;

  getSubjectType(): string;
  setSubjectType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteFilePermissionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteFilePermissionRequest): DeleteFilePermissionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteFilePermissionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteFilePermissionRequest;
  static deserializeBinaryFromReader(message: DeleteFilePermissionRequest, reader: jspb.BinaryReader): DeleteFilePermissionRequest;
}

export namespace DeleteFilePermissionRequest {
  export type AsObject = {
    groupid: number,
    fileid: number,
    subjectId: number,
    subjectType: string,
  }
}

export class CreateFilesUploadRequest extends jspb.Message {
  getCheckname(): boolean;
  setCheckname(value: boolean): void;

  getClientStores(): string;
  setClientStores(value: string): void;

  getContenttype(): string;
  setContenttype(value: string): void;

  getGroupid(): number;
  setGroupid(value: number): void;

  getName(): string;
  setName(value: string): void;

  getParentid(): number;
  setParentid(value: number): void;

  getReqByInternal(): boolean;
  setReqByInternal(value: boolean): void;

  getSize(): number;
  setSize(value: number): void;

  getStartswithfilename(): string;
  setStartswithfilename(value: string): void;

  getSuccessactionstatus(): string;
  setSuccessactionstatus(value: string): void;

  getTrytime(): number;
  setTrytime(value: number): void;

  getSha1(): string;
  setSha1(value: string): void;

  getCsrfmiddlewaretoken(): string;
  setCsrfmiddlewaretoken(value: string): void;

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
    checkname: boolean,
    clientStores: string,
    contenttype: string,
    groupid: number,
    name: string,
    parentid: number,
    reqByInternal: boolean,
    size: number,
    startswithfilename: string,
    successactionstatus: string,
    trytime: number,
    sha1: string,
    csrfmiddlewaretoken: string,
  }
}

export class CreateFileRequest extends jspb.Message {
  getEtag(): string;
  setEtag(value: string): void;

  getFileid(): number;
  setFileid(value: number): void;

  getGroupid(): number;
  setGroupid(value: number): void;

  getKey(): string;
  setKey(value: string): void;

  getMac(): string;
  setMac(value: string): void;

  getMustCreate(): boolean;
  setMustCreate(value: boolean): void;

  getName(): string;
  setName(value: string): void;

  clearParentPathList(): void;
  getParentPathList(): Array<string>;
  setParentPathList(value: Array<string>): void;
  addParentPath(value: string, index?: number): string;

  getParentid(): number;
  setParentid(value: number): void;

  getSecureGuid(): string;
  setSecureGuid(value: string): void;

  getSha1(): string;
  setSha1(value: string): void;

  getSize(): number;
  setSize(value: number): void;

  getStore(): string;
  setStore(value: string): void;

  getUnlimitedSize(): boolean;
  setUnlimitedSize(value: boolean): void;

  getCsrfmiddlewaretoken(): string;
  setCsrfmiddlewaretoken(value: string): void;

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
    etag: string,
    fileid: number,
    groupid: number,
    key: string,
    mac: string,
    mustCreate: boolean,
    name: string,
    parentPathList: Array<string>,
    parentid: number,
    secureGuid: string,
    sha1: string,
    size: number,
    store: string,
    unlimitedSize: boolean,
    csrfmiddlewaretoken: string,
  }
}

export class UpdateFileRequest extends jspb.Message {
  getClientStores(): string;
  setClientStores(value: string): void;

  getFileid(): number;
  setFileid(value: number): void;

  getReqByInternal(): boolean;
  setReqByInternal(value: boolean): void;

  getS3sha256(): string;
  setS3sha256(value: string): void;

  getSha1(): string;
  setSha1(value: string): void;

  getSize(): number;
  setSize(value: number): void;

  getTrytime(): number;
  setTrytime(value: number): void;

  getCsrfmiddlewaretoken(): string;
  setCsrfmiddlewaretoken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateFileRequest): UpdateFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateFileRequest;
  static deserializeBinaryFromReader(message: UpdateFileRequest, reader: jspb.BinaryReader): UpdateFileRequest;
}

export namespace UpdateFileRequest {
  export type AsObject = {
    clientStores: string,
    fileid: number,
    reqByInternal: boolean,
    s3sha256: string,
    sha1: string,
    size: number,
    trytime: number,
    csrfmiddlewaretoken: string,
  }
}

export class DownloadFileRequest extends jspb.Message {
  getFileid(): number;
  setFileid(value: number): void;

  getGroupid(): number;
  setGroupid(value: number): void;

  getIsblocks(): boolean;
  setIsblocks(value: boolean): void;

  getProcessonType(): string;
  setProcessonType(value: string): void;

  getStore(): string;
  setStore(value: string): void;

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
    groupid: number,
    isblocks: boolean,
    processonType: string,
    store: string,
  }
}

export class BatchDownloadFileRequest extends jspb.Message {
  clearFileidsList(): void;
  getFileidsList(): Array<number>;
  setFileidsList(value: Array<number>): void;
  addFileids(value: number, index?: number): number;

  getGroupid(): number;
  setGroupid(value: number): void;

  getCsrfmiddlewaretoken(): string;
  setCsrfmiddlewaretoken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BatchDownloadFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BatchDownloadFileRequest): BatchDownloadFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BatchDownloadFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BatchDownloadFileRequest;
  static deserializeBinaryFromReader(message: BatchDownloadFileRequest, reader: jspb.BinaryReader): BatchDownloadFileRequest;
}

export namespace BatchDownloadFileRequest {
  export type AsObject = {
    fileidsList: Array<number>,
    groupid: number,
    csrfmiddlewaretoken: string,
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

