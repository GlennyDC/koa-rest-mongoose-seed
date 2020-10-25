import Joi from 'joi';

import { InputValidationError } from '../error';

/**
 * Validate a value against a Joi schema.
 *
 * @async
 *
 * @param {Record<string, any>} value - The value to be validated
 * @param {Joi.Schema} schema - The Joi schema to be validated against
 *
 * @throws {Joi.ValidationError} - Throws if the value is not valid
 *
 * @returns {Record<string, any>} - A Promise that resolves into the validated value when the value is valid
 */
const validateValueAgainstJoiSchema = async (
  value: Record<string, any>,
  schema: Joi.Schema,
): Promise<Record<string, any>> => {
  return schema.validateAsync(value, {
    abortEarly: false,
    presence: 'required',
  });
};

/**
 * Format a Joi error.
 *
 * @param {Joi.ValidationError} joiError - The Joi error to be formatted
 *
 * @returns {Record<string,string>} The formatted Joi error
 */
const formatJoiError = (
  joiError: Joi.ValidationError,
): Record<string, string> =>
  joiError.details.reduce(
    (acc: Record<string, string>, curr: Joi.ValidationErrorItem) => ({
      ...acc,
      [curr.path[0]]: curr.message, // Always display the root of the path of the validation error
    }),
    {},
  );

/**
 * Validate GraphQL arguments against a Joi schema.
 *
 * @async
 *
 * @param {Record<string, any>} args - The arguments to be validated
 * @param {Joi.Schema} schema - The Joi schema to be validated against
 *
 * @throws {InputValidationError} - Throws if the value is not valid
 *
 * @returns {Record<string, any>} - A Promise that resolves into the validated value when the value is valid
 */
export const validateArgs = async (
  args: Record<string, any>,
  schema: Joi.Schema,
): Promise<Record<string, any>> => {
  try {
    // TODO: Add silly logging
    return await validateValueAgainstJoiSchema(args, schema);
  } catch (err) {
    const validationErrors = formatJoiError(err);
    throw new InputValidationError(validationErrors);
  }
};
