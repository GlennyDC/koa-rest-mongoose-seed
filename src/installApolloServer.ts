import { ApolloServer } from 'apollo-server-koa';
import type Koa from 'koa';

import { config } from './config';
import { transformGraphQLError } from './core';
import makeSchema from './schema/makeSchema';

const EXPOSE_ERROR_STACKTRACES = config.server.graphql.exposeErrorStackTraces;
const ENABLE_PLAYGROUND = config.server.graphql.enablePlayground;
const ENABLE_INTROSPECTION = config.server.graphql.enableIntrospection;

const installApolloServer = (app: Koa): void => {
  const schema = makeSchema();
  const apolloServer = new ApolloServer({
    schema,
    debug: EXPOSE_ERROR_STACKTRACES,
    playground: ENABLE_PLAYGROUND,
    introspection: ENABLE_INTROSPECTION,
    formatError: transformGraphQLError,
  });
  apolloServer.applyMiddleware({ app });
};

export { installApolloServer };
