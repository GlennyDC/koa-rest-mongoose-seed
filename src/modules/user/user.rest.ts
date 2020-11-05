import Router from '@koa/router';
import type Koa from 'koa';

import { createLogger } from '../../global';
import * as userService from './user.service';

const logger = createLogger('user-rest');

const getViewer = async (ctx: Koa.Context) => {
  logger.silly('Get viewer');
  ctx.body = 'Hello World!';
};

const installUserRoutes = (rootRouter: Router): void => {
  const router = new Router({ prefix: '/users' });
  router.get('/viewer', getViewer);
  rootRouter.use(router.routes());
};

export default installUserRoutes;
