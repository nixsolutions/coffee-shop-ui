import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import filter from 'lodash/filter';
import store from 'store';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import useStyles from './Styles';
import { GET_CHECKOUT_ID, CHECKOUT_LINE_ITEMS_REPLACE } from '../Shop/GraphQl';
import Spinner from '../Spinner';
import checkoutResolver from '../../helpers/checkoutResolver';
import noPhotoAvailable from '../../media/noPhotoAvailable.png';

export default function LineItem({ product, cartItemsQuery }) {
  const classes = useStyles();

  const {
    data: { checkoutId }
  } = useQuery(GET_CHECKOUT_ID);
  const [
    checkoutLineItemsReplace,
    { loading: checkoutReplaceLoad, client }
  ] = useMutation(CHECKOUT_LINE_ITEMS_REPLACE, {
    refetchQueries: [
      {
        query: cartItemsQuery,
        variables: { id: checkoutId }
      }
    ],
    onCompleted: data => {
      checkoutResolver(data, client);
    }
  });

  const removeFromCart = id => {
    const existingItemsCart = store.get('cartItems') || [];
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

  const updateQuantityProduct = (id, e) => {
    e.preventDefault();
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

  if (checkoutReplaceLoad) return <Spinner />;
  return (
    <>
      <ListItem dense button alignItems="flex-start">
        <ListItemAvatar>
          {product.variant.product.images.edges.length !== 0 ? (
            <Avatar
              alt={product.title}
              src={product.variant.product.images.edges[0].node.originalSrc}
            />
          ) : (
            <Avatar alt={product.title} src={noPhotoAvailable} />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={`${product.title} Price: ${product.quantity *
            product.variant.priceV2.amount}${
            product.variant.priceV2.currencyCode
          }`}
        />
        <ListItemSecondaryAction>
          <Grid container direction="row">
            <Grid item>
              <InputLabel className={classes.labelQuantiry}>
                <Input
                  type="number"
                  inputProps={{ min: '1' }}
                  defaultValue={product.quantity}
                  className={classes.quantityProduct}
                  onChange={e => updateQuantityProduct(product.variant.id, e)}
                />
              </InputLabel>
            </Grid>
            <Grid item>
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => removeFromCart(product.variant.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

LineItem.propTypes = {
  product: PropTypes.objectOf(Object).isRequired,
  cartItemsQuery: PropTypes.objectOf(Object).isRequired
};
