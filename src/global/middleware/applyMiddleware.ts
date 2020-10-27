import type Koa from 'koa';
import helmet from 'koa-helmet';
import type { Logger } from 'winston';

import { createAuthTokenExtractorMiddleware } from './createAuthTokenExtractorMiddleware';
import { createErrorResponderMiddleware } from './createErrorResponderMiddleware';
import { createLoggingMiddleware } from './createLoggingMiddleware';

export const applyMiddleware = (app: Koa, logger: Logger): void => {
  logger.info('Apply middleware');

  try {
    // app.use(helmet()); TODO: This breaks GraphQL Playground https://github.com/graphql/graphql-playground/issues/1283
    app.use(createErrorResponderMiddleware());
    app.use(createLoggingMiddleware());
    app.use(createAuthTokenExtractorMiddleware());
  } catch (err) {
    logger.error('Could not apply middleware:', err);
    throw err;
  }
};
