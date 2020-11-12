import Joi from 'joi';
import mongoose from 'mongoose';

type ObjectIdValidator = {
  string(): Joi.StringSchema & { objectId(): Joi.StringSchema };
};

const extendJoiWithObjectIdValidator = <T extends Joi.Root>(
  joiToExtend: T,
): T & ObjectIdValidator =>
  joiToExtend.extend({
    type: 'string',
    base: joiToExtend.string(),
    messages: {
      'string.objectId': '{{#label}} must be a valid id',
    },
    rules: {
      objectId: {
        validate: (value, helpers): string => {
          if (mongoose.Types.ObjectId.isValid(value)) {
            return value;
          } else {
            return helpers.error('string.objectId');
          }
        },
      },
    },
  });

type OrderValidator = {
  order(...validOrderFields: string[]): Joi.ArraySchema;
};

const extendJoiWithOrderValidator = <T extends Joi.Root>(
  joiToExtend: T,
): T & OrderValidator =>
  joiToExtend.extend({
    type: 'order',
    base: joiToExtend.array().min(1),
    args: (schema, ...validOrderFields) => {
      // Types are wrong, see
      // https://github.com/sideway/joi/issues/2511
      // eslint-disable-next-line
      // @ts-ignore
      return schema.items(
        Joi.object({
          field: Joi.string().valid(...validOrderFields),
          sort: Joi.string().lowercase().valid('asc', 'desc'),
        }),
      );
    },
  });

export interface CustomJoi extends Joi.Root {
  string(): Joi.StringSchema & { objectId(): Joi.StringSchema };
  order(...validOrderFields: string[]): Joi.ArraySchema;
}

export const customJoi: CustomJoi = extendJoiWithOrderValidator(
  extendJoiWithObjectIdValidator(Joi),
);
