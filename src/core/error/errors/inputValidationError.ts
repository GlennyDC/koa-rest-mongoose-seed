import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

/**
 * Error class for all requests that have an invalid or malformed input.
 *
 * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.1|400 Bad request}
 */
class InputValidationError extends BaseError {
  readonly validationErrors: Record<string, string>;

  /**
   * @param {Record<string, string>} validationErrors - The validation errors
   */
  constructor(validationErrors: Record<string, string>) {
    super('Invalid input', ErrorCode.INPUT_VALIDATION_ERROR, 400);
    this.validationErrors = validationErrors;
  }
}

export { InputValidationError };
