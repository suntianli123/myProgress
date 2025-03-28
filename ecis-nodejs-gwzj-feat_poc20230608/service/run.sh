#!/bin/bash

echo "120.92.124.158  exam0312.wpseco.cn"  >> /etc/hosts


node /data/apps/gosrv/dist/src/index.js
 
# 保留终端，防止容器自动退出
/bin/sh