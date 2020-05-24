import { capsuleFacade } from '../../facades';
import { APICapsule } from '../../contracts';

const capsuleResolvers = {
  Query: {
    capsules: async (parent, args, context): Promise<APICapsule[]> => {
      return capsuleFacade.capsules(args);
    },
    capsule: async (parent, args, context): Promise<APICapsule> => {
      const { id } = args;
      return capsuleFacade.capsule(id);
    },
  },
};

export default capsuleResolvers;
