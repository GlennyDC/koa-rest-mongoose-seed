import type Koa from 'koa';
import Router from 'koa-router';

import { createLogger } from '../../global';
import { Organisation } from './organisation';
import * as organisationService from './organisation.service';

const logger = createLogger('user-rest');

const getOrganisationById = async (ctx: Koa.Context): Promise<void> => {
  logger.silly('Get organisation');

  ctx.status = 200;
  ctx.body = 'organisation';
};

// TODO: this
const getOrganisationsByIds = async (ctx: Koa.Context): Promise<void> => {
  logger.silly('Get organisations');

  ctx.status = 200;
  ctx.body = 'organisations';
};

const getOrganisationsOfViewer = async (ctx: Koa.Context): Promise<void> => {
  logger.silly('Get organisations');
  console.log(ctx);
  console.log(ctx.params);

  ctx.status = 200;
  ctx.body = 'organisations';
};

const createOrganisationForViewer = async (ctx: Koa.Context): Promise<void> => {
  logger.silly('Create organisation');
  ctx.body = 'Hello World!';

  ctx.status = 200;
  ctx.body = 'organisation';
};

const updateOrganisation = async (ctx: Koa.Context): Promise<void> => {
  logger.silly('Update organisation');
  ctx.body = 'Hello World!';

  ctx.status = 200;
  ctx.body = 'organisation';
};

const installOrganisationRoutes = (rootRouter: Router): void => {
  const router = new Router({ prefix: '/organisations' });
  router.get('/', getOrganisationsOfViewer);
  router.get('/:id', getOrganisationById);
  router.post('/', createOrganisationForViewer);
  router.patch('/:id', updateOrganisation);
  rootRouter.use(router.routes());
};

export default installOrganisationRoutes;
