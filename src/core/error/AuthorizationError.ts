import { BaseError } from './baseError';
import { ErrorCode } from './errorCode';

class AuthorizationError extends BaseError {
  constructor() {
    super('Not authorized', ErrorCode.NOT_AUTHORIZED, 403);
  }
}

export { AuthorizationError };
