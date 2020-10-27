import Joi from 'joi';
import mongoose from 'mongoose';

interface ObjectIdStringSchema extends Joi.StringSchema {
  objectId(): this;
}

export interface CustomJoi extends Joi.Root {
  string(): ObjectIdStringSchema;
}

const extendJoiWithObjectIdValidator = (baseJoi: Joi.Root): CustomJoi =>
  baseJoi.extend({
    type: 'string',
    base: baseJoi.string(),
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

export const customJoi = extendJoiWithObjectIdValidator(Joi);
