import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import store from 'store';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URI
});
const middlewareLink = setContext(() => ({
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_API_TOKEN
  }
}));

const cache = new InMemoryCache();

cache.writeData({
  data: {
    isOpenSideBar: false,
    isOpenCart: false,
    cartItems: [],
    cartCounter: 0,
    customerToken:
      (store.get('customer') && store.get('customer').token) || null,
    customerTokenExpDate:
      (store.get('customer') && store.get('customer').expDate) || null
  }
});

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache
});

export default client;
