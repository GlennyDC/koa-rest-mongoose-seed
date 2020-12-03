import type Koa from 'koa';
import Router from 'koa-router';
import path from 'path';
import type { Logger } from 'winston';

import { getDefaultExportsFromModules } from './utils';

const ROUTES_GLOB_PATTERN = '**/*.routes!(*.map)';

type routesInstaller = (rootRouter: Router) => void;

const load = async (): Promise<routesInstaller[]> => {
  const routerInstallers = await getDefaultExportsFromModules<routesInstaller>(
    path.join(__dirname, '../modules'),
    ROUTES_GLOB_PATTERN,
  );

  return routerInstallers;
};

export const installRoutes = async (
  app: Koa,
  logger: Logger,
): Promise<void> => {
  logger.info('Install routes');

  try {
    const router = new Router({ prefix: '/api' });

    const routerInstallers = await load();

    await Promise.all(
      routerInstallers.map(async (installer) => installer(router)),
    );

    app.use(router.routes());
    app.use(router.allowedMethods());
  } catch (err) {
    logger.error('Could not install routes:', err);
    throw err;
  }
};
