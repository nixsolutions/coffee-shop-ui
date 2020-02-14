import gql from 'graphql-tag';

const CUSTOMER_ADDRESS_CREATE = gql`
  mutation CUSTOMER_ADDRESS_CREATE($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerUserErrors {
        message
        code
        field
      }
    }
  }
`;

export default CUSTOMER_ADDRESS_CREATE;
