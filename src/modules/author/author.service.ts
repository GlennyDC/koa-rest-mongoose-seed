import { createLogger } from '../../core';
import { Author } from './author';
import { authors } from './author.data';

const logger = createLogger('author-service');

export const getAuthors = async (limit: number): Promise<Author[]> => {
  logger.verbose(`Get authors with a limit of [${limit}]`);

  return authors.slice(0, limit);
};

export const getAuthorsByIds = async (
  ids: readonly string[],
): Promise<Author[]> => {
  logger.verbose(`Get authors [${ids}]`);

  return authors.filter((author) => ids.includes(author.id));
};
