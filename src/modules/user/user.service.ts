import {
  createAuthToken,
  createLogger,
  NotFoundError,
  ErrorCode,
  BusinessError,
  getEnvironmentVariable,
  hashString,
  compareStringToHash,
} from '../../global';
import { Auth, User, UpdateUserInput } from './user';
import { UserModel } from './user.model';

const LOGIN_MAX_ATTEMPTS_COUNT = getEnvironmentVariable<number>(
  'LOGIN_MAX_ATTEMPTS_COUNT',
);
const LOGIN_ATTEMPTS_LOCK_TIME = getEnvironmentVariable<number>(
  'LOGIN_ATTEMPTS_LOCK_TIME',
);

const logger = createLogger('user-service');

export const getUserById = async (id: string): Promise<User> => {
  logger.info(`Get user [${id}]`);

  const user = await UserModel.findById(id).exec();

  if (!user) {
    logger.info(`User [${id}] not found`);
    throw new NotFoundError(`User [${id}] not found`, ErrorCode.USER_NOT_FOUND);
  }

  return user;
};

export const updateUserById = async (
  id: string,
  user: UpdateUserInput,
): Promise<User> => {
  logger.info(`Update user [${id}]`);

  const updatedUser = await UserModel.findByIdAndUpdate(id, user).exec();

  if (!updatedUser) {
    logger.info(`User [${id}] not found`);
    throw new NotFoundError(`User [${id}] not found`, ErrorCode.USER_NOT_FOUND);
  }

  return updatedUser;
};

export const register = async (
  emailAddress: string,
  password: string,
): Promise<Auth> => {
  logger.info(`Register user with email address [${emailAddress}]`);

  const passwordHash = await hashString(password);

  const user = await new UserModel({ emailAddress, passwordHash }).save();

  const jwt = await createAuthToken({
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
): Promise<Auth> => {
  logger.info(`Login user with email address [${emailAddress}]`);

  const user = await UserModel.findOne({ emailAddress }).exec();

  if (!user) {
    logger.info(`User [${emailAddress}] not found`);
    throw new NotFoundError(
      `User [${emailAddress}] not found`,
      ErrorCode.USER_NOT_FOUND,
    );
  }

  if (
    user.badLoginAttempts >= LOGIN_MAX_ATTEMPTS_COUNT &&
    Date.now() - user.lastBadLoginAttempt.getTime() <= LOGIN_ATTEMPTS_LOCK_TIME
  ) {
    logger.info(`User [${emailAddress}] is temporarily locked`);
    throw new BusinessError(
      'Too many login attempts. The user account is temporarily locked.',
      ErrorCode.MAX_LOGIN_ATTEMPTS,
    );
  }

  const passwordIsCorrect = await compareStringToHash(
    password,
    user.passwordHash,
  );

  if (!passwordIsCorrect) {
    logger.info(`User with [${emailAddress}] did not match passwords`);
    await user
      .updateOne({
        $inc: { badLoginAttempts: 1 },
        lastBadLoginAttempt: Date.now(),
      })
      .exec();
    throw new NotFoundError(
      `User [${emailAddress}] not found`,
      ErrorCode.USER_NOT_FOUND,
    );
  }

  const jwt = await createAuthToken({
    user: {
      id: user.id,
      roles: user.roles,
    },
  });

  return { user, accessToken: jwt };
};
