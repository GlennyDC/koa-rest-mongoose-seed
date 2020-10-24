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

export const getOrganisations = async (
  offset: number,
  limit: number,
): Promise<Organisation[]> => {
  logger.info(`Get organisations with offset [${offset}] and limit [${limit}]`);

  const organisations = await OrganisationModel.find()
    .skip(offset)
    .limit(limit)
    .exec();

  return organisations;
};

export const createOrganisation = async (
  organisation: CreateOrganisationInput,
): Promise<Organisation> => {
  logger.info(`Create organisation [${organisation.name}]`);

  const createdOrganisation = await new OrganisationModel(organisation).save();

  return createdOrganisation;
};
