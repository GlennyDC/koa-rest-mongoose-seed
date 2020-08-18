import { createLogger } from '../../core';
import { Book } from './book';
import { books } from './book.data';

const logger = createLogger('book-service');

export const getBookById = async (id: string): Promise<Book> => {
  logger.verbose(`Get book [${id}]`);

  const book = books.find((book) => book.id === id);

  if (!book) throw new Error(`Book [${id}] not found`);

  return book;
};

export const getBooks = async (limit: number): Promise<Book[]> => {
  logger.verbose(`Get books with a limit of [${limit}]`);

  return books.slice(0, limit);
};

export const getBooksByIds = async (
  ids: readonly string[],
): Promise<Book[]> => {
  logger.verbose(`Get books [${ids}]`);

  return books.filter((book) => ids.includes(book.id));
};
