import Koa from 'koa';
import helmet from 'koa-helmet';

import { makeErrorResponderMiddleware } from './makeErrorResponderMiddleware';
import { makeLoggingMiddleware } from './makeLoggingMiddleware';
import { makeTokenExtractorMiddleware } from './makeTokenExtractorMiddleware';

const applyMiddleware = (app: Koa): void => {
  app.use(helmet());
  app.use(makeErrorResponderMiddleware());
  app.use(makeLoggingMiddleware());
  app.use(makeTokenExtractorMiddleware());
};

export { applyMiddleware };
