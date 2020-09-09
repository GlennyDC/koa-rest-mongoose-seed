export interface User {
  id: string;
  emailAddress: string;
  password: string;
  roles: string[];
}

export interface UserAuth {
  accessToken: string;
  user: User;
}
