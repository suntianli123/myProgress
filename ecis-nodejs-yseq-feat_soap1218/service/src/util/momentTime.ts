const moment = require('moment')

export function currentTime() {
  return moment().format('YYYY-MM-DD HH:mm:ss') // 当前时间格式
}
