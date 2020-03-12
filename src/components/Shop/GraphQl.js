import gql from 'graphql-tag';

const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    products(first: 100) {
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
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

const CREATE_CHECKOUT = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkoutUserErrors {
        message
        field
      }
      checkout {
        id
        lineItems(first: 10) {
          edges {
            node {
              id
              quantity
              variant {
                id
              }
            }
          }
        }
      }
    }
  }
`;

const GET_CHECKOUT_ID = gql`
  query checkoutId {
    checkoutId @client
  }
`;

const CHECKOUT_LINE_ITEMS_REPLACE = gql`
  mutation checkoutLineItemsReplace($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsReplace(checkoutId: $checkoutId, lineItems: $lineItems) {
      userErrors {
        code
        field
        message
      }
      checkout {
        id
        lineItems(first: 10) {
          edges {
            node {
              id
              quantity
              variant {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export { GET_PRODUCTS, CREATE_CHECKOUT, GET_CHECKOUT_ID, CHECKOUT_LINE_ITEMS_REPLACE };
