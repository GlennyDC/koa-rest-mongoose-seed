import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

// TODO: Do we need this? We already got the better and more expressive Integrtation error.
class RequestError extends BaseError {
  constructor() {
    super('Bad gateway', ErrorCode.REQUEST_FAILED, 502);
  }
}

export { RequestError };
