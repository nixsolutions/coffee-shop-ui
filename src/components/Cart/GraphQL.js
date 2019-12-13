import gql from 'graphql-tag';

const CART_OPEN_QUERY = gql`
  query {
    isOpenCart @client
  }
`;

export default CART_OPEN_QUERY;
