import { createLogger } from '../../core';
import { Resolvers } from '../../global';
import { Author } from './author';
import * as authorService from './author.service';

const logger = createLogger('author-resolver');

const authorResolvers: Resolvers = {
  Book: {
    authors: async (args, _, ctx): Promise<Author[]> => {
      logger.silly(`Get all authors of book [${args.id}]`);

      const authors = await ctx.authorLoader.loadMany(args.authorIds);

      return authors as Author[];
    },
  },
  Query: {
    authors: async (_, { limit = 10 }): Promise<Author[]> => {
      logger.silly(`Get authors with a limit of [${limit}]`);
      return authorService.getAuthors(limit);
    },
  },
};

export default authorResolvers;
