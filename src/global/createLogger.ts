import { getNamespace } from 'cls-hooked';
import { Format, TransformableInfo } from 'logform';
import winston from 'winston';

import { getEnvironmentVariable } from './getEnvironmentVariable';

const LOGGING_LEVEL = getEnvironmentVariable<string>('LOGGING_LEVEL');

/**
 * Create the format for console logs.
 *
 * @returns {Format} The Winston Console transport format
 */
const createConsoleFormat = (): Format =>
  winston.format.combine(
    winston.format.colorize({ message: true }),
    winston.format.timestamp(),
    winston.format.printf((info) => {
      const loggingNamespace = getNamespace('logging');
      const { level, message, timestamp, moduleName } = info;
      if (loggingNamespace) {
        const requestId = loggingNamespace.get('requestId');
        if (requestId) {
          return `[${timestamp}] [${requestId}] [${level}] [${moduleName}] - ${message}`;
        }
      }
      return `[${timestamp}] [${level}] [${moduleName}] - ${message}`;
    }),
  );

/**
 * Make the format for file logs.
 *
 * @returns {Format} The Winston File transport winston.format
 */
const makeFileFormat = (): Format => {
  const message = Symbol.for('message');
  const jsonFormatter = (logEntry: any): TransformableInfo => {
    const loggingNamespace = getNamespace('logging');
    const requestId = loggingNamespace && loggingNamespace.get('requestId'); // FIXME
    const base = { requestId };
    const json = Object.assign(base, logEntry);
    logEntry[message] = JSON.stringify(json);
    return logEntry;
  };

  return winston.format.combine(
    winston.format.timestamp(),
    winston.format(jsonFormatter)(),
  );
};

/**
 * Create a logger.
 *
 * Default npm logging levels are used and are prioritized from highest
 * to lowest: error, warn, info, http, verbose, debug, silly.
 *
 * @param {string} moduleName - The name of the module which will use the logger
 *
 * @returns {winston.Logger} A Winston logger
 */
export const createLogger = (moduleName: string): winston.Logger =>
  winston.createLogger({
    level: LOGGING_LEVEL,
    transports: [
      new winston.transports.Console({
        format: createConsoleFormat(),
      }),
    ],
    defaultMeta: { moduleName },
  });
