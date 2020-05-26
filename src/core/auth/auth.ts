import Koa = require('koa');
import rolePermissions from './rolePermissions';
import { makeToken, extractToken } from './token';

/**
 * Assert if the viewer is successfully authenticated
 *
 * If the Koa context does not have a user set, try to set the user.
 *
 * @param {Koa.Context} ctx - Koa context
 */
const assertAuthenticated = async (ctx: Koa.Context): Promise<void> => {
  // if (!ctx.state.token) throw new AuthenticationError('Not authenticated');
  // if (!ctx.state.user) {
  //   const user = await extractToken(ctx.state.token);
  //   ctx.state.user = user;
  // }
};

/**
 * Assert if the viewer is authorized
 *
 * Preconditions:
 *   - The user is successfully authenticated.
 *   - The assertAuthenticated function has been invoked.
 *
 * @param {Koa.Context} ctx - Koa context
 */
const assertAuthorized = async (
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

export { assertAuthenticated, assertAuthorized };
