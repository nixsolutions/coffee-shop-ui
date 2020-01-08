import gql from 'graphql-tag';

const GET_CART_ITEM = gql`
  query {
    cartItems @client
  }
`;

export default GET_CART_ITEM;
