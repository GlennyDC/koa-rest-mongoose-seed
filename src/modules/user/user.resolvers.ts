import Joi from 'joi';

import {
  Resolvers,
  createLogger,
  validateArgs,
  assertAuthenticated,
} from '../../global';
import { Auth, User } from './user';
import { login, register, updateUserById, getUserById } from './user.service';

const logger = createLogger('user-resolvers');

const UserResolvers: Resolvers = {
  Query: {
    viewer: async (root, args, { koaCtx, userId }): Promise<User> => {
      logger.silly(`Get viewer [${userId}]`);

      assertAuthenticated(koaCtx);

      return getUserById(userId);
    },
  },
  Mutation: {
    register: async (_, args): Promise<Auth> => {
      logger.silly(`Register user with email address [${args.emailAddress}]`);

      const { emailAddress, password } = await validateArgs(
        args,
        Joi.object({
          emailAddress: Joi.string().email(),
          password: Joi.string().min(6),
        }),
      );

      return register(emailAddress, password);
    },
    login: async (_, args): Promise<Auth> => {
      logger.silly(`Login user with email address [${args.emailAddress}]`);

      const { emailAddress, password } = await validateArgs(
        args,
        Joi.object({
          emailAddress: Joi.string().email(),
          password: Joi.string().min(6),
        }),
      );

      return login(emailAddress, password);
    },
    updateViewer: async (_, args, { koaCtx, userId }): Promise<User> => {
      logger.silly(`Update user [${userId}]`);

      assertAuthenticated(koaCtx);

      const { user } = await validateArgs(
        args,
        Joi.object({
          user: Joi.object({
            emailAddress: Joi.string().email().optional(),
            password: Joi.string().optional(),
          }).or('emailAddress', 'password'),
        }),
      );

      return updateUserById(userId, user);
    },
  },
};

export default UserResolvers;
