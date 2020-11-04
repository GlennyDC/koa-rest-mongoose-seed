import { ApolloServer } from 'apollo-server-koa';
import type Koa from 'koa';
import type { Logger } from 'winston';

import { createLocationLoader } from '../../modules/location/location.loader';
import { createOrganisationLoader } from '../../modules/organisation/organisation.loader';
import { transformGraphQLError } from '../error';
import { getEnvironmentVariable } from '../getEnvironmentVariable';
import { Context } from './context';
import { bootstrapGraphqlSchema } from './utils';

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

export const installGraphQLServer = async (
  app: Koa,
  logger: Logger,
): Promise<void> => {
  logger.info('Install Apollo server');

  try {
    const schema = await bootstrapGraphqlSchema();

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
