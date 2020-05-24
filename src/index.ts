import Koa from 'koa';
import config from 'config';

import { makeLogger, installMiddleware } from './core';

import installApolloServer from './installApolloServer';

const PORT = config.get<number>('server.port');
const HOST_NAME = config.get<number>('server.hostName');

const app = new Koa();

installMiddleware(app);

const logger = makeLogger('app');

installApolloServer(app);

const server = app.listen(PORT, HOST_NAME, () => {
  logger.info(
    `Server ready at ${HOST_NAME}:${PORT} in ${process.env.NODE_ENV} mode`,
  );
});

// Log any handled Koa error
app.on('error', (err) => {
  logger.info(
    'Following error was correctly handled in error middleware: ',
    err,
  );
});

// Graceful shutdown of the server
const shutdown = (): void => {
  // TODO: What todo else?
  server.close((err) => {
    if (err) {
      logger.error(`Could not gracefully close server`, err);
      process.exitCode = 1;
    }
    process.exit();
  });
};

// SIGINT signal (CTRL-C in Docker)
process.on('SIGINT', () => {
  logger.warn(`Start graceful shutdown after SIGINT signal`);
  shutdown();
});

// SIGTERM signal (Docker stop)
process.on('SIGTERM', () => {
  logger.warn(`Start graceful shutdown after SIGTERM signal`);
  shutdown();
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', error);
  shutdown();
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection', JSON.stringify(reason), promise);
  shutdown();
});
