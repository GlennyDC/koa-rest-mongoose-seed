import {
  makeToken,
  createLogger,
  NotFoundError,
  ErrorCode,
} from '../../global';
import { User, Auth } from './user';
import { UserModel } from './user.model';

const logger = createLogger('user-service');

const getUserByEmailAddress = async (emailAddress: string): Promise<User> => {
  logger.verbose(`Get user by email address [${emailAddress}]`);

  const user = null;

  if (!user) {
    logger.warn(`User [${emailAddress}] not found`);
    throw new NotFoundError(
      `User [${emailAddress}] not found`,
      ErrorCode.USER_NOT_FOUND,
    );
  }

  return user;
};

export const register = async (
  emailAddress: string,
  password: string,
): Promise<Auth> => {
  logger.info(`Register user with email address [${emailAddress}]`);

  const user = new UserModel({ emailAddress, password });

  const savedUser = await user.save();

  const jwt = await makeToken({
    user: {
      id: user.id,
      roles: user.roles,
    },
  });

  // eslint-disable-next-line
  // @ts-ignore
  return { user: savedUser, accessToken: jwt };
};

export const login = async (
  emailAddress: string,
  password: string,
): Promise<Auth> => {
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
