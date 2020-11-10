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
          id: Joi.string().objectId(),
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
          order: Joi.object({
            name: Joi.string().lowercase().valid('asc', 'desc').optional(),
          })
            .or('name')
            .optional(),
        }),
      async (_, { offset, limit, order }, { userId }) => {
        logger.silly(
          `Get organisations with offset [${offset}], limit [${limit}] and order [${order}]`,
        );

        return getOrganisationsOfUser(userId, offset, limit, order);
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
