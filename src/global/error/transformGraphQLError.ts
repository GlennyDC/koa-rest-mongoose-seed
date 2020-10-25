import type { GraphQLError, GraphQLFormattedError } from 'graphql';

import { getEnvironmentVariable } from '../getEnvironmentVariable';
import { ErrorCode } from './errorCode';
import { BaseError } from './errors/baseError';

const EXPOSE_UNKNOWN_ERRORS = getEnvironmentVariable<boolean>(
  'EXPOSE_UNKNOWN_ERRORS',
);

type Extensions = Record<string, any> & { code: string };
type KnownGraphQLError = GraphQLError & { originalError: BaseError };

const makeExtensions = (
  code: ErrorCode,
  extensions: Record<string, any> = {},
): Extensions => {
  return {
    ...extensions.exception,
    code,
  };
};

const makeKnownGraphQLFormattedError = (
  error: KnownGraphQLError,
): GraphQLFormattedError<Extensions> => {
  const { message, locations, path, originalError, extensions } = error;
  return {
    message,
    locations,
    path,
    extensions: makeExtensions(originalError.code, extensions),
  };
};

const makeUnKnownGraphQLFormattedError = (
  error: GraphQLError,
): GraphQLFormattedError<Extensions> => {
  const { message, path, locations, extensions } = error;
  return {
    message: EXPOSE_UNKNOWN_ERRORS ? message : 'Internal server error',
    locations,
    path,
    extensions: makeExtensions(
      ErrorCode.INTERNAL_SERVER_ERROR,
      EXPOSE_UNKNOWN_ERRORS ? extensions : {},
    ),
  };
};

/**
 * Transform an error to a client friendly GraphQL error according
 * the GraphQL error response spec.
 *
 * Note: unknown errors are optionally masked to a 500 INTERNAL_SERVER_ERROR.
 *
 * @param {GraphQLError} error - Error found during the parse, validate, or execute phase of performing a GraphQL operation
 *
 * @returns {GraphQLFormattedError<Extensions>} The error to be send to the client
 *
 * @see {@link https://github.com/graphql/graphql-spec/blob/master/spec/Section%207%20--%20Response.md#errors|GraphQL error response spec}
 */
export const transformGraphQLError = (
  error: GraphQLError,
): GraphQLFormattedError<Extensions> => {
  const { originalError } = error;
  if (originalError instanceof BaseError) {
    return makeKnownGraphQLFormattedError(error as KnownGraphQLError);
  } else {
    return makeUnKnownGraphQLFormattedError(error);
  }
};
