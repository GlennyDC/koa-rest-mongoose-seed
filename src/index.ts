import Koa from 'koa';
import { Socket } from 'net';
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

// Graceful shutdown of the server
const shutdown = () => {
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
