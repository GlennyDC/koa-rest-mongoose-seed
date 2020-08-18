import { loadFiles } from '@graphql-toolkit/file-loading';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa';
import type { IResolvers } from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';
import type Koa from 'koa';
import { join } from 'path';

import { transformGraphQLError } from '.';
import { config } from '../config';

const EXPOSE_ERROR_STACKTRACES = config.server.graphql.exposeErrorStackTraces;
const ENABLE_PLAYGROUND = config.server.graphql.enablePlayground;
const ENABLE_INTROSPECTION = config.server.graphql.enableIntrospection;

const bootstrapSchema = (): GraphQLSchema => {
  const typeDefs = loadFiles<string>(
    join(__dirname, '../modules/**/*.typeDefs.gql'),
  );
  const resolvers = loadFiles<IResolvers>(
    join(__dirname, '../modules/**/*.resolvers.*'),
  );
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  return schema;
};

const installApolloServer = (app: Koa): void => {
  const schema = bootstrapSchema();
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
