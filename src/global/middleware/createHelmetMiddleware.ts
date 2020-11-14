import type Koa from 'koa';
import helmet from 'koa-helmet';

import { getEnvironmentVariable } from '../getEnvironmentVariable';

const ENABLE_HELMET_CSP = getEnvironmentVariable<boolean>('ENABLE_HELMET_CSP');

export const createHelmetMiddleware = (): Koa.Middleware => {
  // TODO: don't just turn helmet CSP off, make sure that the playground works
  // with it enabled.
  return ENABLE_HELMET_CSP
    ? helmet()
    : helmet({
        contentSecurityPolicy: false,
      });
};
