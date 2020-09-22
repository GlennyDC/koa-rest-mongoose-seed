import Joi from '@hapi/joi';

import { Resolvers, createLogger, validateArgs } from '../../global';
import { Auth } from './user';
import * as userService from './user.service';

const logger = createLogger('user-resolvers');

const UserResolvers: Resolvers = {
  Mutation: {
    register: async (_, args): Promise<Auth> => {
      logger.verbose(`Register user with email address [${args.emailAddress}]`);

      const schema = Joi.object({
        emailAddress: Joi.string().email(),
        password: Joi.string().min(6),
      });

      await validateArgs(args, schema);

      const { emailAddress, password } = args;

      return userService.register(emailAddress, password);
    },
    login: async (_, args): Promise<Auth> => {
      logger.verbose(`Login user with email address [${args.emailAddress}]`);

      const schema = Joi.object({
        emailAddress: Joi.string().email(),
        password: Joi.string().min(6),
      });

      await validateArgs(args, schema);

      const { emailAddress, password } = args;

      return userService.login(emailAddress, password);
    },
  },
};

export default UserResolvers;
