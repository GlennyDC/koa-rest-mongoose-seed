import { ApolloError } from 'apollo-server-koa';

import { ErrorCode } from './errorCode';

class AuthenticationError extends ApolloError {
  constructor() {
    super('Authentication failed', ErrorCode.NOT_AUTHENTICATED);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}

export { AuthenticationError };
