import { Resolvers, createLogger, handler } from '../../global';
import { assertOwnerOfOrganisation } from '../organisation.auth';
import {
  getOrganisationById,
  getOrganisationsOfUser,
  createOrganisationForUser,
} from './organisation.service';

const logger = createLogger('organisation-resolvers');

const organisationResolvers: Resolvers = {
  Query: {
    organisation: handler(
      (Joi) =>
        Joi.object({
          id: Joi.string(),
        }),
      async (_, { id }, { userId }) => {
        logger.silly(`Get organisation [${id}]`);

        await assertOwnerOfOrganisation(id, userId);

        return getOrganisationById(id);
      },
    ),
    organisations: handler(
      (Joi) =>
        Joi.object({
          offset: Joi.number().integer().min(0),
          limit: Joi.number().integer().positive().max(100),
        }),
      async (_, { offset, limit }, { userId }) => {
        logger.silly(
          `Get organisations with offset [${offset}] and limit [${limit}]`,
        );

        return getOrganisationsOfUser(userId, offset, limit);
      },
    ),
  },
  Mutation: {
    createOrganisation: handler(
      (Joi) =>
        Joi.object({
          organisation: Joi.object({
            name: Joi.string(),
          }),
        }),
      async (_, { organisation }, { userId }) => {
        logger.silly(`Create organisation [${organisation.name}]`);

        return createOrganisationForUser(userId, organisation);
      },
    ),
  },
};

export default organisationResolvers;
