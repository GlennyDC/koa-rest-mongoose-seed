import { Resolvers, createLogger } from '../../global';
import { Category } from './category';

const logger = createLogger('category-resolver');

const categoryResolvers: Resolvers = {
  Book: {
    categories: async (
      { id, categoryIds },
      _,
      { categoryLoader },
    ): Promise<Category[]> => {
      logger.silly(`Get all categories of book [${id}]`);

      // @ts-expect-error
      return categoryLoader.loadMany(categoryIds);
    },
  },
};

export default categoryResolvers;
