interface TokenPayload {
  user: {
    id: string;
    roles: string[];
  };
}

export { TokenPayload };
