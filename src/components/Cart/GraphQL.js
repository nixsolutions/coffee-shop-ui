import gql from 'graphql-tag';

const CART_OPEN_QUERY = gql`
  query {
    isOpenCart @client
  }
`;

const CART_ITEM = gql`
  query {
    cartItems @client
  }
`;

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        descriptionHtml
        id
        images(first: 1) {
          edges {
            node {
              id
              src
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`;

export { CART_OPEN_QUERY, GET_PRODUCTS_BY_ID, CART_ITEM };
