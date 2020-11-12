import bcrypt from 'bcrypt';

const NUMBER_OF_SALT_ROUNDS = 12;

export const hashString = async (string: string): Promise<string> => {
  try {
    return await bcrypt.hash(string, NUMBER_OF_SALT_ROUNDS);
  } catch (err) {
    // TODO: log err
    console.log(err);
    throw err;
  }
};

export const compareStringToHash = async (
  string: string,
  hash: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compare(string, hash);
  } catch (err) {
    // TODO: log err
    console.log(err);
    throw err;
  }
};
