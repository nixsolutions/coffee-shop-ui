import gql from 'graphql-tag';

const UPDATE_CHECKOUT_EMAIL = gql`
  mutation checkoutEmailUpdateV2($checkoutId: ID!, $email: String!) {
    checkoutEmailUpdateV2(checkoutId: $checkoutId, email: $email) {
      checkout {
        id
        email
      }
      checkoutUserErrors {
        message
        code
        field
      }
    }
  }
`;

export default UPDATE_CHECKOUT_EMAIL;
