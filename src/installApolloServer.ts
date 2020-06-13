import { ApolloServer } from 'apollo-server-koa';
import config from 'config';
import Koa from 'koa';

import { formatError } from './core';
import makeSchema from './schema/makeSchema';

const EXPOSE_ERROR_STACKTRACES = config.get<boolean>(
  'server.graphql.exposeErrorStackTraces',
);

const installApolloServer = (app: Koa): void => {
  const schema = makeSchema();
  const apolloServer = new ApolloServer({
    schema,
    debug: EXPOSE_ERROR_STACKTRACES,
    formatError,
  });
  apolloServer.applyMiddleware({ app });
};

export { installApolloServer };
