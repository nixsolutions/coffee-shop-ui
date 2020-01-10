import store from 'store';

const setCustomerToken = (client, customerAccessToken) => {
  client.writeData({
    data: { customerToken: customerAccessToken.accessToken }
  });
  store.set('customer', {
    token: customerAccessToken.accessToken,
    expDate: customerAccessToken.expiresAt
  });
};

export default setCustomerToken;
