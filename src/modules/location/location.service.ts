import { createLogger, NotFoundError, ErrorCode } from '../../global';
import { CreateLocationInput, Location } from './location';
import { LocationModel } from './location.model';

const logger = createLogger('organisation-service');

export const getLocationById = async (id: string): Promise<Location> => {
  logger.info(`Get location [${id}]`);

  const location = await LocationModel.findById(id).exec();

  if (!location) {
    logger.info(`Location [${id}] not found`);
    throw new NotFoundError(
      `Location [${id}] not found`,
      ErrorCode.LOCATION_NOT_FOUND,
    );
  }

  return location;
};

export const getLocationsOfOrganisation = async (
  organisationId: string,
  offset: number,
  limit: number,
): Promise<Location[]> => {
  logger.info(
    `Get locations of organisation [${organisationId}] with offset [${offset}] and limit [${limit}]`,
  );

  const locations = await LocationModel.find({
    organisationId,
  })
    .skip(offset)
    .limit(limit)
    .exec();

  return locations;
};

export const createLocationForOrganisation = async (
  organisationId: string,
  location: CreateLocationInput,
): Promise<Location> => {
  logger.info(
    `Create location [${location.name}] for organisation [${organisationId}]`,
  );

  const createdLocation = await new LocationModel({
    organisationId,
    ...location,
  }).save();

  return createdLocation;
};
