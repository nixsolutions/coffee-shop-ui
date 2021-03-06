import React, { useState } from 'react';
import sumBy from 'lodash/sumBy';
import first from 'lodash/first';
import uniqBy from 'lodash/uniqBy';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import store from 'store';
import { last } from 'lodash';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useStyles from './Styles';
import Spinner from '../Spinner';
import {
  GET_PRODUCTS,
  CREATE_CHECKOUT,
  GET_CHECKOUT_ID,
  CHECKOUT_LINE_ITEMS_REPLACE,
} from './GraphQl';
import { GET_CHECKOUT_ITEMS } from '../Cart/GraphQL';
import checkoutResolver from '../../helpers/checkoutResolver';
import noPhotoAvailable from '../../media/noPhotoAvailable.png';

export default function Shop() {
  const classes = useStyles();
  const [listProducts, setListProducts] = useState(null);
  const [lastCursor, setLastCursor] = useState(null);
  const [lastPage, setLastPage] = useState(false);
  const [itemsPerPage] = useState(5);
  const {
    data: { checkoutId },
  } = useQuery(GET_CHECKOUT_ID);
  const { loading, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      first: itemsPerPage,
    },
    onCompleted: (data) => {
      setListProducts(data.products);
      setLastCursor(last(data.products.edges).cursor);
      setLastPage(!data.products.pageInfo.hasNextPage);
    },
  });
  const [getOrderedProduct, { loading: loadingOrderProduct }] = useLazyQuery(GET_PRODUCTS, {
    onCompleted: (data) => {
      setListProducts(data.products);
      setLastCursor(last(data.products.edges).cursor);
      setLastPage(!data.products.pageInfo.hasNextPage);
    },
  });

  const [checkoutCreate, { loading: checkoutCreateLoad, client }] = useMutation(CREATE_CHECKOUT, {
    onCompleted: (data) => {
      const cartItems = data.checkoutCreate.checkout.lineItems.edges.map(({ node }) => ({
        variantId: node.variant.id,
        quantity: node.quantity,
      }));
      store.set('checkoutId', data.checkoutCreate.checkout.id);
      store.set('cartItems', cartItems);
      client.writeData({
        data: {
          bucketItemsCount: sumBy(store.get('cartItems'), (node) => node.quantity),
          checkoutId: data.checkoutCreate.checkout.id,
        },
      });
    },
  });
  const [checkoutLineItemsReplace, { loading: checkoutReplaceLoad }] = useMutation(
    CHECKOUT_LINE_ITEMS_REPLACE,
    {
      refetchQueries: [
        {
          query: GET_CHECKOUT_ITEMS,
          variables: { id: store.get('checkoutId') },
        },
      ],
      onCompleted: (data) => {
        checkoutResolver(data, client);
      },
    }
  );

  const addToCart = (id, count) => {
    const existingItemsCart = store.get('cartItems') || [];
    const existingItem = existingItemsCart.find((item) => item.variantId === id);
    if (existingItem) {
      existingItem.quantity += count;
    } else {
      existingItemsCart.push({ variantId: id, quantity: count });
    }
    if (checkoutId === null) {
      checkoutCreate({
        variables: {
          input: {
            lineItems: existingItemsCart,
          },
        },
      });
    } else {
      checkoutLineItemsReplace({
        variables: {
          checkoutId,
          lineItems: existingItemsCart,
        },
      });
    }
  };

  const onLoadMore = () => {
    fetchMore({
      variables: {
        after: lastCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.products.edges.length < 0) return listProducts;
        if (!fetchMoreResult.products.pageInfo.hasNextPage) {
          setLastPage(true);
        }
        setLastCursor(last(fetchMoreResult.products.edges).cursor);
        setListProducts(
          Object.assign({}, listProducts, {
            edges: uniqBy([...listProducts.edges, ...fetchMoreResult.products.edges], 'cursor'),
          })
        );
      },
    });
  };

  const changeOrder = (value) => {
    const isSimple = value.split(',').length === 1;
    if (isSimple) {
      getOrderedProduct({ variables: { first: itemsPerPage, sortKey: value } });
    } else {
      const currentSortKey = first(value.split(','));
      getOrderedProduct({
        variables: { first: itemsPerPage, sortKey: currentSortKey, reverse: true },
      });
    }
  };

  if (loading || loadingOrderProduct) return <Spinner />;
  return (
    <Grid container className={classes.root} justify="center" alignContent="center">
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Sort by</InputLabel>
          <Select labelId="select-label" id="dselect" onChange={(e) => changeOrder(e.target.value)}>
            <MenuItem value={'TITLE'}>Title A-Z</MenuItem>
            <MenuItem value={'TITLE,true'}>Title Z-A</MenuItem>
            <MenuItem value={'PRICE'}>Price (lowest first)</MenuItem>
            <MenuItem value={'PRICE,true'}>Price (highest first)</MenuItem>
            <MenuItem value={'RELEVANCE'}>Relevance</MenuItem>
            <MenuItem value={'BEST_SELLING'}>Best selling</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {listProducts &&
        listProducts.edges.map(({ node }) => (
          <Grid item xs={12} lg={3} md={6} className={classes.cardContainer} key={node.id}>
            <Card className={classes.card}>
              <CardActionArea component={Link} to={`/shop/${node.id}`}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="250"
                  image={
                    node.images.edges.length !== 0
                      ? node.images.edges[0].node.src
                      : noPhotoAvailable
                  }
                  title={node.title}
                />
                <CardContent>
                  <Typography noWrap variant="h6">
                    {node.title}
                  </Typography>
                  <Typography noWrap variant="body2" color="textSecondary" component="p">
                    {node.description}
                  </Typography>
                  <Typography variant="body2" color="secondary" align="center">
                    {`${node.priceRange.maxVariantPrice.amount} ${node.priceRange.maxVariantPrice.currencyCode}`}
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
      <div className={classes.fabContainer}>
        <Fab
          variant="extended"
          color="default"
          onClick={() => onLoadMore()}
          disabled={lastPage}
          className={classes.scrollDown}
        >
          <ArrowDownwardIcon />
        </Fab>
      </div>
    </Grid>
  );
}
