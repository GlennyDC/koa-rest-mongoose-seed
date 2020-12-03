import type Koa from 'koa';
import Router from 'koa-router';

import { createLogger, handler } from '../../global';
import { Organisation } from './organisation';
import * as organisationService from './organisation.service';

const logger = createLogger('user-rest');

const getOrganisationById = handler(
  null,
  async (ctx: Koa.Context): Promise<void> => {
    logger.silly('Get organisation');

    const {
      params: { id },
    } = ctx;

    const organisation = await organisationService.getOrganisationById(id);
    ctx.status = 200;
    ctx.body = organisation;
  },
  { requireAuthentication: false },
);

// TODO: this
const getOrganisationsByIds = async (ctx: Koa.Context): Promise<void> => {
  logger.silly('Get organisations');

  ctx.status = 200;
  ctx.body = 'organisations';
};

const getOrganisationsOfViewer = handler(
  null,
  async (ctx: Koa.Context): Promise<void> => {
    logger.silly('Get organisations');

    const organisations = await organisationService.getOrganisationsOfUser(
      'JNKJNKJN',
      0,
      10,
    );

    ctx.status = 200;
    ctx.body = 'organisations';
  },
  { requireAuthentication: false },
);

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
