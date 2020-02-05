import gql from 'graphql-tag';

const CUSTOMER_UPDATE = gql`
  mutation CUSTOMER_UPDATE(
    $customerAccessToken: String!
    $customer: CustomerUpdateInput!
  ) {
    customerUpdate(
      customer: $customer
      customerAccessToken: $customerAccessToken
    ) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        message
        code
        field
      }
    }
  }
`;

export default CUSTOMER_UPDATE;
