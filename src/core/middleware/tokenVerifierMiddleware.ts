import Koa from 'koa';

import { verifyToken } from '../auth/token';
import { ErrorCode } from '../error';

/**
 * Wrapper around the Koa middleware, conform the convention
 * of wrapping custom middlewares.
 *
 * TODO: return type
 *
 * @returns
 */
const makeTokenVerifierMiddleware = () => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    if (ctx.state.token) {
      try {
        const user = await verifyToken(ctx.state.token);
        ctx.state.user = user;
      } catch (err) {
        ctx.throw(401, 'Not authenticated', {
          code: ErrorCode.NOT_AUTHENTICATED,
        });
      }
    } else {
      ctx.throw(401, 'Not authenticated', {
        code: ErrorCode.NOT_AUTHENTICATED,
      });
    }
    await next();
  };
};

export { makeTokenVerifierMiddleware };
