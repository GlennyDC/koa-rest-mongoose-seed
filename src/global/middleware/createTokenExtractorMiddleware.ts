import type Koa from 'koa';

/**
 * Extract the provided JWT (if any) from the authorization header.
 *
 * Preconditions:
 *   - The JWT is stored in the authorization header.
 *   - The authorization scheme is Bearer.
 *
 * @private
 *
 * @param {Koa.Context} ctx - Koa context
 *
 * @returns {string|undefined} The JWT or undefined if no JWT was provided
 */
const extractTokenFromAuthorizationHeader = (
  ctx: Koa.Context,
): string | undefined => {
  if (!ctx.header || !ctx.header.authorization) {
    return;
  }

  const authorizationHeaderParts = ctx.header.authorization.split(' ');

  if (authorizationHeaderParts.length === 2) {
    const [scheme, token] = authorizationHeaderParts;

    if (/^Bearer$/i.test(scheme)) {
      return token;
    }
  }
};

/**
 * Create a Koa middleware to extract the JWT (if any) from the request.
 * If there is a JWT, set it to ctx.state.token.
 *
 * @returns {Koa.Middleware} The Koa middleware responsible for extracting the JWT from the request
 */
export const createTokenExtractorMiddleware = (): Koa.Middleware => {
  return async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
    const token = extractTokenFromAuthorizationHeader(ctx);
    if (token) {
      ctx.state.token = token;
    }
    await next();
  };
};
