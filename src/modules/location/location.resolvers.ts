import Joi from 'joi';

import {
  Resolvers,
  createLogger,
  validateArgs,
  assertAuthenticated,
} from '../../global';
import { assertOwnerOfLocation } from '../location.auth';
import { assertOwnerOfOrganisation } from '../organisation.auth';
import { Location } from './location';
import {
  createLocationForOrganisation,
  getLocationsOfOrganisation,
  getLocationById,
} from './location.service';

const logger = createLogger('location-resolvers');

const locationResolvers: Resolvers = {
  Organisation: {
    location: async (_, args, { userId }): Promise<Location> => {
      logger.silly(`Get location [${args.id}]`);

      const { id } = await validateArgs(
        args,
        Joi.object({
          id: Joi.string(),
        }),
      );

      await assertOwnerOfLocation(id, userId);

      return getLocationById(id);
    },
    locations: async (organisation, args): Promise<Location[]> => {
      logger.silly(
        `Get locations of organisation [${organisation.id}] with offset [${args.offset}] and limit [${args.limit}]`,
      );

      const { offset, limit } = await validateArgs(
        args,
        Joi.object({
          offset: Joi.number().integer().min(0),
          limit: Joi.number().integer().positive().max(100),
        }),
      );

      return getLocationsOfOrganisation(organisation.id, offset, limit);
    },
  },
  Mutation: {
    createLocation: async (_, args, { koaCtx, userId }): Promise<Location> => {
      logger.silly(
        `Create location [${args.location.name}] for organisation [${args.organisationId}]`,
      );

      assertAuthenticated(koaCtx);

      const { organisationId, location } = await validateArgs(
        args,
        Joi.object({
          organisationId: Joi.string(),
          location: Joi.object({
            name: Joi.string(),
          }),
        }),
      );

      await assertOwnerOfOrganisation(organisationId, userId);

      return createLocationForOrganisation(organisationId, location);
    },
  },
};

export default locationResolvers;
