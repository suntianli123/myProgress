import { newLogger } from './util/logger'
import config from './config'

const logLevel = process.env.LOG_LEVEL || 'info'
const logger = newLogger(config.appid, logLevel)

export {
  logger
}
