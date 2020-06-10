import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';

import { formatError } from './core';
import makeSchema from './schema/makeSchema';

const installApolloServer = (app: Koa): void => {
  const schema = makeSchema();
  const apolloServer = new ApolloServer({
    schema,
    debug: true,
    formatError,
  });
  apolloServer.applyMiddleware({ app });
};

export { installApolloServer };
