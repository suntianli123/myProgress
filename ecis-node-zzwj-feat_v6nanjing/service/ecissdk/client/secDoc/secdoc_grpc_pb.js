// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var secdoc_pb = require('./secdoc_pb.js');

function serialize_secDoc_DecryptParamReq(arg) {
  if (!(arg instanceof secdoc_pb.DecryptParamReq)) {
    throw new Error('Expected argument of type secDoc.DecryptParamReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secDoc_DecryptParamReq(buffer_arg) {
  return secdoc_pb.DecryptParamReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_secDoc_EncryptParamReq(arg) {
  if (!(arg instanceof secdoc_pb.EncryptParamReq)) {
    throw new Error('Expected argument of type secDoc.EncryptParamReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secDoc_EncryptParamReq(buffer_arg) {
  return secdoc_pb.EncryptParamReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_secDoc_GetSecureDocumentUpdateUrlReq(arg) {
  if (!(arg instanceof secdoc_pb.GetSecureDocumentUpdateUrlReq)) {
    throw new Error('Expected argument of type secDoc.GetSecureDocumentUpdateUrlReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secDoc_GetSecureDocumentUpdateUrlReq(buffer_arg) {
  return secdoc_pb.GetSecureDocumentUpdateUrlReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_secDoc_JsonDataResponse(arg) {
  if (!(arg instanceof secdoc_pb.JsonDataResponse)) {
    throw new Error('Expected argument of type secDoc.JsonDataResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secDoc_JsonDataResponse(buffer_arg) {
  return secdoc_pb.JsonDataResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_secDoc_QueryDocumentParamReq(arg) {
  if (!(arg instanceof secdoc_pb.QueryDocumentParamReq)) {
    throw new Error('Expected argument of type secDoc.QueryDocumentParamReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secDoc_QueryDocumentParamReq(buffer_arg) {
  return secdoc_pb.QueryDocumentParamReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_secDoc_QueryUserDepartmentsReq(arg) {
  if (!(arg instanceof secdoc_pb.QueryUserDepartmentsReq)) {
    throw new Error('Expected argument of type secDoc.QueryUserDepartmentsReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secDoc_QueryUserDepartmentsReq(buffer_arg) {
  return secdoc_pb.QueryUserDepartmentsReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_secDoc_StreamDataResponse(arg) {
  if (!(arg instanceof secdoc_pb.StreamDataResponse)) {
    throw new Error('Expected argument of type secDoc.StreamDataResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secDoc_StreamDataResponse(buffer_arg) {
  return secdoc_pb.StreamDataResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_secDoc_UpdateDocRightsParamReq(arg) {
  if (!(arg instanceof secdoc_pb.UpdateDocRightsParamReq)) {
    throw new Error('Expected argument of type secDoc.UpdateDocRightsParamReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secDoc_UpdateDocRightsParamReq(buffer_arg) {
  return secdoc_pb.UpdateDocRightsParamReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_secDoc_UpdateSecureDocumentReq(arg) {
  if (!(arg instanceof secdoc_pb.UpdateSecureDocumentReq)) {
    throw new Error('Expected argument of type secDoc.UpdateSecureDocumentReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secDoc_UpdateSecureDocumentReq(buffer_arg) {
  return secdoc_pb.UpdateSecureDocumentReq.deserializeBinary(new Uint8Array(buffer_arg));
}


var SecDocServiceService = exports.SecDocServiceService = {
  encrypt: {
    path: '/secDoc.SecDocService/encrypt',
    requestStream: false,
    responseStream: false,
    requestType: secdoc_pb.EncryptParamReq,
    responseType: secdoc_pb.StreamDataResponse,
    requestSerialize: serialize_secDoc_EncryptParamReq,
    requestDeserialize: deserialize_secDoc_EncryptParamReq,
    responseSerialize: serialize_secDoc_StreamDataResponse,
    responseDeserialize: deserialize_secDoc_StreamDataResponse,
  },
  decrypt: {
    path: '/secDoc.SecDocService/decrypt',
    requestStream: false,
    responseStream: false,
    requestType: secdoc_pb.DecryptParamReq,
    responseType: secdoc_pb.StreamDataResponse,
    requestSerialize: serialize_secDoc_DecryptParamReq,
    requestDeserialize: deserialize_secDoc_DecryptParamReq,
    responseSerialize: serialize_secDoc_StreamDataResponse,
    responseDeserialize: deserialize_secDoc_StreamDataResponse,
  },
  queryDocumentCode: {
    path: '/secDoc.SecDocService/queryDocumentCode',
    requestStream: false,
    responseStream: false,
    requestType: secdoc_pb.QueryDocumentParamReq,
    responseType: secdoc_pb.JsonDataResponse,
    requestSerialize: serialize_secDoc_QueryDocumentParamReq,
    requestDeserialize: deserialize_secDoc_QueryDocumentParamReq,
    responseSerialize: serialize_secDoc_JsonDataResponse,
    responseDeserialize: deserialize_secDoc_JsonDataResponse,
  },
  updateDocRights: {
    path: '/secDoc.SecDocService/updateDocRights',
    requestStream: false,
    responseStream: false,
    requestType: secdoc_pb.UpdateDocRightsParamReq,
    responseType: secdoc_pb.JsonDataResponse,
    requestSerialize: serialize_secDoc_UpdateDocRightsParamReq,
    requestDeserialize: deserialize_secDoc_UpdateDocRightsParamReq,
    responseSerialize: serialize_secDoc_JsonDataResponse,
    responseDeserialize: deserialize_secDoc_JsonDataResponse,
  },
  queryUserDepartments: {
    path: '/secDoc.SecDocService/queryUserDepartments',
    requestStream: false,
    responseStream: false,
    requestType: secdoc_pb.QueryUserDepartmentsReq,
    responseType: secdoc_pb.JsonDataResponse,
    requestSerialize: serialize_secDoc_QueryUserDepartmentsReq,
    requestDeserialize: deserialize_secDoc_QueryUserDepartmentsReq,
    responseSerialize: serialize_secDoc_JsonDataResponse,
    responseDeserialize: deserialize_secDoc_JsonDataResponse,
  },
  getSecureDocumentUpdateUrl: {
    path: '/secDoc.SecDocService/getSecureDocumentUpdateUrl',
    requestStream: false,
    responseStream: false,
    requestType: secdoc_pb.GetSecureDocumentUpdateUrlReq,
    responseType: secdoc_pb.JsonDataResponse,
    requestSerialize: serialize_secDoc_GetSecureDocumentUpdateUrlReq,
    requestDeserialize: deserialize_secDoc_GetSecureDocumentUpdateUrlReq,
    responseSerialize: serialize_secDoc_JsonDataResponse,
    responseDeserialize: deserialize_secDoc_JsonDataResponse,
  },
  updateSecureDocument: {
    path: '/secDoc.SecDocService/updateSecureDocument',
    requestStream: false,
    responseStream: false,
    requestType: secdoc_pb.UpdateSecureDocumentReq,
    responseType: secdoc_pb.JsonDataResponse,
    requestSerialize: serialize_secDoc_UpdateSecureDocumentReq,
    requestDeserialize: deserialize_secDoc_UpdateSecureDocumentReq,
    responseSerialize: serialize_secDoc_JsonDataResponse,
    responseDeserialize: deserialize_secDoc_JsonDataResponse,
  },
};

exports.SecDocServiceClient = grpc.makeGenericClientConstructor(SecDocServiceService);
