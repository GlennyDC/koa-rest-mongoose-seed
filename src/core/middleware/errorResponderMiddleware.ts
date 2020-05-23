import Koa from 'koa';

const makeErrorResponderMiddleware = () => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    try {
      await next();
    } catch (err) {
      // TODO: What about this
      console.log(ctx.status);
      console.log(ctx.body);
      ctx.status = err.status || 500;
      ctx.body = 'Internal Server Error';
    }
  };
};

export { makeErrorResponderMiddleware };
