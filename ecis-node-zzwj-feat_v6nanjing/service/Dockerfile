FROM node:16.20.2-alpine as node-build-env
ADD . /tmp
WORKDIR /tmp
RUN set -e && npm config set registry https://registry.npmmirror.com && \
    sh build.sh && mkdir -p /data/apps/gosrv && \
    npm run test && \
    cp -a . /data/apps/gosrv/

FROM node:16.20.2-alpine
ARG grpcAddr
ENV grpcAddr=${grpcAddr}
COPY --from=node-build-env /data/apps/gosrv /data/apps/gosrv
EXPOSE 8000
CMD ["node", "/data/apps/gosrv/dist/src/index.js"]
