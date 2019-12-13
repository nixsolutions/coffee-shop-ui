import React from 'react';
import { useQuery } from '@apollo/react-hooks';
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
import GET_PRODUCTS from './GraphQl';
import ImageSlider from '../ImageSlider';

export default function Shop() {
  const classes = useStyles();
  const { loading, error, data: { shop } = {} } = useQuery(GET_PRODUCTS);
  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error</p>;

  return (
    <div className={classes.root}>
      <Grid container>
        {shop.products.edges.map(({ node }) => (
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
                <CardMedia className={classes.media} component="div">
                  <ImageSlider images={node.images.edges} />
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {node.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button fullWidth color="secondary">
                  Add
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
    </div>
  );
}
