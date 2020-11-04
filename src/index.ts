import http from 'http';

import { createApp } from './app';
import {
  createLogger,
  getEnvironmentVariable,
  connectWithDatabase,
} from './global';

const SERVER_PORT = getEnvironmentVariable<number>('SERVER_PORT');
const SERVER_HOSTNAME = getEnvironmentVariable<string>('SERVER_HOSTNAME');

(async (): Promise<void> => {
  const logger = createLogger('server');

  try {
    const mongooseInstance = await connectWithDatabase(logger);

    const app = await createApp();

    logger.info('Create server');
    const server = http.createServer(app.callback());

    server.listen(SERVER_PORT, SERVER_HOSTNAME, () => {
      logger.info(
        `Server listening at ${SERVER_HOSTNAME}:${SERVER_PORT} in ${process.env.NODE_ENV} mode`,
      );
    });

    // Graceful shutdown of the server
    const shutdown = async (): Promise<void> => {
      logger.info('Start graceful shutdown of server');
      if (process.env.NODE_ENV === 'development') {
        logger.info('Process is running in development mode, exit immediately');
        server.close((err) => {
          if (err) {
            logger.error(`Could not gracefully close server: `, err);
            process.exitCode = 1;
          }
          process.exit();
        });
      }

      logger.info('Disconnect from database');
      await mongooseInstance.disconnect();

      logger.info('Close server');
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
  } catch (err) {
    // TODO: Delete this
    logger.error(
      'Wooah there, this should never ever occur ########### (except during a startup error):',
      err,
    );
    process.exit(1);
  }
})();
