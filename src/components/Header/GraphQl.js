import gql from 'graphql-tag';

const GET_CART_ITEM_COUNT = gql`
  query {
    bucketItemsCount @client
  }
`;

export default GET_CART_ITEM_COUNT;
