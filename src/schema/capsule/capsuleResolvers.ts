import { capsuleFacade } from '../../facades';
import { Capsule } from '../../contracts';

const capsuleResolvers = {
  Query: {
    capsules: async (_: any, args: any): Promise<Capsule[]> => {
      return capsuleFacade.capsules(args);
    },
    capsule: async (_: any, args: any): Promise<Capsule> => {
      const { id } = args;
      return capsuleFacade.capsule(id);
    },
  },
};

export default capsuleResolvers;
