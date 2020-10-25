import Joi from 'joi';

import {
  Resolvers,
  createLogger,
  validateArgs,
  assertAuthenticated,
  assertAuthorized,
} from '../../global';
import { Organisation } from './organisation';
import * as organisationService from './organisation.service';

const logger = createLogger('organisation-resolvers');

const organisationResolvers: Resolvers = {
  Query: {
    organisation: async (_, { id }, { koaCtx }): Promise<Organisation> => {
      logger.silly(`Get organisation [${id}]`);

      assertAuthenticated(koaCtx);

      return organisationService.getOrganisationById(id);
    },
    organisations: async (_, args): Promise<Organisation[]> => {
      logger.silly(
        `Get organisations with offset [${args.offset}] and limit [${args.limit}]`,
      );

      const schema = Joi.object({
        offset: Joi.number().integer().min(0),
        limit: Joi.number().integer().positive().max(100),
      });

      await validateArgs(args, schema);

      const { offset, limit } = args;

      return organisationService.getOrganisations(offset, limit);
    },
  },
  Mutation: {
    createOrganisation: async (_, args): Promise<Organisation> => {
      logger.silly(`Create organisation [${args.organisation.name}]`);

      const schema = Joi.object({
        organisation: Joi.object({
          name: Joi.string(),
        }),
      });

      await validateArgs(args, schema);

      const { organisation } = args;

      return organisationService.createOrganisation(organisation);
    },
  },
};

export default organisationResolvers;
