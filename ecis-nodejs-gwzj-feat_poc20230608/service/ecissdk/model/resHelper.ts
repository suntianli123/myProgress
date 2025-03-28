export interface Resp {
  result: string
  data?: any
  msg?: string
  info?: any
}

export function OKResp(data: Object = null) {
  return {
    result: 'ok',
    data: data
  } as Resp
}

export function ErrResp(result: string, msg: string, error?: string) {
  return {
    result: result,
    msg: error ? `${msg}:${error}` : msg
  } as Resp
}
