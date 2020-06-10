import { BaseError } from './baseError';
import { ErrorCode } from './errorCode';

class InputValidationError extends BaseError {
  validationErrors: Record<string, string>;

  constructor(validationErrors: Record<string, string>) {
    super('Input validation failed', ErrorCode.INPUT_INVALID, 400);
    this.validationErrors = validationErrors;
  }
}

export { InputValidationError };
