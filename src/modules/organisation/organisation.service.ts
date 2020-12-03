import { createLogger, NotFoundError, ErrorCode } from '../../global';
import {
  Organisation,
  CreateOrganisationInput,
  UpdateOrganisationInput,
} from './organisation';
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
): Promise<Organisation[]> => {
  logger.info(`Get organisations of user [${userId}]`);

  const organisations = await OrganisationModel.find({
    ownerId: userId,
  })
    .skip(offset)
    .limit(limit)
    .exec();

  return organisations;
};

export const createOrganisationForUser = async (
  userId: string,
  organisation: CreateOrganisationInput,
): Promise<Organisation> => {
  logger.info(`Create organisation for user [${userId}]`);

  const createdOrganisation = await OrganisationModel.create({
    ownerId: userId,
    ...organisation,
  });

  return createdOrganisation;
};

export const updateOrganisation = async (
  id: string,
  organisation: UpdateOrganisationInput,
): Promise<Organisation> => {
  logger.info(`Update organisation [${id}]`);

  const updatedOrganisation = await OrganisationModel.findByIdAndUpdate(
    id,
    organisation,
  ).exec();

  if (!updatedOrganisation) {
    logger.info(`Organisation [${id}] not found`);
    throw new NotFoundError(
      `Organisation [${id}] not found`,
      ErrorCode.ORGANISATION_NOT_FOUND,
    );
  }

  return updatedOrganisation;
};
