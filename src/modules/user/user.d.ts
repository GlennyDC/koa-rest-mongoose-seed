export interface Auth {
  accessToken: string;
  user: User;
}

export interface User {
  id: string;
  emailAddress: string;
  password: string;
  roles: string[];
}
