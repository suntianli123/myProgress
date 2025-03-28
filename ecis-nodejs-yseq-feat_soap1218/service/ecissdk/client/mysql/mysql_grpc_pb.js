// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mysql_mysql_pb = require('../mysql/mysql_pb.js');

function serialize_mysql_CommonRequest(arg) {
  if (!(arg instanceof mysql_mysql_pb.CommonRequest)) {
    throw new Error('Expected argument of type mysql.CommonRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mysql_CommonRequest(buffer_arg) {
  return mysql_mysql_pb.CommonRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mysql_JsonResponse(arg) {
  if (!(arg instanceof mysql_mysql_pb.JsonResponse)) {
    throw new Error('Expected argument of type mysql.JsonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mysql_JsonResponse(buffer_arg) {
  return mysql_mysql_pb.JsonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义 mysql grpc 服务接口 
var MysqlServiceService = exports.MysqlServiceService = {
  select: {
    path: '/mysql.MysqlService/select',
    requestStream: false,
    responseStream: false,
    requestType: mysql_mysql_pb.CommonRequest,
    responseType: mysql_mysql_pb.JsonResponse,
    requestSerialize: serialize_mysql_CommonRequest,
    requestDeserialize: deserialize_mysql_CommonRequest,
    responseSerialize: serialize_mysql_JsonResponse,
    responseDeserialize: deserialize_mysql_JsonResponse,
  },
  update: {
    path: '/mysql.MysqlService/update',
    requestStream: false,
    responseStream: false,
    requestType: mysql_mysql_pb.CommonRequest,
    responseType: mysql_mysql_pb.JsonResponse,
    requestSerialize: serialize_mysql_CommonRequest,
    requestDeserialize: deserialize_mysql_CommonRequest,
    responseSerialize: serialize_mysql_JsonResponse,
    responseDeserialize: deserialize_mysql_JsonResponse,
  },
  insert: {
    path: '/mysql.MysqlService/insert',
    requestStream: false,
    responseStream: false,
    requestType: mysql_mysql_pb.CommonRequest,
    responseType: mysql_mysql_pb.JsonResponse,
    requestSerialize: serialize_mysql_CommonRequest,
    requestDeserialize: deserialize_mysql_CommonRequest,
    responseSerialize: serialize_mysql_JsonResponse,
    responseDeserialize: deserialize_mysql_JsonResponse,
  },
  delete: {
    path: '/mysql.MysqlService/delete',
    requestStream: false,
    responseStream: false,
    requestType: mysql_mysql_pb.CommonRequest,
    responseType: mysql_mysql_pb.JsonResponse,
    requestSerialize: serialize_mysql_CommonRequest,
    requestDeserialize: deserialize_mysql_CommonRequest,
    responseSerialize: serialize_mysql_JsonResponse,
    responseDeserialize: deserialize_mysql_JsonResponse,
  },
};

exports.MysqlServiceClient = grpc.makeGenericClientConstructor(MysqlServiceService);
