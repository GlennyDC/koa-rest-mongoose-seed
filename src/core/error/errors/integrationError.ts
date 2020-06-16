import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

/**
 * Error class for all requests that were unable to be fulfilled by the server
 * due to an invalid response from another server.
 *
 * @see {@link https://tools.ietf.org/html/rfc7231#section-6.6.3|502 Bad gateway}
 */
class IntegrationError extends BaseError {
  constructor() {
    super(
      'The server was unable to fulfill the request because it received an invalid response from another server.',
      ErrorCode.INTEGRATION_ERROR,
      502,
    );
  }
}

export { IntegrationError };
