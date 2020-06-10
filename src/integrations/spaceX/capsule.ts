import { SpaceXCapsule } from '../../contracts';
import { request, IntegrationError, makeLogger } from '../../core';

const logger = makeLogger('SpaceX - capsule');

const getCapsules = async (
  limit: number,
  offset: number,
  order: string,
  sort: string,
): Promise<SpaceXCapsule[]> => {
  logger.verbose(
    `Get capsules limit [${limit}] offset [${offset}] order [${order}] sort [${sort}]`,
  );
  try {
    const capsules = await request.get<SpaceXCapsule[]>(
      'https://api.spacexdata.com/v3/',
      'capsules',
      { limit, offset, order, sort },
    );
    return capsules;
  } catch (err) {
    logger.error(
      `Could not get capsules limit [${limit}] offset [${offset}] order [${order}] sort [${sort}]`,
    );
    throw new IntegrationError();
  }
};

const getCapsuleById = async (id: string): Promise<SpaceXCapsule> => {
  logger.verbose(`Get capsule [${id}]`);
  try {
    const capsule = await request.get<SpaceXCapsule>(
      'https://api.spacexdata.com/v3/',
      'capsules/' + id,
    );
    return capsule;
  } catch (err) {
    logger.error(`Could not get capsule [${id}]`);
    throw new IntegrationError();
  }
};

export { getCapsules, getCapsuleById };
