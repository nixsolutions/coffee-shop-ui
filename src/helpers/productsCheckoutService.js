import store from 'store';
import filter from 'lodash/filter';

const updateQuantityProduct = (id, e, checkoutLineItemsReplace) => {
  e.preventDefault();
  const checkoutId = store.get('checkoutId');
  const existingItemsCart = store.get('cartItems') || [];
  const existingItem = existingItemsCart.find(item => item.variantId === id);
  if (existingItem) {
    existingItem.quantity = parseInt(e.target.value, 10);
  }
  checkoutLineItemsReplace({
    variables: {
      checkoutId,
      lineItems: existingItemsCart
    }
  });
  store.set('cartItems', existingItemsCart);
};

const removeFromCart = (id, checkoutLineItemsReplace) => {
  const existingItemsCart = store.get('cartItems') || [];
  const checkoutId = store.get('checkoutId');
  const firteredItems = filter(existingItemsCart, item => {
    return item.variantId !== id;
  });
  checkoutLineItemsReplace({
    variables: {
      checkoutId,
      lineItems: firteredItems
    }
  });
  store.set('cartItems', firteredItems);
};

export { updateQuantityProduct, removeFromCart };
