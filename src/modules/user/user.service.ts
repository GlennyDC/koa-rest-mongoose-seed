import {
  createAuthToken,
  createLogger,
  NotFoundError,
  ErrorCode,
  getEnvironmentVariable,
  hashString,
  compareStringToHash,
  GeneralError,
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

  // TODO: Hash password

  const updatedUser = await UserModel.findByIdAndUpdate(id, user).exec();

  if (!updatedUser) {
    logger.info(`User [${id}] not found`);
    throw new NotFoundError(`User [${id}] not found`, ErrorCode.USER_NOT_FOUND);
  }

  return updatedUser;
};

export const registerUser = async (
  emailAddress: string,
  password: string,
): Promise<Auth> => {
  logger.info(`Register user [${emailAddress}]`);

  const passwordHash = await hashString(password);

  // TODO: find out if it's not better to check for a user
  // with this email address first
  let user;
  try {
    user = await new UserModel({ emailAddress, passwordHash }).save();
  } catch (err) {
    if (err.code === 11000) {
      logger.info(`Email address [${emailAddress}] already exists`);
      throw new GeneralError(
        `Email address [${emailAddress}] already exists`,
        ErrorCode.EMAILADDRESS_ALREADY_EXISTS,
        400,
      );
    }
    throw err;
  }

  const jwt = await createAuthToken({
    user: {
      id: user.id,
      roles: user.roles,
    },
  });

  return { user, accessToken: jwt };
};

export const loginUser = async (
  emailAddress: string,
  password: string,
): Promise<Auth> => {
  logger.info(`Login user [${emailAddress}]`);

  const user = await UserModel.findOne({ emailAddress }).exec();

  if (!user) {
    logger.verbose(`User [${emailAddress}] not found`);
    throw new GeneralError(
      `Wrong email or password`,
      ErrorCode.INVALID_LOGIN_CREDENTIALS,
      403,
    );
  }

  if (
    user.badLoginAttempts >= LOGIN_MAX_ATTEMPTS_COUNT &&
    Date.now() - user.lastBadLoginAttempt.getTime() <= LOGIN_ATTEMPTS_LOCK_TIME
  ) {
    logger.info(`User [${emailAddress}] is temporarily locked`);
    throw new GeneralError(
      'Too many login attempts, the user account is temporarily locked',
      ErrorCode.MAX_LOGIN_ATTEMPTS,
      403,
    );
  }

  const passwordIsCorrect = await compareStringToHash(
    password,
    user.passwordHash,
  );

  if (!passwordIsCorrect) {
    logger.info(`User [${emailAddress}] provided a wrong password`);
    await user
      .updateOne({
        // TODO check if this is correct
        $inc: { badLoginAttempts: 1 },
        lastBadLoginAttempt: Date.now(),
      })
      .exec();
    throw new GeneralError(
      `Wrong email or password`,
      ErrorCode.INVALID_LOGIN_CREDENTIALS,
      403,
    );
  }

  // TODO: Reset bad login state

  const jwt = await createAuthToken({
    user: {
      id: user.id,
      roles: user.roles,
    },
  });

  return { user, accessToken: jwt };
};
