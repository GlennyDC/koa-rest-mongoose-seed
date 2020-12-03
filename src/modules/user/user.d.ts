export interface Auth {
  accessToken: string;
  user: User;
}

export interface User {
  id: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface UpdateUserInput {
  emailAddress?: string;
  firstName?: string;
  lastName?: string;
}

export interface RegisterUserInput {
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
}
