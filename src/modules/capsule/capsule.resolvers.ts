import { Resolvers } from '../../global';
import { Capsule } from './capsule';
import * as capsuleService from './capsule.service';

const capsuleResolvers: Resolvers = {
  Query: {
    capsules: async (_, args): Promise<Capsule[]> => {
      return capsuleService.getCapsules(
        args.limit,
        args.offset,
        args.order,
        args.sort,
      );
    },
    capsule: async (_: any, args: any): Promise<Capsule> => {
      const { id } = args;
      return capsuleService.getCapsuleById(id);
    },
  },
};

export default capsuleResolvers;
