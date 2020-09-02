import { createLogger } from '../../global';
import { Category } from './category';
import { categories } from './category.data';

const logger = createLogger('category-service');

export const getCategoriesByIds = async (
  ids: readonly string[],
): Promise<Category[]> => {
  logger.verbose(`Get categories [${ids}]`);

  return categories.filter((category) => ids.includes(category.id));
};
