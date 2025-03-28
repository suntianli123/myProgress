import { logger } from '../server'
import config from '../config'
const Redis = require('ioredis')

const cluster = new Redis.Cluster(config.redis.members, {
  redisOptions: {
    password: config.redis.password,
  }
})

cluster.on('ready', function () {
  console.log('redis cluster ready')
})

cluster.on('connect', function () {
  console.log(new Date(), 'redis cluster is connected')
})

cluster.on('reconnecting', function (args: any) {
  console.log(new Date(), 'redis cluster reconnecting', args)
})

cluster.on('end', function (args: any) {
  console.log('redis cluster close', args)
})

cluster.on('warning', function (err: any) {
  console.log('redis cluster warning', err)
})

cluster.on('error', function (err: any) {
  console.log('redis cluster Error ', err)
})

/**
 * redis 尝试set key不存在：成功set并返回1 key已存在：返回0
 * @param key
 * @param value
 */
export const redisSetnx = (key:string, value:string) :Promise<any> => {
  return new Promise((resolve, reject) => {
    cluster.setnx(key, value, function (err: any, result: any) {
      if (err) {
        logger.warn(err)
        return reject(err)
      }
      return resolve(result)
    })
  })
}

/**
 * redis 通过key获取value
 * @param key
 */
export const redisGet = (key:string) :Promise<any> => {
  return new Promise((resolve, reject) => {
    cluster.get(key, function (err: any, result: any) {
      if (err) {
        logger.warn(err)
        return reject(err)
      }
      return resolve(result)
    })
  })
}

/**
 * redis 设置key的有效时长
 * @param key
 * @param seconds 单位（秒）
 */
export const redisExpire = (key:string, seconds:number) :Promise<any> => {
  return new Promise((resolve, reject) => {
    cluster.expire(key, seconds, function (err: any, result: any) {
      if (err) {
        logger.warn(err)
        return reject(err)
      }
      return resolve(result)
    })
  })
}

/**
 * redis 删除key
 * @param key
 */
export const redisDel = (key:string) :Promise<any> => {
  return new Promise((resolve, reject) => {
    cluster.del(key, function (err: any, result: any) {
      if (err) {
        logger.warn(err)
        return reject(err)
      }
      return resolve(result)
    })
  })
}

/**
 * 获取锁
 * @param key redisKey
 * @param seconds 有效时间（秒）
 */
export async function redisGetLock(key: string, seconds: number) {
  if (!key || key.trim() === '') {
    throw new Error('key can not be empty!')
  }
  if (!seconds || seconds === 0) {
    throw new Error('seconds can not be empty!')
  }
  // 锁过期时间
  const expireTime = new Date().getTime() + seconds * 1000
  const setnxResult = await redisSetnx(key, expireTime.toString())
  // 返回值为1时，获取锁成功
  if (setnxResult === 1) {
    // 为key设置有效时长
    await redisExpire(key, seconds)
    logger.info(`获取锁【${key}】成功,有效时长【${seconds}】秒.`)
    return true
  }
  // 返回值不为1时，判断该key的value是否过期，避免死锁
  const value = await redisGet(key)
  const now = new Date().getTime()
  if (now > parseInt(value)) {
    // 原锁已失效
    await redisDel(key)
    // 重新竞争
    const setnxResult = await redisSetnx(key, expireTime.toString())
    // 返回值为1时，获取锁成功
    if (setnxResult === 1) {
      // 为key设置有效时长
      await redisExpire(key, seconds)
      logger.info(`获取锁【${key}】成功,有效时长【${seconds}】秒.`)
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * 释放锁
 * @param key redisKey
 */
export async function redisReleaseLock(key: string) {
  if (!key || key.trim() === '') {
    throw new Error('key can not be empty!')
  }
  await redisDel(key)
}
