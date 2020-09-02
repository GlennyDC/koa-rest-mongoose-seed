import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

/**
 * Error class for all requests that lack valid permissions to access
 * the target resource.
 *
 * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.3|403 Forbidden}
 */
class AuthorizationError extends BaseError {
  constructor() {
    super(
      'Not authorized to access this resource',
      ErrorCode.AUTHORIZATION_ERROR,
      403,
    );
  }
}

export { AuthorizationError };
