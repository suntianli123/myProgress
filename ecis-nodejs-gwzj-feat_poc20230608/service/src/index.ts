import { run, logger } from './server'
import config from './config'
import { initGrpSDKInstance } from './grpc/sdk'

initGrpSDKInstance().then((res) => {
  run && run(config.port)
})

export { logger }
