import { createLogger } from '../../global';
import { Author } from './author';
import { authors } from './author.data';
import { db } from './author.model';

const logger = createLogger('author-service');

export const getAuthors = async (limit: number): Promise<Author[]> => {
  logger.verbose(`Get authors with a limit of [${limit}]`);

  const authors = await db.find({}).limit(limit);
  return authors;
};

export const getAuthorsByIds = async (
  ids: readonly string[],
): Promise<Author[]> => {
  logger.verbose(`Get authors [${ids}]`);

  return authors.filter((author) => ids.includes(author.id));
};
