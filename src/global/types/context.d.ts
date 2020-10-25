import type Koa from 'koa';

export type Context = {
  koaCtx: Koa.Context;
  // Although userId can be undefined if no auth token is
  // provided with the request we declare it as defined. This is because
  // the assertAuthenticated and assertAuthorized auth validation functions
  // will explicitly test userId for undefined. We could use the TypeScript
  // non-null assertion operator but this would clutter all the authenticated
  // resolvers.
  userId: string;
};
