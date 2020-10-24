import { customAlphabet } from 'nanoid/non-secure';

export const generateSemiUniqueId = (): string => {
  // TODO: Use async nanoid + can we place this in global scope?
  const nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    10,
  );

  return nanoid();
};
