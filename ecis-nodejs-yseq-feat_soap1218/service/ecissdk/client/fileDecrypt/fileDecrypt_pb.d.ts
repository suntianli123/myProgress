// package: fileDecrypt
// file: fileDecrypt/fileDecrypt.proto

import * as jspb from 'google-protobuf';

export class ExistDecryptFileRequest extends jspb.Message {
  getStoreKey(): string;
  setStoreKey(value: string): void;

  getFileType(): string;
  setFileType(value: string): void;

  getFileSize(): number;
  setFileSize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExistDecryptFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ExistDecryptFileRequest): ExistDecryptFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExistDecryptFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExistDecryptFileRequest;
  static deserializeBinaryFromReader(message: ExistDecryptFileRequest, reader: jspb.BinaryReader): ExistDecryptFileRequest;
}

export namespace ExistDecryptFileRequest {
  export type AsObject = {
    storeKey: string,
    fileType: string,
    fileSize: number,
  }
}

export class DecryptFileRequest extends jspb.Message {
  getStoreKey(): string;
  setStoreKey(value: string): void;

  getFileType(): string;
  setFileType(value: string): void;

  getFileSize(): number;
  setFileSize(value: number): void;

  hasCallback(): boolean;
  clearCallback(): void;
  getCallback(): CbMessage | undefined;
  setCallback(value?: CbMessage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecryptFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DecryptFileRequest): DecryptFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DecryptFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecryptFileRequest;
  static deserializeBinaryFromReader(message: DecryptFileRequest, reader: jspb.BinaryReader): DecryptFileRequest;
}

export namespace DecryptFileRequest {
  export type AsObject = {
    storeKey: string,
    fileType: string,
    fileSize: number,
    callback?: CbMessage.AsObject,
  }
}

export class CbMessage extends jspb.Message {
  getErrcode(): number;
  setErrcode(value: number): void;

  getMsg(): string;
  setMsg(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CbMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CbMessage): CbMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CbMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CbMessage;
  static deserializeBinaryFromReader(message: CbMessage, reader: jspb.BinaryReader): CbMessage;
}

export namespace CbMessage {
  export type AsObject = {
    errcode: number,
    msg: string,
  }
}

export class ClearHistoryFileRequest extends jspb.Message {
  getStoreKey(): string;
  setStoreKey(value: string): void;

  getLastDate(): number;
  setLastDate(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClearHistoryFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClearHistoryFileRequest): ClearHistoryFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClearHistoryFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClearHistoryFileRequest;
  static deserializeBinaryFromReader(message: ClearHistoryFileRequest, reader: jspb.BinaryReader): ClearHistoryFileRequest;
}

export namespace ClearHistoryFileRequest {
  export type AsObject = {
    storeKey: string,
    lastDate: number,
  }
}

export class PreUploadFileRequest extends jspb.Message {
  getStoreKey(): string;
  setStoreKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PreUploadFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PreUploadFileRequest): PreUploadFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PreUploadFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PreUploadFileRequest;
  static deserializeBinaryFromReader(message: PreUploadFileRequest, reader: jspb.BinaryReader): PreUploadFileRequest;
}

export namespace PreUploadFileRequest {
  export type AsObject = {
    storeKey: string,
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

