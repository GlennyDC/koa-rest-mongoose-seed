import Joi from 'joi';
import type Koa from 'koa';

import { assertAuthenticated } from './auth';
import { customJoi, CustomJoi } from './inputValidation';

type Options = {
  requireAuthentication?: boolean;
  requiredPermissions?: string[];
};

type SchemaMaker = ((joi: CustomJoi) => Joi.Schema) | null;

type RouteFunction = (ctx: Koa.Context) => Promise<void>;

export const handler = <T>(
  schemaMaker: SchemaMaker,
  f: T,
  providedOptions?: Options,
): T => {
  const defaultOptions = {
    requireAuthentication: true,
  };
  const options = { ...defaultOptions, ...providedOptions };

  const routeFunction: RouteFunction = async (ctx) => {
    if (options.requireAuthentication) {
      assertAuthenticated(ctx);
    }

    const schema = schemaMaker ? schemaMaker(customJoi) : customJoi.object({});

    // eslint-disable-next-line
      // @ts-ignore
    await f(ctx);
  };

  return (routeFunction as unknown) as T;
};
