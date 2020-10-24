import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

/**
 * Error class for all requests that use expired authentication credentials for
 * the target resource.
 */
export class TokenExpiredError extends BaseError {
  constructor() {
    super('Token expired', ErrorCode.TOKEN_EXPIRED, 401);
  }
}
