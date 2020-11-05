import { getEnvironmentVariable } from '../getEnvironmentVariable';
import { BaseError } from './errors/baseError';
import { sanitizeError } from './sanitizeError';

const EXPOSE_UNKNOWN_ERRORS = getEnvironmentVariable<boolean>(
  'EXPOSE_UNKNOWN_ERRORS',
);
const EXPOSE_ERROR_STACK_TRACES = getEnvironmentVariable<boolean>(
  'EXPOSE_ERROR_STACK_TRACES',
);

const createKnownRESTError = (error: BaseError): any => {
  const { status } = error;
  return {
    status,
    body: sanitizeError(error),
  };
};

const createUnKnownRESTError = (error: Error): any => {
  const { message } = error;
  return {
    message: EXPOSE_UNKNOWN_ERRORS ? message : 'Internal server error',
  };
};

export const transformRESTError = (error: Error): any => {
  if (error instanceof BaseError) {
    return createKnownRESTError(error as BaseError);
  } else {
    return createUnKnownRESTError(error);
  }
};
