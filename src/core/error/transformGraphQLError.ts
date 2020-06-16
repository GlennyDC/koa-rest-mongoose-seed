import config from 'config';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

import { ErrorCode } from './errorCode';
import { BaseError } from './errors/baseError';

const EXPOSE_UNKNOWN_ERRORS = config.get<boolean>(
  'server.graphql.exposeUnknownErrors',
);

interface Extensions extends Record<string, any> {
  code: string;
}

interface KnownGraphQLError extends GraphQLError {
  originalError: BaseError;
  extensions: any;
}

const makeExtensions = (
  code: ErrorCode,
  extensions: Record<string, any> = {},
): Extensions => ({
  code,
  ...extensions.exception,
});

const makeKnownGraphQLFormattedError = (
  error: KnownGraphQLError,
): GraphQLFormattedError<Extensions> => {
  const { message, originalError, path, locations, extensions } = error;

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

  if (EXPOSE_UNKNOWN_ERRORS) {
    return {
      message,
      locations,
      path,
      extensions: makeExtensions(ErrorCode.INTERNAL_SERVER_ERROR, extensions),
    };
  } else {
    return {
      message: 'Internal server error',
      locations,
      path,
      extensions: makeExtensions(ErrorCode.INTERNAL_SERVER_ERROR, {}),
    };
  }
};

/**
 * Transform an error to a client friendly GraphQL error according
 * the GraphQL error response spec.
 *
 * Note: unknown errors are optionally masked to a 500 INTERNAL_SERVER_ERROR.
 *
 * @param {GraphQLError} error - Error found during the parse, validate, or execute phases of performing a GraphQL operation
 *
 * @returns {GraphQLFormattedError<Extensions>} The error to be send to the client
 *
 * @see {@link https://github.com/graphql/graphql-spec/blob/master/spec/Section%207%20--%20Response.md#errors|GraphQL error response spec}
 */
const transformGraphQLError = (
  error: GraphQLError,
): GraphQLFormattedError<Extensions> => {
  const { originalError } = error;
  if (originalError instanceof BaseError) {
    return makeKnownGraphQLFormattedError(error as KnownGraphQLError);
  } else {
    return makeUnKnownGraphQLFormattedError(error);
  }
};

export { transformGraphQLError };
