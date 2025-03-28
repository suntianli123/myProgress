import { MysqlDelResp, MysqlInsertResp, MysqlSelResp, MysqlUpdateResp } from '../../../../ecissdk/model/data'
import { logger } from '../../../server'
import config from '../../../config'
const { Pool } = require('pg')

class Mysql {
    pgPool: any
    constructor() {
      const pgConfig = {
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        max: 100,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 30000,
      }
      this.pgPool = new Pool(pgConfig)
    }

    select(dbName: string, sql: string, values: any[]): Promise<MysqlSelResp> {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        logger.info({ message: `【sql-select】${dbName}, ${sql}` })
        this.pgPool.connect(function (isErr: any, client: any, done: any) {
          if (isErr) {
            console.log('connect query:' + isErr.message)
            return
          }
          client.query(sql, values).then((res: any) => {
            done()
            resolve({
              result: 'ok',
              data: { rows: res.rows },
              msg: '操作成功'
            })
          }).finally(() => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              result: 'error',
              msg: '操作失败'
            })
          })
        })
      })
    }

    async update(dbName: string, sql: string, values: any[]): Promise<MysqlUpdateResp> {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        logger.info({ message: `【sql-update】${dbName}, ${sql}, ${values}` })
        this.pgPool.connect(function (isErr: any, client: any, done: any) {
          if (isErr) {
            console.log('connect query:' + isErr.message)
            return
          }
          client.query(
            sql,
            values
          ).then((res: any) => {
            done()
            resolve({
              result: 'ok',
              data: { affect: res },
              msg: '操作成功'
            })
          }).finally(() => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              result: 'error',
              msg: '操作失败'
            })
          })
        })
      })
    }

    async insert(dbName: string, sql: string, values: any[]): Promise<MysqlInsertResp> {
      return new Promise((resolve, reject) => {
        logger.info({ message: `【sql-insert】${dbName}, ${sql}, ${values}` })
        this.pgPool.connect(function (isErr: any, client: any, done: any) {
          if (isErr) {
            console.log('connect query:' + isErr.message)
            return
          }
          client.query(
            sql,
            values
          ).then((res: any) => {
            done()
            resolve({
              result: 'ok',
              data: { affect: res },
              msg: '操作成功'
            })
          }).finally(() => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              result: 'error',
              msg: '操作失败'
            })
          })
        })
      })
    }

    async delete(dbName: string, sql: string, values: any[]): Promise<MysqlDelResp> {
      return new Promise((resolve, reject) => {
        logger.info({ message: `【sql-delete】${dbName}, ${sql}` })
        this.pgPool.connect(function (isErr: any, client: any, done: any) {
          if (isErr) {
            console.log('connect query:' + isErr.message)
            return
          }
          client.query(
            sql,
            values
          ).then((res: any) => {
            done()
            resolve({
              result: 'ok',
              data: { affect: res },
              msg: '操作成功'
            })
          }).finally(() => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              result: 'error',
              msg: '操作失败'
            })
          })
        })
      })
    }
}

export default Mysql
