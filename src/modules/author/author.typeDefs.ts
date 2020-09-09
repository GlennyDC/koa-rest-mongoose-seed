import { gql } from 'apollo-server-koa';

const authorTypeDefs = gql`
  extend type Book {
    authors: [Author!]!
  }

  extend type Query {
    authors(limit: Int): [Author!]!
  }

  type Author {
    id: ID!
    name: String!
    age: Int!
  }
`;

export default authorTypeDefs;
