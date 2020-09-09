import { gql } from 'apollo-server-koa';

const categoryTypeDefs = gql`
  extend type Book {
    categories: [Category!]!
  }

  type Category {
    id: ID!
    title: String!
    isFun: Boolean!
  }
`;

export default categoryTypeDefs;
