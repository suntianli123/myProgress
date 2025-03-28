// package: secDoc
// file: secdoc.proto

import * as jspb from 'google-protobuf';

export class EncryptParamReq extends jspb.Message {
  getBodystr(): string;
  setBodystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EncryptParamReq.AsObject;
  static toObject(includeInstance: boolean, msg: EncryptParamReq): EncryptParamReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EncryptParamReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EncryptParamReq;
  static deserializeBinaryFromReader(message: EncryptParamReq, reader: jspb.BinaryReader): EncryptParamReq;
}

export namespace EncryptParamReq {
  export type AsObject = {
    bodystr: string,
  }
}

export class DecryptParamReq extends jspb.Message {
  getFileid(): number;
  setFileid(value: number): void;

  getFilename(): string;
  setFilename(value: string): void;

  getFileurl(): string;
  setFileurl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecryptParamReq.AsObject;
  static toObject(includeInstance: boolean, msg: DecryptParamReq): DecryptParamReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DecryptParamReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecryptParamReq;
  static deserializeBinaryFromReader(message: DecryptParamReq, reader: jspb.BinaryReader): DecryptParamReq;
}

export namespace DecryptParamReq {
  export type AsObject = {
    fileid: number,
    filename: string,
    fileurl: string,
  }
}

export class QueryDocumentParamReq extends jspb.Message {
  getFileid(): number;
  setFileid(value: number): void;

  getFilename(): string;
  setFilename(value: string): void;

  getCreatorid(): number;
  setCreatorid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryDocumentParamReq.AsObject;
  static toObject(includeInstance: boolean, msg: QueryDocumentParamReq): QueryDocumentParamReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryDocumentParamReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryDocumentParamReq;
  static deserializeBinaryFromReader(message: QueryDocumentParamReq, reader: jspb.BinaryReader): QueryDocumentParamReq;
}

export namespace QueryDocumentParamReq {
  export type AsObject = {
    fileid: number,
    filename: string,
    creatorid: number,
  }
}

export class UpdateDocRightsParamReq extends jspb.Message {
  getBodystr(): string;
  setBodystr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateDocRightsParamReq.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateDocRightsParamReq): UpdateDocRightsParamReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateDocRightsParamReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateDocRightsParamReq;
  static deserializeBinaryFromReader(message: UpdateDocRightsParamReq, reader: jspb.BinaryReader): UpdateDocRightsParamReq;
}

export namespace UpdateDocRightsParamReq {
  export type AsObject = {
    bodystr: string,
  }
}

export class QueryUserDepartmentsReq extends jspb.Message {
  getCompid(): string;
  setCompid(value: string): void;

  getCompuid(): string;
  setCompuid(value: string): void;

  getUserid(): number;
  setUserid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryUserDepartmentsReq.AsObject;
  static toObject(includeInstance: boolean, msg: QueryUserDepartmentsReq): QueryUserDepartmentsReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryUserDepartmentsReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryUserDepartmentsReq;
  static deserializeBinaryFromReader(message: QueryUserDepartmentsReq, reader: jspb.BinaryReader): QueryUserDepartmentsReq;
}

export namespace QueryUserDepartmentsReq {
  export type AsObject = {
    compid: string,
    compuid: string,
    userid: number,
  }
}

export class GetSecureDocumentUpdateUrlReq extends jspb.Message {
  getGroupid(): number;
  setGroupid(value: number): void;

  getSize(): number;
  setSize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSecureDocumentUpdateUrlReq.AsObject;
  static toObject(includeInstance: boolean, msg: GetSecureDocumentUpdateUrlReq): GetSecureDocumentUpdateUrlReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSecureDocumentUpdateUrlReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSecureDocumentUpdateUrlReq;
  static deserializeBinaryFromReader(message: GetSecureDocumentUpdateUrlReq, reader: jspb.BinaryReader): GetSecureDocumentUpdateUrlReq;
}

export namespace GetSecureDocumentUpdateUrlReq {
  export type AsObject = {
    groupid: number,
    size: number,
  }
}

export class UpdateSecureDocumentReq extends jspb.Message {
  getGroupid(): number;
  setGroupid(value: number): void;

  getFileid(): number;
  setFileid(value: number): void;

  getParentid(): number;
  setParentid(value: number): void;

  getOperatorid(): number;
  setOperatorid(value: number): void;

  getOriginsha1(): string;
  setOriginsha1(value: string): void;

  getNewsha1(): string;
  setNewsha1(value: string): void;

  getStoretype(): string;
  setStoretype(value: string): void;

  getStoreid(): string;
  setStoreid(value: string): void;

  getSecureguid(): string;
  setSecureguid(value: string): void;

  getSource(): number;
  setSource(value: number): void;

  getSize(): number;
  setSize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateSecureDocumentReq.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateSecureDocumentReq): UpdateSecureDocumentReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateSecureDocumentReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateSecureDocumentReq;
  static deserializeBinaryFromReader(message: UpdateSecureDocumentReq, reader: jspb.BinaryReader): UpdateSecureDocumentReq;
}

export namespace UpdateSecureDocumentReq {
  export type AsObject = {
    groupid: number,
    fileid: number,
    parentid: number,
    operatorid: number,
    originsha1: string,
    newsha1: string,
    storetype: string,
    storeid: string,
    secureguid: string,
    source: number,
    size: number,
  }
}

export class StreamDataResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  getMsg(): string;
  setMsg(value: string): void;

  getInfo(): string;
  setInfo(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamDataResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StreamDataResponse): StreamDataResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StreamDataResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamDataResponse;
  static deserializeBinaryFromReader(message: StreamDataResponse, reader: jspb.BinaryReader): StreamDataResponse;
}

export namespace StreamDataResponse {
  export type AsObject = {
    result: string,
    data: Uint8Array | string,
    msg: string,
    info: string,
  }
}

export class JsonDataResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  getData(): string;
  setData(value: string): void;

  getMsg(): string;
  setMsg(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JsonDataResponse.AsObject;
  static toObject(includeInstance: boolean, msg: JsonDataResponse): JsonDataResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: JsonDataResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JsonDataResponse;
  static deserializeBinaryFromReader(message: JsonDataResponse, reader: jspb.BinaryReader): JsonDataResponse;
}

export namespace JsonDataResponse {
  export type AsObject = {
    result: string,
    data: string,
    msg: string,
  }
}

