import { gql } from 'apollo-server-koa';

const userTypeDefs = gql`
  extend type Mutation {
    register(emailAddress: String!, password: String!): Auth!
    login(emailAddress: String!, password: String!): Auth!
  }

  type Auth {
    accessToken: String!
    user: User!
  }

  type User {
    id: ID!
    emailAddress: String!
    roles: [String!]!
  }
`;

export default userTypeDefs;
