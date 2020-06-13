import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

class InputValidationError extends BaseError {
  readonly validationErrors: Record<string, string>;

  /**
   * @param {Record<string, string>} validationErrors - The validation errors
   */
  constructor(validationErrors: Record<string, string>) {
    super('Invalid input', ErrorCode.INPUT_INVALID, 400);
    this.validationErrors = validationErrors;
  }
}

export { InputValidationError };
