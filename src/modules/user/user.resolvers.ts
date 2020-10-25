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

const handler = (schema: any, f: any, options?: any): any => {
  const resolverFunction = async (
    root: any,
    args: any,
    ctx: any,
    info: any,
  ): Promise<any> => {
    if (options.requireAuthentication) {
      assertAuthenticated(ctx.koaCtx);
    }

    await validateArgs(args, schema || Joi.object({}));

    return f(root, args, ctx, info);
  };

  return resolverFunction;
};

const UserResolvers: Resolvers = {
  Query: {
    // eslint-disable-next-line
    // @ts-ignore
    viewer: handler(
      null,
      async (root: any, args: any, ctx: any) => {
        logger.silly(`Get viewer [${ctx.userId}]`);

        return getUserById(ctx.userId);
      },
      { requireAuthentication: true },
    ),
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
