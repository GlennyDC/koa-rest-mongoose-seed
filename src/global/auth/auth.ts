import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import type Koa from 'koa';

import { AuthenticationError, AuthorizationError, ErrorCode } from '../error';
import { rolePermissions } from './rolePermissions';

/**
 * Assert if the viewer is successfully authenticated
 *
 * @param {Koa.Context} ctx - Koa context
 */
export const assertAuthenticated = (ctx: Koa.Context): void => {
  if (!ctx.state.authToken)
    throw new AuthenticationError(
      'Must authenticate to access this resource',
      ErrorCode.AUTHENTICATION_ERROR,
    );

  if (!ctx.state.user) {
    // TODO: logging

    const authTokenErr = ctx.state.authTokenErr;

    if (authTokenErr instanceof TokenExpiredError) {
      throw new AuthenticationError(
        'Authentication token expired',
        ErrorCode.AUTH_TOKEN_EXPIRED,
      );
    }

    if (authTokenErr instanceof JsonWebTokenError) {
      throw new AuthenticationError(
        'Authentication token invalid',
        ErrorCode.AUTH_TOKEN_INVALID,
      );
    }

    console.log('#####MAKE SURE THIS NEVER OCCURS#######'); // TODO
  }
};

/**
 * Assert if the viewer is authorized
 *
 * @param {Koa.Context} ctx - Koa context
 * @param {string[]} requiredPermissions - The required permissions
 */
export const assertAuthorized = (
  ctx: Koa.Context,
  requiredPermissions: string[],
): void => {
  // User must be successfully authenticated
  assertAuthenticated(ctx);

  const userRoles: string[] = ctx.state.user.roles;

  const userPermissions = [
    ...new Set(userRoles.map((role) => rolePermissions[role]).flat()),
  ];

  const hasAllRequiredPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission),
  );

  if (!hasAllRequiredPermissions) {
    throw new AuthorizationError();
  }
};
