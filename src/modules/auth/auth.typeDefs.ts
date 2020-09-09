import { gql } from 'apollo-server-koa';

const authTypeDefs = gql`
  extend type Mutation {
    login(email: String!, password: String!): Auth
  }

  type Auth {
    accessToken: String!
    user: User!
  }
`;

export default authTypeDefs;
