import gql from 'graphql-tag';

const GET_ORDER = gql`
  query getOrderInfo($id: ID!) {
    node(id: $id) {
      ... on Checkout {
        id
        shippingLine {
          title
        }
        order {
          id
          email
          phone
          name
          orderNumber
          statusUrl
          totalPriceV2 {
            amount
          }
          shippingAddress {
            name
            address1
            city
            country
            zip
          }
          lineItems(first: 10) {
            edges {
              node {
                title
                quantity
                variant {
                  priceV2 {
                    amount
                  }
                  product {
                    images(first: 5) {
                      edges {
                        node {
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
  }
`;

export default GET_ORDER;
