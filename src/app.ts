import Koa from 'koa';

import {
  createLogger,
  applyMiddleware,
  installApolloServer,
  installDatabaseConnection,
} from './global';

const logger = createLogger('app');

const createApp = async (): Promise<Koa> => {
  logger.info('Starting creation of app...');

  const app = new Koa();

  logger.info('Applying middleware...');
  try {
    applyMiddleware(app);
  } catch (err) {
    logger.error('Could not apply middleware:', err);
    throw err;
  }

  logger.info('Installing Apollo server...');
  try {
    installApolloServer(app);
  } catch (err) {
    logger.error('Could not install Apollo server:', err);
    throw err;
  }

  logger.info('Installing database connection...');
  try {
    await installDatabaseConnection();
  } catch (err) {
    logger.error('Could not install database connection:', err);
    throw err;
  }

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

export { createApp };
