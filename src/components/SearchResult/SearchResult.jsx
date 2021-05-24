import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import useStyles from './Styles';
import noPhotoAvailable from '../../media/noPhotoAvailable.png';

export default function SearchResult({ products, searchLoading, called }) {
  const classes = useStyles();
  return (
    <>
      {searchLoading && called ? (
        <Spinner />
      ) : (
        <Grid container spacing={3} justify="center">
          {products &&
            products.edges.length > 0 &&
            products.edges.map(({ node }) => (
              <Grid item sm={6} xs={12} md={3} key={node.id}>
                <Card className={classes.card}>
                  <CardActionArea component={Link} to={`/shop/${node.id}`}>
                    <CardMedia
                      className={classes.media}
                      image={
                        node.images.edges.length !== 0
                          ? node.images.edges[0].node.originalSrc
                          : noPhotoAvailable
                      }
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography className={classes.cardName} variant="h5" noWrap>
                        {node.title}
                      </Typography>
                      <Typography align="center" variant="body2">
                        {`${node.variants.edges[0].node.priceV2.amount} ${node.variants.edges[0].node.priceV2.currencyCode}`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="secondary"
                      fullWidth
                      component={Link}
                      to={`/shop/${node.id}`}
                    >
                      More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
}

SearchResult.propTypes = {
  products: PropTypes.objectOf(Object).isRequired,
  searchLoading: PropTypes.bool.isRequired,
  called: PropTypes.bool.isRequired,
};
