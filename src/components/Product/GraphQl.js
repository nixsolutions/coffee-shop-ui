import gql from 'graphql-tag';

const GET_PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    node(id: $id) {
      ... on Product {
        id
        title
        description
        tags
        images(first: 5) {
          edges {
            node {
              id
              src
            }
          }
        }
      }
    }
  }
`;

export default GET_PRODUCT;
