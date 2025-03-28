/*
 * @Author: lz-ui@jczxw.cn
 * @Date: 2022-04-20 13:59:49
 * @LastEditors: lz-ui
 * @LastEditTime: 2022-04-21 15:41:20
 * @Description: file content
 */

import { logger } from '../../ins'

/**
 *  sdk result='ok'
 *  api result=0
 */

/** 自定义-返回参数配置 */
interface ResOp {
  // 返回数据
  data?: any
  // 是否成功
  result?: number | string
  code?: number | string
  // 返回消息
  msg?: string | any

  message?: string | any
}

export function resJson(op?: ResOp): ResOp {
  if (!op) {
    return {
      code: '1000',
      msg: '操作成功'
    }
  }
  if (op.result && ![0, 'ok'].includes(op.result)) {
    return {
      msg: op.result,
      code: '9999'
    }
  } else {
    return {
      msg: op.msg || '操作成功',
      code: '1000',
      data: op.data
    }
  }
}

/* 验证api返回数据 */
export function resCheck(e: string | ResOp) {
  if (typeof e === 'object' && e.result !== 0) throw e
}

/* 验证sdk返回数据 */
export function sdkCheck(e: string | ResOp) {
  if (typeof e === 'object' && e.result !== 'ok') throw e
}

export function resErrJson(e: string | ResOp | any): ResOp {
  /* 错误日志 */
  logger.error({ msg: e.message || e.msg || e })
  if (typeof e === 'string') {
    return {
      msg: e || '系统开小差了！',
      result: '9999'
    }
  }
  return {
    msg: e.message || e.msg || e,
    result: '9999'
  }
}

export function resErrJsonDaily(e: string | ResOp | any): ResOp {
  /* 错误日志 */
  logger.error({ msg: e.message || e.msg || e })
  if (typeof e === 'string') {
    return {
      msg: e || '系统开小差了！',
      result: '9999'
    }
  }
  return {
    msg: e.message || e.msg || '推送失败',
    code: '9999'
  }
}

export function resDaily() {
  return {
    msg: '推送成功',
    code: '1000'
  }
}
