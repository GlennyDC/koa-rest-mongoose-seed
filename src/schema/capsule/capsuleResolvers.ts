import joi from '@hapi/joi';

import { Capsule } from '../../contracts';
import { capsuleFacade } from '../../facades';

const capsuleResolvers = {
  Query: {
    capsules: async (_: any, args: any): Promise<Capsule[]> => {
      const schema = joi.object({
        limit: joi.number().optional(),
        offset: joi.number().max(3).optional(),
        order: joi.number().optional(),
      });

      const result = schema.validate(args);
      console.log(result);

      return capsuleFacade.capsules(args);
    },
    capsule: async (_: any, args: any): Promise<Capsule> => {
      const { id } = args;
      return capsuleFacade.capsule(id);
    },
  },
};

export default capsuleResolvers;
