import * as authService from './auth.service';

const AuthResolvers = {
  Mutation: {
    login: async (root: any, args: any, ctx: any) => {
      const { email, password } = args;
      return authService.login(email, password);
    },
  },
};

export default AuthResolvers;
