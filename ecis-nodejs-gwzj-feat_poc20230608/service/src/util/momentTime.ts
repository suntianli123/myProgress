import * as moment from 'moment'

export function currentTime(inp?: moment.MomentInput) {
  return moment(inp).format('YYYY-MM-DD HH:mm:ss') // 当前时间格式
}
