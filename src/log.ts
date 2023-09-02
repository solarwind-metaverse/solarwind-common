import { Logger, createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format

interface Log {
  debug: (...tokens: any[]) => void;
  info: (...tokens: any[]) => void;
  error: (...tokens: any[]) => void;
}

const lineFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

export const getLog = (service: string): Log => {

  const logger = createLogger({
    level: 'debug',
    format: combine(
      label({ label: service }),
      timestamp(),
      lineFormat
    ),
    transports: [new transports.Console()],
  })

  const msg = (tokens: any[]) => {
    return tokens.join(' ')
  }

  return {
    debug: (...tokens) => {
      logger.log('debug', msg(tokens))
    },
    info: (...tokens) => {
      logger.log('info', msg(tokens))
    },
    error: (...tokens) => {
      logger.log('error', msg(tokens))
    }
  }

}