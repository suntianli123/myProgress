export interface IWPS2Error<T = any> {
  status: number
  code: number
  message?: string
  data?: T
}

export class WPSError<T = any> implements IWPS2Error<T> {
  status: number
  code: number
  message?: string
  data?: T

  constructor(status: number, code: number, message?: string, data?: T) {
    this.status = status
    this.code = code
    this.message = message
    this.data = data
  }
}
