import { loadFiles } from '@graphql-toolkit/file-loading';
import { makeExecutableSchema, IResolvers } from 'apollo-server-koa';
import { join } from 'path';

// TODO: Types
const makeSchema = () => {
  const typeDefs = loadFiles<string>(join(__dirname, '**/*.typeDefs.gql'));
  const resolvers = loadFiles<IResolvers>(join(__dirname, '**/*.resolvers.js'));
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  return schema;
};

export default makeSchema;
