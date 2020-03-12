import React from 'react';
import store from 'store';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CART_OPEN_QUERY, GET_CHECKOUT_ITEMS } from './GraphQL';
import useStyles from './Styles';
import Spinner from '../Spinner';
import LineItem from '../LineItem';
import SplitButtonCheckout from '../SplitButtonCheckout';
import { CHECKOUT_LINE_ITEMS_REPLACE, GET_CHECKOUT_ID } from '../Shop/GraphQl';
import { Link } from 'react-router-dom';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

export default function Cart() {
  const classes = useStyles();
  const cartId = store.get('checkoutId');
  const customer = store.get('customer');
  const { data: { isOpenCart } = false, client } = useQuery(CART_OPEN_QUERY);
  const { data: { checkoutId } = {} } = useQuery(GET_CHECKOUT_ID);
  const { data, loading } = useQuery(GET_CHECKOUT_ITEMS, {
    variables: { id: cartId }
  });
  const [checkoutLineItemsReplace, { loading: checkoutReplaceLoad }] = useMutation(
    CHECKOUT_LINE_ITEMS_REPLACE,
    {
      onCompleted: () => {
        client.writeData({ data: { bucketItemsCount: 0 } });
      },
      refetchQueries: [
        {
          query: GET_CHECKOUT_ITEMS,
          variables: { id: checkoutId }
        }
      ]
    }
  );

  const toggleDrawer = open => event => {
    if (event && event.currentTarget.id === 'cart') {
      return;
    }
    client.writeData({ data: { isOpenCart: open } });
  };

  const removeAllItem = () => {
    checkoutLineItemsReplace({
      variables: {
        checkoutId,
        lineItems: []
      }
    });
    store.set('cartItems', []);
  };

  const sideList = () => (
    <div id="cart" className={classes.list} role="presentation" onClick={toggleDrawer(false)}>
      <>
        <List>
          <Typography variant="h5" align="center">
            Shopping cart
          </Typography>
          {data &&
            data.node.lineItems.edges.map(({ node }) => (
              <LineItem key={node.id} product={node} cartItemsQuery={GET_CHECKOUT_ITEMS} />
            ))}
        </List>
        <Divider />
        {data && data.node.lineItems.edges.length > 0 ? (
          <>
            <Button variant="contained" fullWidth color="secondary" onClick={() => removeAllItem()}>
              Clear cart
            </Button>
            {customer ? (
              <Button
                fullWidth
                variant="contained"
                component={Link}
                className={classes.checkoutButton}
                to={`/customer/order/new/${cartId}`}
                onClick={toggleDrawer(false)}
              >
                Go to checkout
              </Button>
            ) : (
              <SplitButtonCheckout />
            )}
          </>
        ) : (
          <>
            <Typography align="center" variant="h6">
              Cart is empty
            </Typography>
            <Typography align="center">
              <RemoveShoppingCartIcon className={classes.emptyCart} />
            </Typography>
          </>
        )}
      </>
    </div>
  );

  return (
    <SwipeableDrawer
      open={isOpenCart}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      anchor="right"
    >
      {loading || checkoutReplaceLoad ? <Spinner /> : sideList(client)}
    </SwipeableDrawer>
  );
}
