import { AuthorLoader } from '../../modules/author/author.loader';
import { BookLoader } from '../../modules/book/book.loader';
import { CategoryLoader } from '../../modules/category/category.loader';

export type Context = {
  authorLoader: AuthorLoader;
  bookLoader: BookLoader;
  categoryLoader: CategoryLoader;
};
