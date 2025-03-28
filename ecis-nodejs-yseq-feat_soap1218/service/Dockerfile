FROM node:16.20.2-alpine as node-build-env
ADD . /tmp
WORKDIR /tmp
RUN set -e && npm config set registry https://registry.npmmirror.com && \
    npm i && npx tsc && mkdir -p /data/apps/gosrv && \
    npm run test && \
    cp -a . /data/apps/gosrv/

FROM node:16.20.2-alpine
# 设置镜像的时区
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk update && apk add tzdata 
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo "Asia/Shanghai" > /etc/timezone

ARG grpcAddr
ENV grpcAddr=${grpcAddr}
COPY --from=node-build-env /data/apps/gosrv /data/apps/gosrv
EXPOSE 8000
CMD ["node", "/data/apps/gosrv/dist/src/index.js"]
