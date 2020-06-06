import Joi from '@hapi/joi';
import { UserInputError } from 'apollo-server-koa';

const joiErrorConverter = (joiErr: Joi.ValidationError) =>
  joiErr.details.reduce(
    (acc: any, curr: any) =>
      Object.assign({}, acc, {
        [curr.path]: curr.message,
      }),
    {},
  );

const validateArgs = async (args: any, schema: Joi.Schema): Promise<void> => {
  try {
    await schema.validateAsync(args, {
      abortEarly: false,
      presence: 'required',
    });
  } catch (err) {
    const validationErrors = joiErrorConverter(err);
    throw new UserInputError('Invalid arguments', {
      validationErrors,
    });
  }
};

export { validateArgs };
