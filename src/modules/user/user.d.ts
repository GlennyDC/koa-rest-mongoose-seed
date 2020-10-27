export interface Auth {
  accessToken: string;
  user: User;
}

export interface User {
  id: string;
  emailAddress: string;
  roles: string[];
}

export interface UpdateUserInput {
  emailAddress?: string;
  password?: string;
}
