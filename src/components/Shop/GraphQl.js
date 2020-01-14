import gql from 'graphql-tag';

const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    products(first: 5) {
      edges {
        node {
          id
          title
          description
          availableForSale
          images(first: 2) {
            edges {
              node {
                id
                src
              }
            }
          }
        }
      }
    }
  }
`;

const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

export { GET_PRODUCTS, TOGGLE_CART };
