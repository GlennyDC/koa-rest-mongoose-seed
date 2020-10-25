import { gql } from 'apollo-server-koa';

const userTypeDefs = gql`
  extend type Query {
    viewer: User!
  }

  extend type Mutation {
    register(emailAddress: String!, password: String!): Auth!
    login(emailAddress: String!, password: String!): Auth!
    updateViewer(user: UpdateUserInput!): User!
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
