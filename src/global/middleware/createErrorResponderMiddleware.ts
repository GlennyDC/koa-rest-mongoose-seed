import type Koa from 'koa';

import { ErrorCode, NotFoundError, BaseError } from '../error';
import { sanitizeError } from '../error/sanitizeError';

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
      console.log('after next');
      // Handle 404 resource errors just like any other error
      if (ctx.response.status === 404 && !ctx.response.body) {
        throw new NotFoundError(
          'Resource not found',
          ErrorCode.RESOURCE_NOT_FOUND,
        );
      }
    } catch (err) {
      console.log(err);
      if (err instanceof BaseError) {
        ctx.status = err.status;
        ctx.body = sanitizeError(err);
      } else {
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
      }
    }
  };
};
