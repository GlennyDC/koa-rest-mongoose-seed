import type Koa from 'koa';

import { extractAuthToken } from '../auth';

/**
 * Extract the provided JWT (if any) from the authorization header.
 *
 * Preconditions:
 *   - The JWT is stored in the authorization header.
 *   - The authorization scheme is Bearer.
 *
 * @param {Koa.Context} ctx - Koa context
 *
 * @returns {string|undefined} The JWT or undefined if no JWT was provided
 */
const extractAuthTokenFromAuthorizationHeader = (
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
 * If there is a JWT, set it to ctx.state.token and try to parse the token.
 * If the token is valid and not expired set the user token payload to
 * ctx.state.user. If during the parsing proces an error occured, set
 * ctx.state.authTokenErr.
 *
 * @returns {Koa.Middleware} The Koa middleware responsible for extracting the JWT from the request
 */
export const createAuthTokenExtractorMiddleware = (): Koa.Middleware => {
  return async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
    const authToken = extractAuthTokenFromAuthorizationHeader(ctx);
    if (authToken) {
      ctx.state.authToken = authToken;
      try {
        const authTokenPayload = await extractAuthToken(authToken);
        ctx.state.user = authTokenPayload.user;
      } catch (err) {
        ctx.state.authTokenErr = err;
      }
    }
    await next();
  };
};
