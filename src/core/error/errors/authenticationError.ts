import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

class AuthenticationError extends BaseError {
  constructor() {
    super('Must authenticate', ErrorCode.NOT_AUTHENTICATED, 401);
  }
}

export { AuthenticationError };
