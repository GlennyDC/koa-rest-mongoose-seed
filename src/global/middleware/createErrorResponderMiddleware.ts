import type Koa from 'koa';

import { ErrorCode, NotFoundError } from '../error';

/**
 * Create a Koa error responder middleware in case an error occurs.
 *
 * Note: We treat 404 errors like any other error.
 *
 * @returns {Koa.Middleware} The Koa middleware responsible for error responding
 */
export const createErrorResponderMiddleware = (): Koa.Middleware => {
  return async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
    try {
      await next();
      // Handle 404 resource errors just like any other error
      if (ctx.response.status === 404 && !ctx.response.body) {
        throw new NotFoundError(
          'Resource not found',
          ErrorCode.RESOURCE_NOT_FOUND,
        );
      }
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.status === 404 ? 'Not found' : 'Internal Server Error';
      ctx.type = 'text/plain';
    }
  };
};
