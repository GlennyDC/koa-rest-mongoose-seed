import DataLoader from 'dataloader';

import { Author } from './author';
import * as authorService from './author.service';

const loaderFn = async (
  keys: readonly string[],
): Promise<(Author | Error)[]> => {
  const authors = await authorService.getAuthorsByIds(keys);

  const authorMap = new Map<string, Author>(
    authors.map((author) => [author.id, author]),
  );

  return keys.map(
    (key) => authorMap.get(key) || new Error(`No result for key [${key}]`),
  );
};

export type AuthorLoader = DataLoader<string, Author>;

export const createAuthorLoader = (): AuthorLoader =>
  new DataLoader<string, Author>(loaderFn);
