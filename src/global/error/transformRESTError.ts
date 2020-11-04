import { getEnvironmentVariable } from '../getEnvironmentVariable';
import { BaseError } from './errors/baseError';

const EXPOSE_UNKNOWN_ERRORS = getEnvironmentVariable<boolean>(
  'EXPOSE_UNKNOWN_ERRORS',
);

const createKnownRESTError = (error: BaseError): any => {
  const { status } = error;
  return {
    status,
    body: JSON.stringify(error),
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
