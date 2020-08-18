import DataLoader from 'dataloader';

import { Category } from './category';
import * as categoryService from './category.service';

const loaderFn = async (
  keys: readonly string[],
): Promise<(Category | Error)[]> => {
  const categorys = await categoryService.getCategoriesByIds(keys);

  const categoryMap = new Map<string, Category>();
  categorys.forEach((category) => categoryMap.set(category.id, category));

  return keys.map(
    (key) => categoryMap.get(key) || new Error(`No result for key [${key}]`),
  );
};

export type CategoryLoader = DataLoader<string, Category>;

export const makeCategoryLoader = (): CategoryLoader =>
  new DataLoader<string, Category>(loaderFn);
