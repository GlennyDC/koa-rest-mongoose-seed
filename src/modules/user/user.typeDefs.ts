import { gql } from 'apollo-server-koa';

const userTypeDefs = gql`
  extend type Mutation {
    register(emailAddress: String!, password: String!): Auth!
    login(emailAddress: String!, password: String!): Auth!
    updateUser(id: ID!, user: UpdateUserInput!): User!
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

  input UpdateUserInput {
    emailAddress: String
    password: String
  }
`;

export default userTypeDefs;
