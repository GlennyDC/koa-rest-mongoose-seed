import type Koa from 'koa';

/**
 * Make a Koa error responder middleware in case an error occurs.
 * Emit the error to the app error event listener for centralized error logging.
 *
 * Note: We treat 404 errors like any other error.
 *
 * @returns {Koa.Middleware} The Koa middleware responsible for error responding
 */
const makeErrorResponderMiddleware = (): Koa.Middleware => {
  return async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
    try {
      await next();
      // Handle 404 errors just like any other error
      if (ctx.response.status === 404 && !ctx.response.body) {
        ctx.throw(404, '404 Not found'); // TODO: Throw our NOT FOUND ERROR?
      }
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.status === 404 ? 'Not found' : 'Internal Server Error';
      ctx.type = 'text/plain';

      // Emit the error to app error event listener
      ctx.app.emit('error', err);
    }
  };
};

export { makeErrorResponderMiddleware };
