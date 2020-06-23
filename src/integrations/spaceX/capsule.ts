import { request, IntegrationError, makeLogger } from '../../core';
import { SpaceXCapsule } from '../../types';

const logger = makeLogger('SpaceX - capsule');

class TestError extends Error {
  extraStuff: string;
  constructor() {
    super('This is the test error');
    this.extraStuff = 'hello extra stuff';
  }
}

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
    throw new TestError();
  } catch (err) {
    logger.error(
      `Could not get capsules limit [${limit}] offset [${offset}] order [${order}] sort [${sort}]`,
    );
    throw new TestError();
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
