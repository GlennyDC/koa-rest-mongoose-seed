import { gql } from 'apollo-server-koa';

const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    roles: [String!]!
  }
`;

export default userTypeDefs;
