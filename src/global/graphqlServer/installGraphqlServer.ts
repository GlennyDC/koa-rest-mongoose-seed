import { loadFiles } from '@graphql-toolkit/file-loading';
import { ApolloServer, makeExecutableSchema, gql } from 'apollo-server-koa';
import type { IResolvers } from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';
import type Koa from 'koa';
import { join } from 'path';
import type { Logger } from 'winston';

import { createLocationLoader } from '../../modules/location/location.loader';
import { createOrganisationLoader } from '../../modules/organisation/organisation.loader';
import { transformGraphQLError } from '../error';
import { getEnvironmentVariable } from '../getEnvironmentVariable';
import { Context } from './context';
import { bootstrapSchema } from './utils';

export const createContext = ({
  ctx: koaCtx,
}: {
  ctx: Koa.Context;
}): Context => {
  const userId = koaCtx.state.user?.id;
  const locationLoader = createLocationLoader();
  const organisationLoader = createOrganisationLoader();

  return {
    koaCtx,
    userId,
    locationLoader,
    organisationLoader,
  };
};

const ENABLE_GRAPHQL_PLAYGROUND = getEnvironmentVariable<boolean>(
  'ENABLE_GRAPHQL_PLAYGROUND',
);
const ENABLE_GRAPHQL_INTROSPECTION = getEnvironmentVariable<boolean>(
  'ENABLE_GRAPHQL_INTROSPECTION',
);
const EXPOSE_ERROR_STACK_TRACES = getEnvironmentVariable<boolean>(
  'EXPOSE_ERROR_STACK_TRACES',
);

const bootstrapSchemaX = async (): Promise<GraphQLSchema> => {
  const queryTypeDef = gql`
    type Query
  `;

  const mutationTypeDef = gql`
    type Mutation
  `;

  // const typeDefs = loadFiles<string>(
  //   join(__dirname, '../modules/**/*.typeDefs.*'),
  // );

  const typeDefs = await bootstrapSchema();

  const resolvers = loadFiles<IResolvers>(
    join(__dirname, '../modules/**/*.resolvers.*'),
  );

  const schema = makeExecutableSchema({
    typeDefs: [queryTypeDef, mutationTypeDef, ...typeDefs],
    resolvers,
  });

  return schema;
};

export const installGraphQLServer = async (
  app: Koa,
  logger: Logger,
): Promise<void> => {
  logger.info('Install Apollo server');

  try {
    const schema = await bootstrapSchemaX();
    const apolloServer = new ApolloServer({
      schema,
      context: createContext,
      debug: EXPOSE_ERROR_STACK_TRACES,
      playground: ENABLE_GRAPHQL_PLAYGROUND,
      introspection: ENABLE_GRAPHQL_INTROSPECTION,
      formatError: transformGraphQLError,
    });
    apolloServer.applyMiddleware({ app });
  } catch (err) {
    logger.error('Could not install Apollo server:', err);
    throw err;
  }
};
