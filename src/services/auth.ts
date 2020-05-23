import * as userService from './user';
import { makeToken } from '../core';

const login = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email);
  if (!user) throw new Error('User not found');
  const jwt = makeToken({
    userId: user.id,
    userRoles: ['user', 'accountant'],
  });

  return { user, token: jwt };
};

export { login };
