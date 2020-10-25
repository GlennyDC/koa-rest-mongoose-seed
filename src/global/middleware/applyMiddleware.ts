import type Koa from 'koa';
import helmet from 'koa-helmet';

import { createAuthTokenExtractorMiddleware } from './createAuthTokenExtractorMiddleware';
import { createErrorResponderMiddleware } from './createErrorResponderMiddleware';
import { createLoggingMiddleware } from './createLoggingMiddleware';

export const applyMiddleware = (app: Koa): void => {
  app.use(helmet());
  app.use(createErrorResponderMiddleware());
  app.use(createLoggingMiddleware());
  app.use(createAuthTokenExtractorMiddleware());
};
