import gql from 'graphql-tag';

const GET_CUSTOMER = gql`
  query GET_CUSTOMER($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      addresses(first: 5) {
        edges {
          node {
            id
            firstName
            lastName
            address1
            city
            country
            phone
            zip
          }
        }
      }
    }
  }
`;

export default GET_CUSTOMER;
