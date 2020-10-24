import {
  JsonWebTokenError,
  TokenExpiredError as TokenExpiredErrorLib,
} from 'jsonwebtoken';
import type Koa from 'koa';

import {
  AuthenticationError,
  InvalidTokenError,
  TokenExpiredError,
} from '../error';
import { rolePermissions } from './rolePermissions';

/**
 * Assert if the viewer is successfully authenticated
 *
 * If the Koa context does not have a user set, try to set the user.
 *
 * @param {Koa.Context} ctx - Koa context
 */
export const assertAuthenticated = (ctx: Koa.Context): void => {
  if (!ctx.state.token) throw new AuthenticationError();
  if (!ctx.state.user) {
    // TODO: logging

    const tokenErr = ctx.state.tokenErr;

    if (tokenErr instanceof TokenExpiredErrorLib) {
      throw new TokenExpiredError();
    }

    if (tokenErr instanceof JsonWebTokenError) {
      throw new InvalidTokenError();
    }

    console.log('This can never occur'); // TODO
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
