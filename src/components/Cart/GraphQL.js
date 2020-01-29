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

const GET_CHECKOUT_ITEMS = gql`
  query getCheckout($id: ID!) {
    node(id: $id) {
      ... on Checkout {
        id
        webUrl
        email
        totalPriceV2 {
          amount
        }
        totalTaxV2 {
          amount
        }
        subtotalPriceV2 {
          amount
        }
        shippingAddress {
          firstName
          lastName
          address1
          province
          country
          zip
        }
        shippingLine {
          title
          handle
        }
        lineItems(first: 10) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                priceV2 {
                  amount
                  currencyCode
                }
                product {
                  id
                  images(first: 1) {
                    edges {
                      node {
                        altText
                        originalSrc
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export { CART_OPEN_QUERY, GET_CHECKOUT_ITEMS, CART_ITEM };
