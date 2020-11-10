import Joi from 'joi';

import { assertAuthenticated } from './auth';
import { validateArgs, customJoi, CustomJoi } from './inputValidation';

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

type SchemaMaker = ((Joi: CustomJoi) => Joi.Schema) | null;

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
    if (options.requireAuthentication) {
      assertAuthenticated(ctx.koaCtx);
    }

    const schema = schemaMaker ? schemaMaker(customJoi) : customJoi.object({});

    const convertedValues = await validateArgs(args, schema);

    // TODO: get rid of null prototype
    // eslint-disable-next-line
    // @ts-ignore
    return f(root, JSON.parse(JSON.stringify(convertedValues)), ctx, info);
  };

  return (resolverFunction as unknown) as T;
};
