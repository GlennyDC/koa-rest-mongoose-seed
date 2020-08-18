import { createLogger } from '../../core';
import { Resolvers } from '../../global';
import { Book } from './book';
import * as bookService from './book.service';

const logger = createLogger('book-resolver');

const bookResolvers: Resolvers = {
  Query: {
    books: async (_, { limit = 10 }): Promise<Book[]> => {
      logger.silly(`Get books with a limit of [${limit}]`);
      return bookService.getBooks(limit);
    },
    book: async (_, { id }): Promise<Book> => {
      logger.silly(`Get book [${id}]`);
      return bookService.getBookById(id);
    },
  },
  Author: {
    books: async ({ id, bookIds }, _, { bookLoader }): Promise<Book[]> => {
      logger.silly(`Get books of author [${id}]`);

      const books = await bookLoader.loadMany(bookIds);

      return books as Book[];
    },
  },
};

export default bookResolvers;
