import { createLogger, NotFoundError, ErrorCode } from '../../global';
import { OrganisationModel } from './organisation.model';

const logger = createLogger('organisation-auth');

export const assertOwnerOfOrganization = async (
  organisationId: string,
  userId: string,
): Promise<void> => {
  logger.info(
    `Assert user [${userId}] is the owner of organisation [${organisationId}]`,
  );

  const organisation = await OrganisationModel.findById(organisationId).exec();

  if (!organisation) {
    logger.info(`Organisation [${organisationId}] not found`);
    throw new NotFoundError(
      `Organisation [${organisationId}] not found`,
      ErrorCode.ORGANISATION_NOT_FOUND,
    );
  }

  if (organisation.ownerId.toString() !== userId) {
    logger.warn(
      `User [${userId}] is not the owner of organisation [${organisationId}]`,
    );
    throw new NotFoundError(
      `Organisation [${organisationId}] not found`,
      ErrorCode.ORGANISATION_NOT_FOUND,
    );
  }
};
