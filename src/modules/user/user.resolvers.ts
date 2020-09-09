import * as userService from './user.service';

const UserResolvers = {
  Mutation: {
    login: async (root: any, args: any, ctx: any) => {
      const { email, password } = args;
      return userService.login(email, password);
    },
  },
};

export default UserResolvers;
