export interface TokenPayload {
  user: {
    id: string;
    roles: string[];
  };
}
