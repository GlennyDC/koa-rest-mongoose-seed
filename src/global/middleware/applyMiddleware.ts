import type Koa from 'koa';
import type { Logger } from 'winston';

import { createAuthTokenExtractorMiddleware } from './createAuthTokenExtractorMiddleware';
import { createErrorResponderMiddleware } from './createErrorResponderMiddleware';
import { createHelmetMiddleware } from './createHelmetMiddleware';
import { createLoggingMiddleware } from './createLoggingMiddleware';

export const applyMiddleware = (app: Koa, logger: Logger): void => {
  logger.info('Apply middleware');

  try {
    app.use(createHelmetMiddleware());
    app.use(createErrorResponderMiddleware());
    app.use(createLoggingMiddleware());
    app.use(createAuthTokenExtractorMiddleware());
  } catch (err) {
    logger.error('Could not apply middleware:', err);
    throw err;
  }
};
