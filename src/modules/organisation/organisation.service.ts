import { createLogger, NotFoundError, ErrorCode } from '../../global';
import { Organisation, CreateOrganisationInput } from './organisation';
import { OrganisationModel } from './organisation.model';

const logger = createLogger('organisation-service');

export const getOrganisationById = async (
  id: string,
): Promise<Organisation> => {
  logger.info(`Get organisation [${id}]`);

  const organisation = await OrganisationModel.findById(id).exec();

  if (!organisation) {
    logger.info(`Organisation [${id}] not found`);
    throw new NotFoundError(
      `Organisation [${id}] not found`,
      ErrorCode.ORGANISATION_NOT_FOUND,
    );
  }

  return organisation;
};

export const getOrganisationsByIds = async (
  ids: string[],
): Promise<Organisation[]> => {
  logger.info(`Get organisations [${ids}]`);

  const organisations = await OrganisationModel.find({
    _id: { $in: ids },
  }).exec();

  return organisations;
};

export const getOrganisationsOfUser = async (
  userId: string,
  offset: number,
  limit: number,
  order: any,
): Promise<Organisation[]> => {
  logger.info(
    `Get organisations of user [${userId}] with offset [${offset}], limit [${limit}] and order [${order}]`,
  );

  const organisations = await OrganisationModel.find({
    ownerId: userId,
  })
    .skip(offset)
    .limit(limit)
    .sort(order) // TODO: Make this an array of arrays
    .exec();

  return organisations;
};

export const createOrganisationForUser = async (
  userId: string,
  organisation: CreateOrganisationInput,
): Promise<Organisation> => {
  logger.info(
    `Create organisation [${organisation.name}] for user [${userId}]`,
  );

  const createdOrganisation = await new OrganisationModel({
    ownerId: userId,
    ...organisation,
  }).save();

  return createdOrganisation;
};
