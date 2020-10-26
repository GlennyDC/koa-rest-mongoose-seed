import type Koa from 'koa';
import helmet from 'koa-helmet';

import { createAuthTokenExtractorMiddleware } from './createAuthTokenExtractorMiddleware';
import { createErrorResponderMiddleware } from './createErrorResponderMiddleware';
import { createLoggingMiddleware } from './createLoggingMiddleware';

export const applyMiddleware = (app: Koa): void => {
  // app.use(helmet()); TODO: This breaks GraphQL Playground https://github.com/graphql/graphql-playground/issues/1283
  app.use(createErrorResponderMiddleware());
  app.use(createLoggingMiddleware());
  app.use(createAuthTokenExtractorMiddleware());
};
