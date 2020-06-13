import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

class IntegrationError extends BaseError {
  constructor() {
    super('Bad gateway', ErrorCode.INTEGRATION_FAILED, 502);
  }
}

export { IntegrationError };
