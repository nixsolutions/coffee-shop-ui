import gql from 'graphql-tag';

const GET_CHECKOUT_SHIPPING_RATE = gql`
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
          handle
        }
        availableShippingRates {
          shippingRates {
            handle
            title
          }
        }
      }
    }
  }
`;

const UPDATE_SHIPPING_LINE = gql`
  mutation UPDATE_SHIPPING_LINE(
    $checkoutId: ID!
    $shippingRateHandle: String!
  ) {
    checkoutShippingLineUpdate(
      checkoutId: $checkoutId
      shippingRateHandle: $shippingRateHandle
    ) {
      checkout {
        shippingLine {
          handle
        }
      }
    }
  }
`;

export { GET_CHECKOUT_SHIPPING_RATE, UPDATE_SHIPPING_LINE };
