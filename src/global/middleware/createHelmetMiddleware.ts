import type Koa from 'koa';
import helmet from 'koa-helmet';

export const createHelmetMiddleware = (): Koa.Middleware => {
  return helmet();
};
