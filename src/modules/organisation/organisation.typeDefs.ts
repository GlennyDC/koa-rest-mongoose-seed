import { gql } from 'apollo-server-koa';

const organisationTypeDefs = gql`
  extend type Query {
    organisation(id: ID!): Organisation!
    organisations(
      offset: Int = 0
      limit: Int = 100
      order: SortOrganisationsInput
    ): [Organisation!]!
  }

  extend type Mutation {
    createOrganisation(organisation: CreateOrganisationInput!): Organisation!
  }

  extend type Location {
    organisation: Organisation!
  }

  type Organisation {
    id: ID!
    name: String!
  }

  input CreateOrganisationInput {
    name: String!
  }

  input SortOrganisationsInput {
    name: Sort
  }
`;

export default organisationTypeDefs;
