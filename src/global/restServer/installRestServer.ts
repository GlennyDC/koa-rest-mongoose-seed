import type Koa from 'koa';
import Router from 'koa-router';
import path from 'path';
import type { Logger } from 'winston';

import { getDefaultExportsFromModules } from '../utils';

const ROUTES_GLOB_PATTERN = '**/*.rest!(*.map)';

const load = async (): Promise<any[]> => {
  const routerInstallers = await getDefaultExportsFromModules<any>(
    path.join(__dirname, '../../modules'),
    ROUTES_GLOB_PATTERN,
  );

  return routerInstallers;
};

export const installRestServer = async (
  app: Koa,
  logger: Logger,
): Promise<void> => {
  logger.info('Install REST server');

  try {
    const router = new Router({ prefix: '/api' });

    const routerInstallers = await load();

    await Promise.all(
      routerInstallers.map(async (installer) => installer(router)),
    );

    app.use(router.routes());
    app.use(router.allowedMethods());
  } catch (err) {
    logger.error('Could not install REST server:', err);
    throw err;
  }
};
