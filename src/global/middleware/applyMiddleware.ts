import type Koa from 'koa';
import helmet from 'koa-helmet';

import { createErrorResponderMiddleware } from './createErrorResponderMiddleware';
import { createLoggingMiddleware } from './createLoggingMiddleware';
import { createTokenExtractorMiddleware } from './createTokenExtractorMiddleware';
import { createTokenValidatorMiddleware } from './createTokenValidatorMiddleware';

export const applyMiddleware = (app: Koa): void => {
  app.use(helmet());
  app.use(createErrorResponderMiddleware());
  app.use(createLoggingMiddleware());
  app.use(createTokenExtractorMiddleware());
  app.use(createTokenValidatorMiddleware());
};
