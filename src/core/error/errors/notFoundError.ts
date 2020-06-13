import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

class NotFoundError extends BaseError {
  constructor() {
    super('Resource not found', ErrorCode.NOT_FOUND, 404);
  }
}

export { NotFoundError };
