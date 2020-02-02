import gql from 'graphql-tag';

const GET_PRODUCTS_HOME = gql`
  query GET_PRODUCTS_HOME {
    products(first: 4) {
      edges {
        node {
          id
          title
          description
          variants(first: 1) {
            edges {
              node {
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
          images(first: 1) {
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
`;

export default GET_PRODUCTS_HOME;
