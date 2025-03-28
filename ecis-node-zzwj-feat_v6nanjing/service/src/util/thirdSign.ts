import config from '../config'
import { mdEncryption32 } from './md5'

const thirdSign = () => {
  const client_id = config.third.clientId
  const client_secret = config.third.clientSecret
  const request_time = new Date().getTime()
  const sign = `${mdEncryption32(`${client_id}${client_secret}${request_time}`)}`
  return {
    client_id,
    request_time,
    sign
  }
}

export default thirdSign
