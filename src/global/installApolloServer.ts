import { loadFiles } from '@graphql-toolkit/file-loading';
import { ApolloServer, makeExecutableSchema, gql } from 'apollo-server-koa';
import type { IResolvers } from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';
import type Koa from 'koa';
import { join } from 'path';

import { transformGraphQLError } from './error';
import { getEnvironmentVariable } from './getEnvironmentVariable';
import { Context } from './types/context';

const ENABLE_GRAPHQL_PLAYGROUND = getEnvironmentVariable<boolean>(
  'ENABLE_GRAPHQL_PLAYGROUND',
);
const ENABLE_GRAPHQL_INTROSPECTION = getEnvironmentVariable<boolean>(
  'ENABLE_GRAPHQL_INTROSPECTION',
);
const EXPOSE_ERROR_STACK_TRACES = getEnvironmentVariable<boolean>(
  'EXPOSE_ERROR_STACK_TRACES',
);

const bootstrapSchema = (): GraphQLSchema => {
  const queryTypeDef = gql`
    type Query
  `;

  const mutationTypeDef = gql`
    type Mutation
  `;

  const typeDefs = loadFiles<string>(
    join(__dirname, '../modules/**/*.typeDefs.*'),
  );

  const resolvers = loadFiles<IResolvers>(
    join(__dirname, '../modules/**/*.resolvers.*'),
  );

  const schema = makeExecutableSchema({
    typeDefs: [queryTypeDef, mutationTypeDef, ...typeDefs],
    resolvers,
  });

  return schema;
};

export const installApolloServer = (app: Koa): void => {
  const schema = bootstrapSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ ctx }): Context => {
      const userId = ctx.state.user?.id;
      return { koaCtx: ctx, userId };
    },
    debug: EXPOSE_ERROR_STACK_TRACES,
    playground: ENABLE_GRAPHQL_PLAYGROUND,
    introspection: ENABLE_GRAPHQL_INTROSPECTION,
    formatError: transformGraphQLError,
  });

  apolloServer.applyMiddleware({ app });
};
