import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';

import makeSchema from './schema';

const installApolloServer = (app: Koa): void => {
  const schema = makeSchema();
  const apolloServer = new ApolloServer({
    schema,
    debug: true,
    context: ({ ctx }: { ctx: Koa.Context }): Koa.Context => {
      return ctx;
    },
  });
  apolloServer.applyMiddleware({ app });
};

export default installApolloServer;
