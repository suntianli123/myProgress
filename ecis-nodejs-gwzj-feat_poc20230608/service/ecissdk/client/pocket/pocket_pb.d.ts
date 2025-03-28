// package: pocket
// file: pocket.proto

import * as jspb from 'google-protobuf';

export class NullRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NullRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NullRequest): NullRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NullRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NullRequest;
  static deserializeBinaryFromReader(message: NullRequest, reader: jspb.BinaryReader): NullRequest;
}

export namespace NullRequest {
  export type AsObject = {
  }
}

export class GetFileDownloadUrlRequest extends jspb.Message {
  getFileToken(): string;
  setFileToken(value: string): void;

  getExpectFileName(): string;
  setExpectFileName(value: string): void;

  getInternal(): boolean;
  setInternal(value: boolean): void;

  getXOrigin(): string;
  setXOrigin(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFileDownloadUrlRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFileDownloadUrlRequest): GetFileDownloadUrlRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFileDownloadUrlRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFileDownloadUrlRequest;
  static deserializeBinaryFromReader(message: GetFileDownloadUrlRequest, reader: jspb.BinaryReader): GetFileDownloadUrlRequest;
}

export namespace GetFileDownloadUrlRequest {
  export type AsObject = {
    fileToken: string,
    expectFileName: string,
    internal: boolean,
    xOrigin: string,
  }
}

export class GetFileDownloadUrlResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): void;

  getMessage(): string;
  setMessage(value: string): void;

  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFileDownloadUrlResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFileDownloadUrlResponse): GetFileDownloadUrlResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFileDownloadUrlResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFileDownloadUrlResponse;
  static deserializeBinaryFromReader(message: GetFileDownloadUrlResponse, reader: jspb.BinaryReader): GetFileDownloadUrlResponse;
}

export namespace GetFileDownloadUrlResponse {
  export type AsObject = {
    code: number,
    message: string,
    data: string,
  }
}

export class UpdateProfileRequest extends jspb.Message {
  getEndpoint(): string;
  setEndpoint(value: string): void;

  getFlatEnable(): string;
  setFlatEnable(value: string): void;

  getHistoryMergeDisable(): string;
  setHistoryMergeDisable(value: string): void;

  getHistoryVersionNumberLimit(): number;
  setHistoryVersionNumberLimit(value: number): void;

  getReviewEnable(): string;
  setReviewEnable(value: string): void;

  getRecycleStorageDays(): number;
  setRecycleStorageDays(value: number): void;

  getReviewMergeInterval(): number;
  setReviewMergeInterval(value: number): void;

  getBatchDownloadMaxFiles(): number;
  setBatchDownloadMaxFiles(value: number): void;

  getBatchDownloadMaxSize(): number;
  setBatchDownloadMaxSize(value: number): void;

  getBatchDownloadRateLimit(): number;
  setBatchDownloadRateLimit(value: number): void;

  getAllowOrigins(): string;
  setAllowOrigins(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateProfileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateProfileRequest): UpdateProfileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateProfileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateProfileRequest;
  static deserializeBinaryFromReader(message: UpdateProfileRequest, reader: jspb.BinaryReader): UpdateProfileRequest;
}

export namespace UpdateProfileRequest {
  export type AsObject = {
    endpoint: string,
    flatEnable: string,
    historyMergeDisable: string,
    historyVersionNumberLimit: number,
    reviewEnable: string,
    recycleStorageDays: number,
    reviewMergeInterval: number,
    batchDownloadMaxFiles: number,
    batchDownloadMaxSize: number,
    batchDownloadRateLimit: number,
    allowOrigins: string,
  }
}

export class UploadFileResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): void;

  hasData(): boolean;
  clearData(): void;
  getData(): UploadFileToken | undefined;
  setData(value?: UploadFileToken): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadFileResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UploadFileResponse): UploadFileResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UploadFileResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadFileResponse;
  static deserializeBinaryFromReader(message: UploadFileResponse, reader: jspb.BinaryReader): UploadFileResponse;
}

export namespace UploadFileResponse {
  export type AsObject = {
    code: number,
    data?: UploadFileToken.AsObject,
    message: string,
  }
}

export class UploadFileToken extends jspb.Message {
  getFileToken(): string;
  setFileToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadFileToken.AsObject;
  static toObject(includeInstance: boolean, msg: UploadFileToken): UploadFileToken.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UploadFileToken, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadFileToken;
  static deserializeBinaryFromReader(message: UploadFileToken, reader: jspb.BinaryReader): UploadFileToken;
}

export namespace UploadFileToken {
  export type AsObject = {
    fileToken: string,
  }
}

export class UploadFileRequest extends jspb.Message {
  getAutoAck(): boolean;
  setAutoAck(value: boolean): void;

  getContentType(): string;
  setContentType(value: string): void;

  getFileToken(): string;
  setFileToken(value: string): void;

  getHash(): string;
  setHash(value: string): void;

  getInternal(): boolean;
  setInternal(value: boolean): void;

  getName(): string;
  setName(value: string): void;

  getOperator(): number;
  setOperator(value: number): void;

  getParentToken(): string;
  setParentToken(value: string): void;

  getSize(): number;
  setSize(value: number): void;

  getVolumeId(): number;
  setVolumeId(value: number): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UploadFileRequest): UploadFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UploadFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadFileRequest;
  static deserializeBinaryFromReader(message: UploadFileRequest, reader: jspb.BinaryReader): UploadFileRequest;
}

export namespace UploadFileRequest {
  export type AsObject = {
    autoAck: boolean,
    contentType: string,
    fileToken: string,
    hash: string,
    internal: boolean,
    name: string,
    operator: number,
    parentToken: string,
    size: number,
    volumeId: number,
    data: Uint8Array | string,
  }
}

export class CommonResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): void;

  getData(): string;
  setData(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommonResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CommonResponse): CommonResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommonResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommonResponse;
  static deserializeBinaryFromReader(message: CommonResponse, reader: jspb.BinaryReader): CommonResponse;
}

export namespace CommonResponse {
  export type AsObject = {
    code: number,
    data: string,
    message: string,
  }
}

