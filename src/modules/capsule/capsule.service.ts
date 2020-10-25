import { createLogger } from '../../global';
import type { Capsule } from './capsule';
import { mapSpaceXCapsuleToCapsule } from './capsule.mappers';
import * as capsuleRepo from './capsule.spacex';

const logger = createLogger('service - capsule');

export const getCapsules = async (
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
  const capsules = spaceXCapsules.map(mapSpaceXCapsuleToCapsule);
  return capsules;
};

export const getCapsuleById = async (id: string): Promise<Capsule> => {
  logger.info(`Get capsule [${id}]`);
  const spaceXCapsule = await capsuleRepo.getCapsuleById(id);
  const capsule = mapSpaceXCapsuleToCapsule(spaceXCapsule);
  return capsule;
};
