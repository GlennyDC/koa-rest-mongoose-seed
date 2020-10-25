import Joi from 'joi';

import {
  Resolvers,
  createLogger,
  validateArgs,
  assertAuthenticated,
} from '../../global';
import { Organisation } from './organisation';
import * as organisationAuth from './organisation.auth';
import * as organisationService from './organisation.service';

const logger = createLogger('organisation-resolvers');

const organisationResolvers: Resolvers = {
  Query: {
    organisation: async (
      _,
      { id },
      { koaCtx, userId },
    ): Promise<Organisation> => {
      logger.silly(`Get organisation [${id}]`);

      assertAuthenticated(koaCtx);

      await organisationAuth.assertOwnerOfOrganization(id, userId);

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

      const { offset, limit } = await validateArgs(args, schema);

      return organisationService.getOrganisations(offset, limit);
    },
  },
  Mutation: {
    createOrganisation: async (
      _,
      args,
      { koaCtx, userId },
    ): Promise<Organisation> => {
      logger.silly(`Create organisation [${args.organisation.name}]`);

      assertAuthenticated(koaCtx);

      const schema = Joi.object({
        organisation: Joi.object({
          name: Joi.string(),
        }),
      });

      const { organisation } = await validateArgs(args, schema);

      return organisationService.createOrganisationForUser(
        userId,
        organisation,
      );
    },
  },
};

export default organisationResolvers;
