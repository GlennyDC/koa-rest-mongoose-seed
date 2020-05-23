import { makeExecutableSchema } from 'apollo-server-koa';
import { loadFiles } from '@graphql-toolkit/file-loading';
import { join } from 'path';

// TODO: Types
const makeSchema = () => {
  const typeDefs = loadFiles<string>(join(__dirname, '**/*.gql'));
  const resolvers = loadFiles<object>(join(__dirname, '**/*.ts'));
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  return schema;
};

export default makeSchema;
