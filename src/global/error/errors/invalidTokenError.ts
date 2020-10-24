import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

/**
 * Error class for all requests that use invalid authentication credentials for
 * the target resource.
 */
export class InvalidTokenError extends BaseError {
  constructor() {
    super('Invalid token', ErrorCode.INVALID_TOKEN, 401);
  }
}
