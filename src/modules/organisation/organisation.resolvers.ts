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
          order: Joi.order('name', 'ownerId').optional(),
        }),
      async (_, { offset, limit, order }, { userId }) => {
        // TODO: Remove null proto
        const fix = JSON.parse(JSON.stringify(order));
        console.log(fix);
        logger.silly(
          `Get organisations with offset [${offset}], limit [${limit}] and order [${fix}]`,
        );

        return getOrganisationsOfUser(userId, offset, limit, fix);
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
