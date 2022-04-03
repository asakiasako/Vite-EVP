// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
'use strict';
import rpc_pb from './rpc_pb'
import grpc from '@grpc/grpc-js'

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_ApiRequest(arg) {
  if (!(arg instanceof rpc_pb.ApiRequest)) {
    throw new Error('Expected argument of type ApiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ApiRequest(buffer_arg) {
  return rpc_pb.ApiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ApiResponse(arg) {
  if (!(arg instanceof rpc_pb.ApiResponse)) {
    throw new Error('Expected argument of type ApiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ApiResponse(buffer_arg) {
  return rpc_pb.ApiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_RpcRoutesList(arg) {
  if (!(arg instanceof rpc_pb.RpcRoutesList)) {
    throw new Error('Expected argument of type RpcRoutesList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_RpcRoutesList(buffer_arg) {
  return rpc_pb.RpcRoutesList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var ServiceRPCService = exports.ServiceRPCService = {
  request: {
    path: '/ServiceRPC/request',
    requestStream: false,
    responseStream: false,
    requestType: rpc_pb.ApiRequest,
    responseType: rpc_pb.ApiResponse,
    requestSerialize: serialize_ApiRequest,
    requestDeserialize: deserialize_ApiRequest,
    responseSerialize: serialize_ApiResponse,
    responseDeserialize: deserialize_ApiResponse,
  },
  listApis: {
    path: '/ServiceRPC/listApis',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: rpc_pb.RpcRoutesList,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_RpcRoutesList,
    responseDeserialize: deserialize_RpcRoutesList,
  },
};

export const ServiceRPCClient = grpc.makeGenericClientConstructor(ServiceRPCService);
