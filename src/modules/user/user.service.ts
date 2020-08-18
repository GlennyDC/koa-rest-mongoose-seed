import { users } from './user.data';

const getUserById = async (id: string) => {
  return users.find((user) => user.id === id);
};

const getUserByEmail = async (email: string) => {
  return users.find((user) => user.email === email);
};

export { getUserById, getUserByEmail };
