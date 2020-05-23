import { capsuleFacade } from '../../facades';

const queryResolvers = {
  Query: {
    capsules: async (root: any, args: any) => {
      return capsuleFacade.capsules(args);
    },
    capsule: async (root: any, args: any, ctx: any) => {
      const { id } = args;
      return capsuleFacade.capsules(id);
    },
  },
};

export default queryResolvers;
