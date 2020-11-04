import type Koa from 'koa';

import { ErrorCode, NotFoundError, transformRESTError } from '../error';

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
      const { status, body } = transformRESTError(err);
      ctx.status = status;
      ctx.body = body;
      ctx.type = 'application/json';
    }
  };
};
