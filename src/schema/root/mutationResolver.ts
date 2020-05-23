import { authService } from '../../services';

const mutationResolvers = {
  Mutation: {
    login: async (root: any, args: any, ctx: any) => {
      const { email, password } = args;
      return authService.login(email, password);
    },
  },
};

export default mutationResolvers;
