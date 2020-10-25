import { createLogger, NotFoundError, ErrorCode } from '../global';
import { LocationModel } from './location/location.model';
import { assertOwnerOfOrganisation } from './organisation.auth';

const logger = createLogger('location-auth');

export const assertOwnerOfLocation = async (
  locationId: string,
  userId: string,
): Promise<void> => {
  logger.info(
    `Assert user [${userId}] is the owner of location [${locationId}]`,
  );

  const location = await LocationModel.findById(locationId).exec();

  if (!location) {
    logger.info(`Location [${locationId}] not found`);
    throw new NotFoundError(
      `Location [${locationId}] not found`,
      ErrorCode.ORGANISATION_NOT_FOUND,
    );
  }

  await assertOwnerOfOrganisation(location.organisationId, userId);
};
