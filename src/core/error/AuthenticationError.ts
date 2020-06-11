import { BaseError } from './baseError';
import { ErrorCode } from './errorCode';

class AuthenticationError extends BaseError {
  constructor() {
    super('Must authenticate', ErrorCode.NOT_AUTHENTICATED, 401);
  }
}

export { AuthenticationError };
