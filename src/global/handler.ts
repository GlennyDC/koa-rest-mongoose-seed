import Joi from 'joi';

import { assertAuthenticated } from './auth';
import { validateArgs } from './inputValidation';

type ResolverFunction = (
  root: any,
  args: any,
  ctx: any,
  info: any,
) => Promise<any>;

type Options = {
  requireAuthentication?: boolean;
  requiredPermissions?: string[];
};

type SchemaMaker = ((Joi: Joi.Root) => Joi.Schema) | null;

export const handler = <T>(
  schemaMaker: SchemaMaker,
  f: T,
  providedOptions?: Options,
): T => {
  const defaultOptions = {
    requireAuthentication: true,
  };
  const options = { ...defaultOptions, ...providedOptions };

  const resolverFunction: ResolverFunction = async (root, args, ctx, info) => {
    console.log(options);
    if (options.requireAuthentication) {
      assertAuthenticated(ctx.koaCtx);
    }

    const schema = schemaMaker ? schemaMaker(Joi) : Joi.object({});

    const convertedValues = await validateArgs(args, schema);

    // eslint-disable-next-line
    // @ts-ignore
    return f(root, convertedValues, ctx, info);
  };

  return (resolverFunction as unknown) as T;
};
