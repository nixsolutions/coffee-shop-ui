import gql from 'graphql-tag';

const SIDE_BAR_QUERY = gql`
  query {
    isOpenSideBar @client
  }
`;

export default SIDE_BAR_QUERY;
