import { BaseError } from './baseError';
import { ErrorCode } from './errorCode';

class InputValidationError extends BaseError {
  readonly validationErrors: Record<string, string>;

  constructor(validationErrors: Record<string, string>) {
    super('Invalid input', ErrorCode.INPUT_INVALID, 400);
    this.validationErrors = validationErrors;
  }
}

export { InputValidationError };
