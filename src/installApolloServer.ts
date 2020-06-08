import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';

import { AuthenticationError } from './core/error/AuthenticationError';
import makeSchema from './schema/makeSchema';

interface IntegrationContext {
  ctx: Koa.Context;
}

const installApolloServer = (app: Koa): void => {
  const schema = makeSchema();
  const apolloServer = new ApolloServer({
    schema,
    debug: false,
    context: async ({ ctx }: IntegrationContext): Promise<any> => {
      // throw new AuthenticationError();

      return {};
    },
  });
  apolloServer.applyMiddleware({ app });
};

export { installApolloServer };
