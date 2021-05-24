import store from 'store';
import sumBy from 'lodash/sumBy';

const checkoutResolver = (data, client) => {
  const cartItems = data.checkoutLineItemsReplace.checkout.lineItems.edges.map(({ node }) => ({
    variantId: node.variant.id,
    quantity: node.quantity,
  }));
  store.set('cartItems', cartItems);
  client.writeData({
    data: {
      bucketItemsCount: sumBy(store.get('cartItems'), (node) => node.quantity),
    },
  });
};

export default checkoutResolver;
