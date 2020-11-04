import Koa from 'koa';

import { createLogger, applyMiddleware, installGraphQLServer } from './global';

export const createApp = async (): Promise<Koa> => {
  const logger = createLogger('app');

  logger.info('Start creation of app');

  const app = new Koa();

  applyMiddleware(app, logger);

  await installGraphQLServer(app, logger);

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
