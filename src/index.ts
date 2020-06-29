import http from 'http';

import { createApp } from './app';
import { config } from './config';
import { makeLogger } from './core';

const PORT = config.server.port;
const HOST_NAME = config.server.hostName;

const logger = makeLogger('server');

const server = http
  .createServer(createApp().callback())
  .listen(PORT, HOST_NAME, () => {
    logger.info(
      `Server ready at ${HOST_NAME}:${PORT} in ${process.env.NODE_ENV} mode`,
    );
  });

// Graceful shutdown of the server
const shutdown = (): void => {
  logger.info('Starting shutdown of server...');
  server.close((err) => {
    if (err) {
      logger.error(`Could not gracefully close server: `, err);
      process.exitCode = 1;
    }
    process.exit();
  });
};

// SIGINT signal (CTRL-C)
process.on('SIGINT', () => {
  logger.warn('Received SIGINT signal');
  shutdown();
});

// SIGTERM signal (Docker stop)
process.on('SIGTERM', () => {
  logger.warn('Received SIGTERM signal');
  shutdown();
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception: ', error);
  shutdown();
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection: ', JSON.stringify(reason), promise);
  shutdown();
});
