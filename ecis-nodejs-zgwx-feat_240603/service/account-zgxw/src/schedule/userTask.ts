// *  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │  |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

import * as schedule from 'node-schedule'

const scheduleUserTask = () => {
  // 每分钟的第30秒定时执行一次:
  schedule.scheduleJob('0 05 02 * * *', () => {
    console.log('【同步用户定时任务】' + new Date())
  })
}

export default scheduleUserTask
