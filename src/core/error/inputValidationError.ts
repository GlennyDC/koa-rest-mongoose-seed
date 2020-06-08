import { ApolloError } from 'apollo-server-koa';

import { ErrorCode } from './errorCode';

class InputValidationError extends ApolloError {
  constructor(validationErrors: Record<string, string>) {
    super('Input validation failed', ErrorCode.INPUT_INVALID, {
      validationErrors,
    });
    Object.defineProperty(this, 'name', { value: 'InputValidationError' });
  }
}

export { InputValidationError };
