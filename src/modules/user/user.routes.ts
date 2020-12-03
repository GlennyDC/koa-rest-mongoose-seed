import type Koa from 'koa';
import Router from 'koa-router';

import { createLogger, handler } from '../../global';
import { User } from './user';
import * as userService from './user.service';

const logger = createLogger('user-rest');

const login = handler(
  null,
  async (ctx: Koa.Context): Promise<void> => {
    logger.silly('Login user');

    const {
      request: {
        body: { emailAddress, password },
      },
    } = ctx;

    const auth = await userService.loginUser(emailAddress, password);
    ctx.status = 200;
    ctx.body = auth;
  },
  { requireAuthentication: false },
);

const register = handler(
  null,
  async (ctx: Koa.Context): Promise<void> => {
    logger.silly('Get organisation');

    const {
      request: {
        body: { user },
      },
    } = ctx;

    const auth = await userService.registerUser(user);
    ctx.status = 200;
    ctx.body = auth;
  },
  { requireAuthentication: false },
);

const installUserRoutes = (rootRouter: Router): void => {
  const router = new Router({ prefix: '/users' });
  router.post('/login', login);
  router.patch('/register', register);
  rootRouter.use(router.routes());
};

export default installUserRoutes;
