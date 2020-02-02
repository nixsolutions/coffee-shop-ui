import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import useStyles from './Styles';

export default function ProductRecomendation({ product }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea component={Link} to={`/shop/${product.id}`}>
        <CardMedia
          className={classes.media}
          image={product.images.edges[0].node.originalSrc}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography className={classes.cardName} variant="h5" component="h2">
            {product.title}
          </Typography>
          <Typography align="center" variant="body2">
            {`${product.variants.edges[0].node.priceV2.amount} ${product.variants.edges[0].node.priceV2.currencyCode}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="secondary"
          fullWidth
          component={Link}
          to={`/shop/${product.id}`}
        >
          More
        </Button>
      </CardActions>
    </Card>
  );
}

ProductRecomendation.propTypes = {
  product: PropTypes.objectOf(Object).isRequired
};
