import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

/**
 * Error class for all requests that lack valid authentication credentials for
 * the target resource.
 *
 * @see {@link https://tools.ietf.org/html/rfc7235#section-3.1|401 Unauthorized}
 */
class AuthenticationError extends BaseError {
  constructor() {
    super(
      'Must authenticate to access this resource',
      ErrorCode.AUTHENTICATION_ERROR,
      401,
    );
  }
}

export { AuthenticationError };
