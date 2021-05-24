import store from 'store';

const setCustomerToken = (client, customerAccessToken) => {
  store.set('customer', {
    token: customerAccessToken.accessToken,
    expDate: customerAccessToken.expiresAt,
  });
  client.writeData({
    data: { customerToken: customerAccessToken.accessToken },
  });
};

export default setCustomerToken;
