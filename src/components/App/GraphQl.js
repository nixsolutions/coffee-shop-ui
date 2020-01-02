import gql from 'graphql-tag';

const GET_TOKEN = gql`
  query userToken {
    userToken
  }
`;

export default GET_TOKEN;
