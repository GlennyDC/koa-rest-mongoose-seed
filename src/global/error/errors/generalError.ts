import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

/**
 * Error class for all errors that are not specified by the other error classes
 *
 */
export class GeneralError extends BaseError {
  constructor(
    message: string,
    code: ErrorCode,
    status: number,
    wrappedError?: Error,
  ) {
    super(message, code, status, wrappedError);
  }
}
