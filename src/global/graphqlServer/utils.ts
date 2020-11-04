import { makeExecutableSchema, gql } from 'apollo-server-koa';
import type { IResolvers } from 'apollo-server-koa';
import { DocumentNode, GraphQLSchema } from 'graphql';
import path from 'path';

import { getDefaultExportsFromModules } from '../utils';

const TYPEDEFS_GLOB_PATTERN = '**/*.typeDefs!(*.map)';
const RESOLVERS_GLOB_PATTERN = '**/*.resolvers!(*.map)';

const loadTypeDefs = async (): Promise<DocumentNode[]> => {
  const queryTypeDef = gql('type Query');
  const mutationTypeDef = gql('type Mutation');

  const typeDefs = await getDefaultExportsFromModules<DocumentNode>(
    path.join(__dirname, '../../modules'),
    TYPEDEFS_GLOB_PATTERN,
  );

  return [queryTypeDef, mutationTypeDef, ...typeDefs];
};

const loadResolvers = async (): Promise<IResolvers[]> => {
  const resolvers = await getDefaultExportsFromModules<IResolvers>(
    path.join(__dirname, '../../modules'),
    RESOLVERS_GLOB_PATTERN,
  );

  return resolvers;
};

export const bootstrapGraphqlSchema = async (): Promise<GraphQLSchema> => {
  const typeDefs = await loadTypeDefs();
  const resolvers = await loadResolvers();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  return schema;
};
