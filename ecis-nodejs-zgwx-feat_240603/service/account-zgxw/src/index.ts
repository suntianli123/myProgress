import { run, logger } from './server'
import config from './config'

run && run(config.port)

export { logger }
