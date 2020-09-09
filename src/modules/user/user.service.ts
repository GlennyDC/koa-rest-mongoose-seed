import {
  makeToken,
  createLogger,
  NotFoundError,
  ErrorCode,
} from '../../global';
import { User, UserAuth } from './user';
import { users } from './user.data';

const logger = createLogger('user-service');

const getUserByEmailAddress = async (emailAddress: string): Promise<User> => {
  logger.verbose(`Get user by email address [${emailAddress}]`);

  const user = users.find((user) => user.emailAddress === emailAddress);

  if (!user) {
    logger.warn(`User [${emailAddress}] not found`);
    throw new NotFoundError(
      `User [${emailAddress}] not found`,
      ErrorCode.USER_NOT_FOUND,
    );
  }

  return user;
};

const createUser = async (
  emailAddress: string,
  password: string,
): Promise<User> => {
  logger.verbose(`Create user with email address [${emailAddress}]`);

  const user: User = {
    id: 'uniqueId',
    emailAddress,
    password,
    roles: ['user', 'accountant'],
  };

  users.push(user);

  return user;
};

export const register = async (
  emailAddress: string,
  password: string,
): Promise<UserAuth> => {
  logger.verbose(`Register user with email address [${emailAddress}]`);
  const user = await createUser(emailAddress, password);

  const jwt = await makeToken({
    user: {
      id: user.id,
      roles: user.roles,
    },
  });

  return { user, accessToken: jwt };
};

export const login = async (
  emailAddress: string,
  password: string,
): Promise<UserAuth> => {
  const user = await getUserByEmailAddress(emailAddress);

  if (user.password !== password) {
    logger.warn(`User with [${emailAddress}] did not match passwords`);
    throw new NotFoundError(
      `User [${emailAddress}] not found`,
      ErrorCode.USER_NOT_FOUND,
    );
  }

  const jwt = await makeToken({
    user: {
      id: user.id,
      roles: user.roles,
    },
  });

  return { user, accessToken: jwt };
};
