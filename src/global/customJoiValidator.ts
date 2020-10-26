import Joi from 'joi';
import mongoose from 'mongoose';

interface ExtendedStringSchema extends Joi.StringSchema {
  objectId(): this;
}

export interface ObjectIdJoi extends Joi.Root {
  string(): ExtendedStringSchema;
}

export const customJoi: ObjectIdJoi = Joi.extend((Joi) => {
  return {
    type: 'objectId',
    base: Joi.string(),
    messages: {
      objectId: '"{{#label}}" must be a valid objectId',
    },
    coerce(value, helpers) {
      return { value };
    },
    validate(value, helpers) {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        const errors = helpers.error('objectId');
        return { value, errors };
      }
    },
  };
});
