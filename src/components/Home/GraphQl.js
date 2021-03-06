import gql from 'graphql-tag';

const GET_PRODUCTS_HOME = gql`
  query GET_PRODUCTS_HOME {
    products(first: 4, sortKey: BEST_SELLING) {
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

const GET_SEARCH_RESULT = gql`
  query GET_SEARCH_RESULT($query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: 10, query: $query, sortKey: $sortKey, reverse: $reverse) {
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

export { GET_PRODUCTS_HOME, GET_SEARCH_RESULT };
