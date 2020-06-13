import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

class RequestError extends BaseError {
  constructor() {
    super('Bad gateway', ErrorCode.REQUEST_FAILED, 502);
  }
}

export { RequestError };
