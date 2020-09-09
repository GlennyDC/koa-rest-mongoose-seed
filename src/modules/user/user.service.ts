import { makeToken } from '../../global';
import { users } from './user.data';

export const getUserById = async (id: string) => {
  return users.find((user) => user.id === id);
};

export const getUserByEmail = async (email: string) => {
  return users.find((user) => user.email === email);
};

export const login = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) throw new Error('User not found');
  const jwt = makeToken({
    user: {
      id: user.id,
      roles: ['user', 'accountant'],
    },
  });

  return { user, accessToken: jwt };
};
