import { ApolloError } from 'apollo-server-koa';

import { ErrorCode } from './errorCode';

class AuthorizationError extends ApolloError {
  constructor() {
    super('Authorization failed', ErrorCode.NOT_AUTHORIZED);
    Object.defineProperty(this, 'name', { value: 'AuthorizationError' });
  }
}

export { AuthorizationError };
