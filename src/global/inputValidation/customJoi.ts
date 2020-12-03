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

export interface CustomJoi extends Joi.Root {
  string(): Joi.StringSchema & { objectId(): Joi.StringSchema };
}

export const customJoi: CustomJoi = extendJoiWithObjectIdValidator(Joi);
