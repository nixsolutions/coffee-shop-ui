import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import store from 'store';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useStyles from './Styles';
import Spinner from '../Spinner';
import { GET_PRODUCTS } from './GraphQl';

export default function Shop() {
  const classes = useStyles();
  const [productsIds, setProductsIds] = useState(store.get('ids') || []);
  const { loading, data: { products } = {}, client } = useQuery(GET_PRODUCTS);

  const addToCart = id => {
    const listProducts = store.get('ids') || [];
    setProductsIds([...listProducts, id]);
  };

  useEffect(() => {
    store.set('ids', productsIds);
    client.writeData({ data: { cartItems: productsIds } });
  }, [client, productsIds]);

  if (loading) return <Spinner />;

  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
      justify="center"
      direction="row"
    >
      {products.edges.map(({ node }) => (
        <Grid
          item
          xs={12}
          lg={3}
          md={6}
          className={classes.cardContainer}
          key={node.id}
        >
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="250"
                image={node.images.edges[0].node.src}
                title={node.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {node.title}
                </Typography>
                <Typography
                  noWrap
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {node.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                fullWidth
                color="secondary"
                onClick={() => addToCart(node.id)}
              >
                Add To Cart
              </Button>
              <Button
                fullWidth
                color="primary"
                component={Link}
                to={`/shop/${node.id}`}
              >
                More info
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
