import { gql } from 'apollo-server-koa';

const capsuleTypeDefs = gql`
  extend type Query {
    capsules(
      limit: Int = 50
      offset: Int = 0
      order: String = "id"
      sort: Sort = ASC
    ): [Capsule!]!
    capsule(id: ID!): Capsule!
  }

  type Capsule {
    id: ID!
    landings: Int!
    status: String!
    originalLaunch: String!
    type: String!
    reuseCount: Int!
  }
`;

export default capsuleTypeDefs;
