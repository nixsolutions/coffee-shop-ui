import gql from 'graphql-tag';

const CUSTOMER_ADDRESS_UPDATE = gql`
  mutation CUSTOMER_ADDRESS_UPDATE(
    $customerAccessToken: String!
    $address: MailingAddressInput!
    $id: ID!
  ) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, address: $address, id: $id) {
      customerUserErrors {
        message
        code
        field
      }
    }
  }
`;

export default CUSTOMER_ADDRESS_UPDATE;
