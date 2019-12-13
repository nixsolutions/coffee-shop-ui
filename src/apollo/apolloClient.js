import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'https://graphql.myshopify.com/api/graphql'
});

const middlewareLink = setContext(() => ({
  headers: {
    'X-Shopify-Storefront-Access-Token': 'dd4d4dc146542ba7763305d71d1b3d38'
  }
}));

const cache = new InMemoryCache();

cache.writeData({
  data: {
    isOpenSideBar: false,
    isOpenCart: false
  }
});

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache
});

export default client;
