import { User } from './user';

export const users: User[] = [
  {
    id: 'iduser1',
    emailAddress: 'glenny.de.cock@codifly.be',
    password: 'password1',
    roles: ['user'],
  },
  {
    id: 'iduser2',
    emailAddress: 'glenny.de.cock+test@codifly.be',
    password: 'password2',
    roles: ['user', 'accountant'],
  },
];
