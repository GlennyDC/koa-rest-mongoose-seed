import { Resolvers, createLogger } from '../../global';
import * as userService from './user.service';

const logger = createLogger('author-resolver');

const UserResolvers: Resolvers = {
  Mutation: {
    register: async (root, args, ctx) => {
      const { emailAddress, password } = args;
      return userService.register(emailAddress, password);
    },
    login: async (root, args, ctx) => {
      const { emailAddress, password } = args;
      return userService.login(emailAddress, password);
    },
  },
};

export default UserResolvers;
