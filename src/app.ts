import Koa from 'koa';

import {
  createLogger,
  applyMiddleware,
  installApolloServer,
  installDatabaseConnection,
} from './global';

const logger = createLogger('app');

export const createApp = async (): Promise<Koa> => {
  logger.info('Starting creation of app...');

  const app = new Koa();

  applyMiddleware(app, logger);

  installApolloServer(app, logger);

  await installDatabaseConnection(logger);

  // Log any handled Koa error
  // (will probably never occur except for 404 Not found)
  app.on('error', (err) => {
    logger.info(
      'Following error was correctly handled in error middleware:',
      err,
    );
  });

  return app;
};
