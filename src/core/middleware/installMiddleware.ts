import Koa from 'koa';

import { makeErrorResponderMiddleware } from './makeErrorResponderMiddleware';
import { makeLoggingMiddleware } from './makeLoggingMiddleware';
import { makeTokenExtractorMiddleware } from './makeTokenExtractorMiddleware';

const installMiddleware = (app: Koa): void => {
  app.use(makeErrorResponderMiddleware());
  app.use(makeLoggingMiddleware());
  app.use(makeTokenExtractorMiddleware());
};

export { installMiddleware };
