import Joi from 'joi';

import {
  Resolvers,
  createLogger,
  validateArgs,
  assertAuthenticated,
} from '../../global';
import { assertOwnerOfOrganisation } from '../organisation.auth';
import { Organisation } from './organisation';
import {
  getOrganisationById,
  getOrganisationsOfUser,
  createOrganisationForUser,
} from './organisation.service';

const logger = createLogger('organisation-resolvers');

const organisationResolvers: Resolvers = {
  Query: {
    organisation: async (
      _,
      args,
      { koaCtx, userId },
    ): Promise<Organisation> => {
      logger.silly(`Get organisation [${args.id}]`);

      assertAuthenticated(koaCtx);

      const { id } = await validateArgs(
        args,
        Joi.object({
          id: Joi.string(),
        }),
      );

      await assertOwnerOfOrganisation(id, userId);

      return getOrganisationById(id);
    },
    organisations: async (
      _,
      args,
      { koaCtx, userId },
    ): Promise<Organisation[]> => {
      logger.silly(
        `Get organisations with offset [${args.offset}] and limit [${args.limit}]`,
      );

      assertAuthenticated(koaCtx);

      const { offset, limit } = await validateArgs(
        args,
        Joi.object({
          offset: Joi.number().integer().min(0),
          limit: Joi.number().integer().positive().max(100),
        }),
      );

      return getOrganisationsOfUser(userId, offset, limit);
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

      const { organisation } = await validateArgs(
        args,
        Joi.object({
          organisation: Joi.object({
            name: Joi.string(),
          }),
        }),
      );

      return createOrganisationForUser(userId, organisation);
    },
  },
  Location: {
    organisation: async (
      location,
      _,
      { organisationLoader },
    ): Promise<Organisation> => {
      logger.silly(`Get organisation [${location.organisationId}]`);

      return organisationLoader.load(location.organisationId.toString());
    },
  },
};

export default organisationResolvers;
