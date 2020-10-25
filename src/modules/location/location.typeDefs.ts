import { gql } from 'apollo-server-koa';

const locationTypeDefs = gql`
  extend type Organisation {
    location(id: ID!): Location!
    locations(offset: Int = 0, limit: Int = 100): [Location!]!
  }

  extend type Mutation {
    createLocation(
      organisationId: ID!
      location: CreateLocationInput!
    ): Location!
  }

  type Location {
    id: ID!
    name: String!
  }

  input CreateLocationInput {
    name: String!
  }
`;

export default locationTypeDefs;
