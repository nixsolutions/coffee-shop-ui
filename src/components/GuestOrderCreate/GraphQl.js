import gql from 'graphql-tag';

const CHECKOUT_COMPLETE_FREE = gql`
  mutation CHECKOUT_COMPLETE_FREE($checkoutId: ID!) {
    checkoutCompleteFree(checkoutId: $checkoutId) {
      checkout {
        id
        order {
          id
        }
      }
      checkoutUserErrors {
        message
      }
    }
  }
`;

export default CHECKOUT_COMPLETE_FREE;
