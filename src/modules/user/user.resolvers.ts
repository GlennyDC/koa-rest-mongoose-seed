import { Resolvers, createLogger, handler } from '../../global';
import { login, register, updateUserById, getUserById } from './user.service';

const logger = createLogger('user-resolvers');

const UserResolvers: Resolvers = {
  Query: {
    viewer: handler(null, async (root, args, ctx) => {
      logger.silly(`Get viewer [${ctx.userId}]`);

      return getUserById(ctx.userId);
    }),
  },
  Mutation: {
    register: handler(
      (Joi) =>
        Joi.object({
          emailAddress: Joi.string().email(),
          password: Joi.string(),
        }),
      async (root, { emailAddress, password }) => {
        logger.silly(`Register user with email address [${emailAddress}]`);

        return register(emailAddress, password);
      },
      { requireAuthentication: false },
    ),
    login: handler(
      (Joi) =>
        Joi.object({
          emailAddress: Joi.string().email(),
          password: Joi.string(),
        }),
      async (root, { emailAddress, password }) => {
        logger.silly(`Login user with email address [${emailAddress}]`);

        return login(emailAddress, password);
      },
      { requireAuthentication: false },
    ),
    updateViewer: handler(
      (Joi) =>
        Joi.object({
          user: Joi.object({
            emailAddress: Joi.string().email().optional(),
            password: Joi.string().optional(),
          }).or('emailAddress', 'password'),
        }),
      async (root, { user }, { userId }) => {
        logger.silly(`Update user [${userId}]`);

        return updateUserById(userId, user);
      },
    ),
  },
};

export default UserResolvers;
