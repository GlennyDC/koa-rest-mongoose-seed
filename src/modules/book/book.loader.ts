import DataLoader from 'dataloader';

import { Book } from './book';
import * as bookService from './book.service';

const loaderFn = async (keys: readonly string[]): Promise<(Book | Error)[]> => {
  const books = await bookService.getBooksByIds(keys);

  const bookMap = new Map<string, Book>();
  books.forEach((book) => bookMap.set(book.id, book));

  return keys.map(
    (key) => bookMap.get(key) || new Error(`No result for key [${key}]`),
  );
};

export type BookLoader = DataLoader<string, Book>;

export const makeBookLoader = (): BookLoader =>
  new DataLoader<string, Book>(loaderFn);
