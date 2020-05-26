import { getNamespace } from 'cls-hooked';
import config from 'config';
import { Format, TransformableInfo } from 'logform';
import { createLogger, format, transports, Logger } from 'winston';

const LOGGING_LEVEL = config.get<string>('server.logging.level');
const ENABLE_CONSOLE_LOGGING = config.get<string>('server.logging.console');
const ENABLE_FILE_LOGGING = config.get<string>('server.logging.file');

/**
 * Make the format for console logs.
 *
 * @returns {Format} The Winston Console transport format
 */
const makeConsoleFormat = (): Format =>
  format.combine(
    format.colorize({ message: true }),
    format.timestamp(),
    format.printf((info) => {
      const loggingNamespace = getNamespace('logging');
      const requestId = loggingNamespace.get('requestId');
      const { level, message, timestamp, moduleName } = info;
      if (requestId) {
        return `[${timestamp}] [${requestId}] [${level}] [${moduleName}] - ${message}`;
      }
      return `[${timestamp}] [${level}] [${moduleName}] - ${message}`;
    }),
  );

/**
 * Make the format for file logs.
 *
 * @returns {Format} The Winston File transport format
 */
const makeFileFormat = (): Format => {
  const message = Symbol.for('message');
  const jsonFormatter = (logEntry: any): TransformableInfo => {
    const loggingNamespace = getNamespace('logging');
    const requestId = loggingNamespace.get('requestId');
    const base = { requestId };
    const json = Object.assign(base, logEntry);
    logEntry[message] = JSON.stringify(json);
    return logEntry;
  };

  return format.combine(format.timestamp(), format(jsonFormatter)());
};

/**
 * Make a logger.
 *
 * @param {string} moduleName - The name of the module wich will use the logger
 *
 * @returns {Logger} A Winston logger
 */
const makeLogger = (moduleName: string): Logger =>
  createLogger({
    level: LOGGING_LEVEL,
    transports: [
      new transports.Console({
        format: makeConsoleFormat(),
        silent: !ENABLE_CONSOLE_LOGGING,
      }),
      new transports.File({
        filename: 'app.log',
        maxsize: 5242880, // 5 MB (binary)
        maxFiles: 5,
        format: makeFileFormat(),
        silent: !ENABLE_FILE_LOGGING,
      }),
    ],
    defaultMeta: { moduleName },
  });

export { makeLogger };
