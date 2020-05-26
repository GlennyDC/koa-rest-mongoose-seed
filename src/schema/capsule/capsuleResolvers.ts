import { Capsule } from '../../contracts';
import { capsuleFacade } from '../../facades';

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
