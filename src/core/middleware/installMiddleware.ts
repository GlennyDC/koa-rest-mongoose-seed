import Koa from 'koa';

import { makeErrorResponderMiddleware } from './errorResponderMiddleware';
import { makeLoggingMiddleware } from './makeLoggingMiddleware';
import { makeTokenExtractorMiddleware } from './tokenExtractorMiddleware';

const installMiddleware = (app: Koa): void => {
  app.use(makeErrorResponderMiddleware());
  app.use(makeLoggingMiddleware());
  app.use(makeTokenExtractorMiddleware());
};

export { installMiddleware };
