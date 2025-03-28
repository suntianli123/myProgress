/*
 * @Author: lz-ui@jczxw.cn
 * @Date: 2022-04-20 13:56:56
 * @LastEditors: lz-ui
 * @LastEditTime: 2022-04-29 09:22:31
 * @Description: file content
 */
// 模拟sdk路径
import mysql from './middleware/mysql'
import cache from './middleware/cache'
import etcd from './middleware/etcd'

const requestSdk = {
  middleware: {
    mysql,
    cache,
    etcd
  }
}
// 本地开发dev环境通过http调用grpc 非dev环境直接走grpc
const sdkInstance: any = requestSdk

export default sdkInstance
