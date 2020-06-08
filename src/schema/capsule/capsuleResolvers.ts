import Joi from '@hapi/joi';

import { Capsule } from '../../contracts';
import { validateArgs } from '../../core';
import { capsuleFacade } from '../../facades';

const capsuleResolvers = {
  Query: {
    capsules: async (_: any, args: any): Promise<Capsule[]> => {
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
