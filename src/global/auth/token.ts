import { sign, verify } from 'jsonwebtoken';

import { getEnvironmentVariable } from '../getEnvironmentVariable';
import type { TokenPayload } from '../types';

const AUTH_TOKEN_ISSUER = getEnvironmentVariable<string>('AUTH_TOKEN_ISSUER');
const AUTH_TOKEN_AUDIENCE = getEnvironmentVariable<string>(
  'AUTH_TOKEN_AUDIENCE',
);
const AUTH_TOKEN_SUBJECT = getEnvironmentVariable<string>('AUTH_TOKEN_SUBJECT');
const AUTH_TOKEN_SECRET = getEnvironmentVariable<string>('AUTH_TOKEN_SECRET');
const AUTH_TOKEN_EXPIRATION_INTERVAL = getEnvironmentVariable<number>(
  'AUTH_TOKEN_EXPIRATION_INTERVAL',
);

/**
 * Verify a JWT.
 *
 * @param {string} token - The JWT to be verified
 *
 * @returns {Promise<object>} A promise to the decoded JWT
 */
const verifyToken = (token: string): Promise<TokenPayload> => {
  const secret = AUTH_TOKEN_SECRET;
  const options = {
    issuer: AUTH_TOKEN_ISSUER,
    audience: AUTH_TOKEN_AUDIENCE,
    subject: AUTH_TOKEN_SUBJECT,
  };
  return new Promise((resolve, reject) => {
    verify(token, secret, options, (err, decodedToken) => {
      if (err) {
        return reject(err);
      }
      return resolve((decodedToken as unknown) as TokenPayload);
    });
  });
};

/**
 * Sign a JWT.
 *
 * @param {TokenPayload} payload - The payload to be included in the JWT
 *
 * @returns {Promise<string>} A promise to the JWT
 */
const signToken = (payload: TokenPayload): Promise<string> => {
  const secret = AUTH_TOKEN_SECRET;
  const options = {
    issuer: AUTH_TOKEN_ISSUER,
    audience: AUTH_TOKEN_AUDIENCE,
    expiresIn: AUTH_TOKEN_EXPIRATION_INTERVAL,
    subject: AUTH_TOKEN_SUBJECT,
  };
  return new Promise((resolve, reject) => {
    sign(payload, secret, options, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  });
};

/**
 * Create a JWT.
 *
 * @param {TokenPayload} payload - The payload to be included in the JWT
 *
 * @returns {Promise<string>} A promise to the JWT
 */
export const createAuthToken = async (
  payload: TokenPayload,
): Promise<string> => {
  return signToken(payload);
};

/**
 * Extract a JWT.
 *
 * If the JWT is successfully verified, return the decoded payload.
 *
 * @param {string} authToken - The JWT to be verified and decoded
 * @returns {TokenPayload} The decoded payload of the JWT
 */
export const extractAuthToken = async (
  authToken: string,
): Promise<TokenPayload> => {
  return verifyToken(authToken);
};
