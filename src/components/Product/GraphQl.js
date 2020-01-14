import gql from 'graphql-tag';

const GET_PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    node(id: $id) {
      ... on Product {
        id
        title
        description
        tags
        availableForSale
        descriptionHtml
        vendor
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              id
              src
            }
          }
        }
        metafields(first: 1) {
          edges {
            node {
              key
              value
              description
            }
          }
        }
      }
    }
  }
`;

export default GET_PRODUCT;
