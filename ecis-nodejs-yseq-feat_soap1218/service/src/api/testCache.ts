import { sdkInstance } from '../grpc/sdk'

export async function testCache() {
  const key = 'hello'
  const value = 'world!'

  const hash = 'HashTest'
  const field = 'field'
  const hashValue = 'value'
  const result: any = {}
  try {
    const resp = await sdkInstance.middleware.cache.set(key, value)
    result.set = 'pass'
    result['set.resp'] = resp
    if (resp.result !== 'ok') {
      result.set = `${resp.result} ${resp.msg}`
      return result
    }
  } catch (e) {
    result.set = e.message
    return result
  }

  try {
    const resp = await sdkInstance.middleware.cache.get(key)
    result.get = 'pass'
    result['get.resp'] = resp
    if (resp.result !== 'ok') {
      result.get = `${resp.result} ${resp.msg}`
      return result
    }
    if (resp.data.data !== value) {
      result.get = `diff value need ${value}, but ${resp.data.data}`
      return result
    }
  } catch (e) {
    result.get = e.message
    return result
  }

  try {
    const resp = await sdkInstance.middleware.cache.del(key)
    result.del = 'pass'
    result['del.resp'] = resp
    if (resp.result !== 'ok') {
      result.del = `${resp.result} ${resp.msg}`
      return result
    }
  } catch (e) {
    result.del = e.message
    return result
  }

  try {
    const resp = await sdkInstance.middleware.cache.hSet(hash, field, hashValue)
    result.hSet = 'pass'
    result['hSet.resp'] = resp
    if (resp.result !== 'ok') {
      result.hSet = `${resp.result} ${resp.msg}`
      return result
    }
  } catch (e) {
    result.hSet = e.message
    return result
  }

  try {
    const resp = await sdkInstance.middleware.cache.hGet(hash, field)
    result.hGet = 'pass'
    result['hGet.resp'] = resp
    if (resp.result !== 'ok') {
      result.hGet = `${resp.result} ${resp.msg}`
      return result
    }
  } catch (e) {
    result.hGet = e.message
    return result
  }

  try {
    const resp = await sdkInstance.middleware.cache.hGetAll(hash)
    result.hGetAll = 'pass'
    result['hGetAll.resp'] = resp
    if (resp.result !== 'ok') {
      result.hGetAll = `${resp.result} ${resp.msg}`
      return result
    }
  } catch (e) {
    result.hGetAll = e.message
    return result
  }

  try {
    const resp = await sdkInstance.middleware.cache.hDel(hash, field)
    result.hDel = 'pass'
    result['hDel.resp'] = resp
    if (resp.result !== 'ok') {
      result.hDel = `${resp.result} ${resp.msg}`
      return result
    }
  } catch (e) {
    result.hDel = e.message
    return result
  }

  return result
}
