import { gql } from 'apollo-server-koa';

const bookTypeDefs = gql`
  extend type Query {
    book(id: ID!): Book!
    books(limit: Int): [Book!]!
  }

  extend type Author {
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
  }
`;

export default bookTypeDefs;
