import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

/**
 * Error class for all requests that access a resource that does not exist.
 *
 * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.4|404 Not found}
 */
export class NotFoundError extends BaseError {
  constructor(message: string, code: ErrorCode) {
    super(message, code, 404);
  }
}
