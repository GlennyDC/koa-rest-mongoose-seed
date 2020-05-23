import { makeLogger } from '../core';
import { capsuleRepo } from '../integrations';
import { capsuleMappers } from '../mappers';
import { APICapsule } from '../contracts';

const logger = makeLogger('service - capsule');

const getCapsules = async (
  limit: number,
  offset: number,
  order: string,
  sort: string,
): Promise<APICapsule[]> => {
  logger.info(
    `Get capsules limit [${limit}] offset [${offset}] order [${order}] sort [${sort}]`,
  );
  const spaceXCapsules = await capsuleRepo.getCapsules(
    limit,
    offset,
    order,
    sort,
  );
  const APICapsules = spaceXCapsules.map(
    capsuleMappers.mapSpaceXCapsuleToAPICapsule,
  );
  return APICapsules;
};

const getCapsuleById = async (id: string): Promise<APICapsule> => {
  logger.info(`Get capsule [${id}]`);
  const spaceXCapsule = await capsuleRepo.getCapsuleById(id);
  const APICapsule = capsuleMappers.mapSpaceXCapsuleToAPICapsule(spaceXCapsule);
  return APICapsule;
};

export { getCapsules, getCapsuleById };
