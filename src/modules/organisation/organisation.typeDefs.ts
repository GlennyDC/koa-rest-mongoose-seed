import { gql } from 'apollo-server-koa';

const organisationTypeDefs = gql`
  extend type Query {
    organisation(id: ID!): Organisation!
    organisations(offset: Int = 0, limit: Int = 100): [Organisation!]!
  }

  extend type Mutation {
    createOrganisation(organisation: CreateOrganisationInput!): Organisation!
  }

  type Organisation {
    id: ID!
    name: String!
  }

  input CreateOrganisationInput {
    name: String!
  }
`;

export default organisationTypeDefs;
