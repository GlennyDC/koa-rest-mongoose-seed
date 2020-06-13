import { makeLogger } from '../core';
import { capsuleRepo } from '../integrations';
import { capsuleMappers } from '../mappers';
import { Capsule } from '../types';

const logger = makeLogger('service - capsule');

const getCapsules = async (
  limit: number,
  offset: number,
  order: string,
  sort: string,
): Promise<Capsule[]> => {
  logger.info(
    `Get capsules limit [${limit}] offset [${offset}] order [${order}] sort [${sort}]`,
  );
  const spaceXCapsules = await capsuleRepo.getCapsules(
    limit,
    offset,
    order,
    sort,
  );
  const capsules = spaceXCapsules.map(capsuleMappers.mapSpaceXCapsuleToCapsule);
  return capsules;
};

const getCapsuleById = async (id: string): Promise<Capsule> => {
  logger.info(`Get capsule [${id}]`);
  const spaceXCapsule = await capsuleRepo.getCapsuleById(id);
  const capsule = capsuleMappers.mapSpaceXCapsuleToCapsule(spaceXCapsule);
  return capsule;
};

export { getCapsules, getCapsuleById };
