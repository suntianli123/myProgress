#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd "${BASEDIR}"/../

PROTO_DEST=./protos
OUTPUT_DEST=./client

mkdir -p ${OUTPUT_DEST}

# JavaScript code generating
protoc-gen-grpc \
--js_out=import_style=commonjs,binary:${OUTPUT_DEST} \
--grpc_out=grpc_js:${OUTPUT_DEST} \
--proto_path ${PROTO_DEST} \
${PROTO_DEST}/*/*.proto

# Typescript code generating
protoc-gen-grpc-ts \
--ts_out=grpc_js:${OUTPUT_DEST} \
--proto_path ${PROTO_DEST} \
${PROTO_DEST}/*/*.proto
