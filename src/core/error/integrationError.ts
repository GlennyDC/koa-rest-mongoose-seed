import { ApolloError } from 'apollo-server-koa';

import { ErrorCode } from './errorCode';

class IntegrationError extends ApolloError {
  constructor() {
    super('Authentication failed', ErrorCode.INTEGRATION_FAILED);
    Object.defineProperty(this, 'name', { value: 'IntegrationError' });
  }
}

export { IntegrationError };
