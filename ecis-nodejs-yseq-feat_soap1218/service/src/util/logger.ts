import { createLogger, format, transports } from 'winston'
const { combine, timestamp, colorize, errors, splat, json } = format

export function newLogger(appid: string, logLevel: string) {
  return createLogger({
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      errors({ stack: true }),
      splat(),
      json(),
      colorize({ all: true })
    ),
    defaultMeta: { appid: appid },
    transports: [
      new transports.Console({
        level: logLevel
      })
    ]
  })
}
