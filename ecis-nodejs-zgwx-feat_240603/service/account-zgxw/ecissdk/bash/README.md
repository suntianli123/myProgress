# 简介

该脚本用于根据proto文件一键生成相应的js和ts文件。
# 准备工作

安装相关工具
```shell
npm install request -g
npm config set unsafe-perm true
npm install protoc-gen-grpc -g
```
# 操作说明

执行同目录下的`./build.sh`即可，生成的文件约定会放到`../client`目录下。

脚本执行完毕后会生成两类文件

- 以`_grpc_pb`结尾的文件是对于服务的定义
- 以`_pb`结尾的文件是对于消息的定义
