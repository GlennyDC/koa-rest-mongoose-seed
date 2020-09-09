import { gql } from 'apollo-server-koa';

const userTypeDefs = gql`
  extend type Mutation {
    login(email: String!, password: String!): Auth
  }

  type User {
    id: ID!
    email: String!
    roles: [String!]!
  }

  type Auth {
    accessToken: String!
    user: User!
  }
`;

export default userTypeDefs;
