import { BaseError } from './baseError';
import { ErrorCode } from './errorCode';

class IntegrationError extends BaseError {
  constructor() {
    super('Integration failed', ErrorCode.INTEGRATION_FAILED, 503);
  }
}

export { IntegrationError };
