import { Resolvers, createLogger, handler } from '../../global';
import { assertOwnerOfLocation } from '../location.auth';
import { assertOwnerOfOrganisation } from '../organisation.auth';
import {
  createLocationForOrganisation,
  getLocationsOfOrganisation,
  getLocationById,
} from './location.service';

const logger = createLogger('location-resolvers');

const locationResolvers: Resolvers = {
  Organisation: {
    location: handler(
      (Joi) =>
        Joi.object({
          id: Joi.string().objectId(),
        }),
      async (_, { id }, { userId }) => {
        logger.silly(`Get location [${id}]`);

        await assertOwnerOfLocation(id, userId);

        return getLocationById(id);
      },
    ),
    locations: handler(
      (Joi) =>
        Joi.object({
          offset: Joi.number().integer().min(0),
          limit: Joi.number().integer().positive().max(100),
        }),
      async (organisation, { offset, limit }) => {
        logger.silly(
          `Get locations of organisation [${organisation.id}] with offset [${offset}] and limit [${limit}]`,
        );

        return getLocationsOfOrganisation(organisation.id, offset, limit);
      },
    ),
  },
  Mutation: {
    createLocation: handler(
      (Joi) =>
        Joi.object({
          organisationId: Joi.string().objectId(),
          location: Joi.object({
            name: Joi.string(),
          }),
        }),
      async (_, { organisationId, location }, { userId }) => {
        logger.silly(
          `Create location [${location.name}] for organisation [${organisationId}]`,
        );

        await assertOwnerOfOrganisation(organisationId, userId);

        return createLocationForOrganisation(organisationId, location);
      },
    ),
  },
};

export default locationResolvers;
