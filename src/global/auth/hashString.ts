import bcrypt from 'bcryptjs';

// TODO: Find a way to store global constants that don't change
// in dirrent environments, so not in the environment
const NUMBER_OF_SALT_ROUNDS = 12;

export const hashString = async (string: string): Promise<string> => {
  return await bcrypt.hash(string, NUMBER_OF_SALT_ROUNDS);
};

export const compareStringToHash = async (
  string: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(string, hash);
};
