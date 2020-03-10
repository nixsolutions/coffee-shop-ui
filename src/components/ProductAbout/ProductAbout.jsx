import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import sumBy from 'lodash/sumBy';
import store from 'store';
import { useMutation, useQuery } from '@apollo/react-hooks';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './Styles';
import Spinner from '../Spinner';
import LocationProductMap from '../LocationProductMap';
import { CREATE_CHECKOUT, CHECKOUT_LINE_ITEMS_REPLACE, GET_CHECKOUT_ID } from '../Shop/GraphQl';
import { GET_CHECKOUT_ITEMS } from '../Cart/GraphQL';
import checkoutResolver from '../../helpers/checkoutResolver';

export default function ProductAbout({ node }) {
  const classes = useStyles();
  const { data: { checkoutId } = {} } = useQuery(GET_CHECKOUT_ID);
  const [checkoutCreate, { loading: checkoutCreateLoad, client }] = useMutation(CREATE_CHECKOUT, {
    onCompleted: data => {
      const cartItems = data.checkoutCreate.checkout.lineItems.edges.map(({ node }) => ({
        variantId: node.variant.id,
        quantity: node.quantity
      }));
      store.set('checkoutId', data.checkoutCreate.checkout.id);
      store.set('cartItems', cartItems);
      client.writeData({
        data: {
          bucketItemsCount: sumBy(store.get('cartItems'), node => node.quantity),
          checkoutId: data.checkoutCreate.checkout.id
        }
      });
    }
  });
  const [checkoutLineItemsReplace, { loading: checkoutReplaceLoad }] = useMutation(
    CHECKOUT_LINE_ITEMS_REPLACE,
    {
      refetchQueries: [
        {
          query: GET_CHECKOUT_ITEMS,
          variables: { id: store.get('checkoutId') }
        }
      ],
      onCompleted: data => {
        checkoutResolver(data, client);
      }
    }
  );
  const addToCart = (id, count) => {
    const existingItemsCart = store.get('cartItems') || [];
    const existingItem = existingItemsCart.find(item => item.variantId === id);
    if (existingItem) {
      existingItem.quantity += count;
    } else {
      existingItemsCart.push({ variantId: id, quantity: count });
    }
    if (checkoutId === null) {
      checkoutCreate({
        variables: {
          input: {
            lineItems: existingItemsCart
          }
        }
      });
    } else {
      checkoutLineItemsReplace({
        variables: {
          checkoutId,
          lineItems: existingItemsCart
        }
      });
    }
  };
  if (checkoutCreateLoad || checkoutReplaceLoad) return <Spinner />;
  return (
    <Grid container className={classes.main}>
      <Grid item xs={12}>
        <Typography variant="h4">{node.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        {node.availableForSale ? null : (
          <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.notAvailableForSale}
          >
            <Grid item>
              <RemoveCircleOutline />
            </Grid>
            <Grid item>Not available</Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">{`Vendor: ${node.vendor}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        {node.descriptionHtml ? (
          <Typography variant="subtitle2">{parse(node.descriptionHtml)}</Typography>
        ) : null}
        <Typography
          align="center"
          variant="h6"
        >{`${node.priceRange.maxVariantPrice.amount} ${node.priceRange.maxVariantPrice.currencyCode}`}</Typography>
        <Button
          className={classes.byButton}
          disabled={!node.availableForSale}
          variant="contained"
          disableElevation
          onClick={() => addToCart(node.variants.edges[0].node.id, 1)}
        >
          Add to cart
        </Button>
      </Grid>
      <Grid item xs={12}>
        <LocationProductMap
          position={node.metafields.edges.length > 0 ? node.metafields.edges[0].node.value : null}
        />
      </Grid>
    </Grid>
  );
}

ProductAbout.propTypes = {
  node: PropTypes.objectOf(Object).isRequired
};
