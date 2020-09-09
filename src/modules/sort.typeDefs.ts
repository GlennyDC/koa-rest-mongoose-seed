import { gql } from 'apollo-server-koa';

const sortTypeDefs = gql`
  enum Sort {
    ASC
    DESC
  }
`;

export default sortTypeDefs;
