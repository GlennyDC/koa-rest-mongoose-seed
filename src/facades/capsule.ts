import { makeLogger } from '../core';
import { capsuleService } from '../services';
import type { Capsule } from '../types';

const logger = makeLogger('facade - capsule');

interface QueryArgs {
  limit?: number;
  offset?: number;
  order?: string;
  sort?: string;
}

const capsules = async ({
  limit = 100,
  offset = 0,
  order = '',
  sort = 'asc',
}: QueryArgs): Promise<Capsule[]> => {
  logger.debug(
    `Get capsules limit [${limit}] offset [${offset}] order [${order}] sort [${sort}]`,
  );
  return capsuleService.getCapsules(limit, offset, order, sort);
};

const capsule = async (id: string): Promise<Capsule> => {
  logger.debug(`Get capsule [${id}]`);
  return capsuleService.getCapsuleById(id);
};

export { capsules, capsule };
