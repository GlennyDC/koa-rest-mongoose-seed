import Joi from 'joi';

import { assertAuthenticated } from './auth';
import { validateArgs } from './inputValidation';

const defaultResolverFunctionOptions = {
  requireAuthentication: true,
};

type ResolverFunction = (
  root: any,
  args: any,
  ctx: any,
  info: any,
) => Promise<any>;

export const handler = <T>(
  schema: Joi.Schema | null,
  f: T,
  options = defaultResolverFunctionOptions,
): T => {
  const resolverFunction: ResolverFunction = async (root, args, ctx, info) => {
    if (options.requireAuthentication) {
      assertAuthenticated(ctx.koaCtx);
    }

    await validateArgs(args, schema || Joi.object({}));

    // eslint-disable-next-line
    // @ts-ignore
    return f(root, args, ctx, info);
  };

  return (resolverFunction as unknown) as T;
};
