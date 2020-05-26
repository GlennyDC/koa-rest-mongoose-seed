import { makeToken } from '../core';
import * as userService from './user';

const login = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email);
  if (!user) throw new Error('User not found');
  const jwt = makeToken({
    user: {
      id: user.id,
      roles: ['user', 'accountant'],
    },
  });

  return { user, accessToken: jwt };
};

export { login };
