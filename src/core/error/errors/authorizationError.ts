import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

class AuthorizationError extends BaseError {
  constructor() {
    super('Not authorized', ErrorCode.NOT_AUTHORIZED, 403);
  }
}

export { AuthorizationError };
