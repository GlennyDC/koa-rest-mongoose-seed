import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import type Koa from 'koa';

import { AuthenticationError, ErrorCode } from '../error';
import { rolePermissions } from './rolePermissions';

/**
 * Assert if the viewer is successfully authenticated
 *
 * If the Koa context does not have a user set, try to set the user.
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
        ErrorCode.TOKEN_EXPIRED,
      );
    }

    if (authTokenErr instanceof JsonWebTokenError) {
      throw new AuthenticationError(
        'Authentication token invalid',
        ErrorCode.INVALID_TOKEN,
      );
    }

    console.log('#####MAKE SURE THIS NEVER OCCURS#######'); // TODO
  }
};

/**
 * Assert if the viewer is authorized
 *
 * Preconditions:
 *   - The user is successfully authenticated.
 *   - The assertAuthenticated function has been invoked.
 *
 * @param {Koa.Context} ctx - Koa context
 * @param {string[]} requiredPermissions - The required permissions
 */
export const assertAuthorized = async (
  ctx: Koa.Context,
  requiredPermissions: string[],
): Promise<void> => {
  // if (!ctx.state.user) throw new AuthenticationError('Not authenticated');
  // if (ctx.state.user) {
  //   const userRoles: string[] = ctx.state.user.userRoles;
  //   const userPermissions = [
  //     ...new Set(userRoles.map((role) => rolePermissions[role]).flat()),
  //   ];
  //   const hasAllRequiredPermissions = requiredPermissions.every((permission) =>
  //     userPermissions.includes(permission),
  //   );
  //   if (!hasAllRequiredPermissions) {
  //     throw new AuthenticationError('Not authenticated');
  //   }
  // }
};
