import type Koa from 'koa';

import { extractToken } from '../auth';

/**
 *
 * @returns {Koa.Middleware} The Koa middleware responsible for TODO
 */
export const createTokenValidatorMiddleware = (): Koa.Middleware => {
  return async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
    const token = ctx.state.token;
    if (token) {
      try {
        const tokenPayload = await extractToken(token);
        ctx.state.user = tokenPayload.user;
      } catch (err) {
        ctx.state.tokenErr = err;
      }
    }
    await next();
  };
};
