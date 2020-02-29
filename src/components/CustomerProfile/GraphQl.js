import gql from 'graphql-tag';

const GET_CUSTOMER = gql`
  query GET_CUSTOMER($customerAccessToken: String!, $first: Int!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      orders(first: $first) {
        edges {
          node {
            id
            name
            email
            processedAt
            totalPriceV2 {
              amount
            }
            shippingAddress {
              id
              country
              city
              firstName
              lastName
              phone
              zip
              address1
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                }
              }
            }
          }
        }
      }
      addresses(first: 10) {
        edges {
          node {
            id
            firstName
            lastName
            address1
            city
            province
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
