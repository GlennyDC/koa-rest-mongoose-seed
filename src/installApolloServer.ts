import Koa from 'koa';
import { ApolloServer, AuthenticationError } from 'apollo-server-koa';

import makeSchema from './schema';
import { extractToken } from './core/auth/token';

interface IntegrationContext {
  ctx: Koa.Context;
}

const installApolloServer = (app: Koa): void => {
  const schema = makeSchema();
  const apolloServer = new ApolloServer({
    schema,
    debug: true,
    context: async ({ ctx }: IntegrationContext): Promise<any> => {
      if (ctx.state.token) {
        try {
          const { user } = await extractToken(ctx.state.token);
          return { user };
        } catch (err) {
          throw new AuthenticationError('must authenticate');
        }
      }
      return {};
    },
  });
  apolloServer.applyMiddleware({ app });
};

export default installApolloServer;
