import { stringifyLoop } from './index'
import * as mysql from 'mysql'
import { logger } from '../server'
import config from '../config'

const connection = mysql.createPool({
  host: `${config.database.host}`,
  port: config.database.port,
  database: `${config.database.database}`,
  user: `${config.database.user}`,
  password: `${config.database.password}`,
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000
//   supportBigNumbers: true,
//   bigNumberStrings: true
  /* 客户环境配置 */
  // host: '10.80.80.75',
  // port: 33061,
  // database: 'wps',
  // user: 'wps',
  // password: ''
})

const rdsQuery = async (sql: string): Promise<any> => {
  return await new Promise((resolve, reject) => {
    connection.query(sql, (err, res: any) => {
      if (err) {
        logger.error({ sql, msg: `${stringifyLoop(err)}` })
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export default rdsQuery
