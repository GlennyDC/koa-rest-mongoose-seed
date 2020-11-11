import { Resolvers, createLogger, handler } from '../../global';
import * as userService from './user.service';

const logger = createLogger('user-resolvers');

const UserResolvers: Resolvers = {
  Query: {
    viewer: handler(null, async (root, args, { userId }) => {
      logger.silly(`Get viewer [${userId}]`);

      return userService.getUserById(userId);
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

        return userService.registerUser(emailAddress, password);
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

        return userService.loginUser(emailAddress, password);
      },
      { requireAuthentication: false },
    ),
    updateViewer: handler(
      (Joi) =>
        Joi.object({
          user: Joi.object({
            emailAddress: Joi.string().email().optional(),
            password: Joi.string().optional(),
          }).min(1),
        }),
      async (root, { user }, { userId }) => {
        logger.silly(`Update viewer [${userId}]`);

        return userService.updateUserById(userId, user);
      },
    ),
  },
};

export default UserResolvers;
