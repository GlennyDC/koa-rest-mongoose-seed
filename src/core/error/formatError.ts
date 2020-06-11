import config from 'config';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

import { BaseError } from './baseError';
import { ErrorCode } from './errorCode';

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

const formatError = (
  error: GraphQLError,
): GraphQLFormattedError<Extensions> => {
  const { originalError } = error;

  if (originalError instanceof BaseError) {
    return makeKnownGraphQLFormattedError(error as KnownGraphQLError);
  } else {
    return makeUnKnownGraphQLFormattedError(error);
  }
};

export { formatError };
