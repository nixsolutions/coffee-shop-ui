import gql from 'graphql-tag';

const CHECKOUT_SHIPPPING_ADRESS_UPDATE = gql`
  mutation checkoutShippingAddressUpdateV2(
    $shippingAddress: MailingAddressInput!
    $checkoutId: ID!
  ) {
    checkoutShippingAddressUpdateV2(shippingAddress: $shippingAddress, checkoutId: $checkoutId) {
      checkoutUserErrors {
        field
        message
      }
      checkout {
        id
        shippingAddress {
          firstName
          lastName
          address1
          province
          country
          zip
        }
      }
    }
  }
`;

export default CHECKOUT_SHIPPPING_ADRESS_UPDATE;
