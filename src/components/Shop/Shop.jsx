import React from 'react';
import sumBy from 'lodash/sumBy';
import { useQuery, useMutation } from '@apollo/react-hooks';
import store from 'store';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useStyles from './Styles';
import Spinner from '../Spinner';
import {
  GET_PRODUCTS,
  CREATE_CHECKOUT,
  GET_CHECKOUT_ID,
  CHECKOUT_LINE_ITEMS_REPLACE
} from './GraphQl';
import { GET_CHECKOUT_ITEMS } from '../Cart/GraphQL';
import checkoutResolver from '../../helpers/checkoutResolver';
import noPhotoAvailable from '../../media/noPhotoAvailable.png';

export default function Shop() {
  const classes = useStyles();
  const {
    data: { checkoutId }
  } = useQuery(GET_CHECKOUT_ID);
  const { loading, data: { products } = {} } = useQuery(GET_PRODUCTS);

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

  if (loading) return <Spinner />;

  return (
    <Grid container className={classes.root} spacing={2} justify="center" direction="row">
      {products.edges.map(({ node }) => (
        <Grid item xs={12} lg={3} md={6} className={classes.cardContainer} key={node.id}>
          <Card className={classes.card}>
            <CardActionArea component={Link} to={`/shop/${node.id}`}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="250"
                image={
                  node.images.edges.length !== 0 ? node.images.edges[0].node.src : noPhotoAvailable
                }
                title={node.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {node.title}
                </Typography>
                <Typography noWrap variant="body2" color="textSecondary" component="p">
                  {node.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {node.availableForSale ? (
                <Button
                  fullWidth
                  disabled={checkoutCreateLoad || checkoutReplaceLoad}
                  color="secondary"
                  onClick={() => addToCart(node.variants.edges[0].node.id, 1)}
                >
                  Add To Cart
                </Button>
              ) : (
                <Button fullWidth disabled>
                  Sold out
                </Button>
              )}
              <Button fullWidth color="primary" component={Link} to={`/shop/${node.id}`}>
                More info
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
