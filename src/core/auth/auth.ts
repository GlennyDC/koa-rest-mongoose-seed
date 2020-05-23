import Koa = require('koa');
import { signToken, verifyToken } from './token';
import { TokenPayload } from '../types';
import { AuthenticationError } from 'apollo-server-koa';

import rolePermissions from './rolePermissions';

/**
 * Make a JWT.
 *
 * @param {TokenPayload} payload - The payload to be included in the JWT
 *
 * @returns {Promise<string>} A promise to the JWT
 */
const makeToken = async (payload: TokenPayload): Promise<string> => {
  return signToken(payload);
};

/**
 * Extract a JWT.
 *
 * If the JWT is successfully verified, return the decoded payload.
 *
 * @private
 *
 * @param {string} token - The JWT to be verified and decoded
 *
 * @returns {object} The decoded payload of the JWT
 */
const extractToken = async (token: string): Promise<object> => {
  try {
    const payload = await verifyToken(token);
    return payload;
  } catch (err) {
    throw new AuthenticationError('Not authenticated');
  }
};

/**
 * Assert if the viewer is successfully authenticated
 *
 * If the Koa context does not have a user set, try to set the user.
 *
 * @param {Koa.Context} ctx - Koa context
 */
const assertAuthenticated = async (ctx: Koa.Context): Promise<void> => {
  if (!ctx.state.token) throw new AuthenticationError('Not authenticated');
  if (!ctx.state.user) {
    const user = await extractToken(ctx.state.token);
    ctx.state.user = user;
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
 */
const assertAuthorized = async (
  ctx: Koa.Context,
  requiredPermissions: string[],
): Promise<void> => {
  if (!ctx.state.user) throw new AuthenticationError('Not authenticated');
  if (ctx.state.user) {
    const userRoles: string[] = ctx.state.user.userRoles;
    const userPermissions = [
      ...new Set(userRoles.map((role) => rolePermissions[role]).flat()),
    ];
    const hasAllRequiredPermissions = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
    if (!hasAllRequiredPermissions) {
      throw new AuthenticationError('Not authenticated');
    }
  }
};

export { makeToken, assertAuthenticated, assertAuthorized };
