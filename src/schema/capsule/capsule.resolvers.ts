import Joi from '@hapi/joi';

import { validateArgs } from '../../core';
import { capsuleFacade } from '../../facades';
import type { Capsule, Resolvers } from '../../types';

const capsuleResolvers: Resolvers = {
  Query: {
    capsules: async (_, args): Promise<Capsule[]> => {
      const schema = Joi.object({
        limit: Joi.number().optional(),
        offset: Joi.number().max(3).optional(),
      });

      await validateArgs(args, schema);

      return capsuleFacade.capsules(args);
    },
    capsule: async (_: any, args: any): Promise<Capsule> => {
      const { id } = args;
      return capsuleFacade.capsule(id);
    },
  },
};

export default capsuleResolvers;
