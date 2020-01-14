import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './Styles';

export default function ProductAbout({ node }) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        {node.availableForSale ? (
          <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.availableForSale}
          >
            <Grid item>
              <CheckCircleOutline />
            </Grid>
            <Grid item>Are available</Grid>
          </Grid>
        ) : (
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
        <Typography variant="h4">{`Price: ${node.priceRange.maxVariantPrice.amount} ${node.priceRange.maxVariantPrice.currencyCode}`}</Typography>
        <Button
          fullWidth
          disabled={!node.availableForSale}
          variant="contained"
          color="secondary"
        >
          Add to cart
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{`Vendor: ${node.vendor}`}</Typography>
      </Grid>
    </Grid>
  );
}

ProductAbout.propTypes = {
  node: PropTypes.shape({
    availableForSale: PropTypes.bool.isRequired,
    vendor: PropTypes.string.isRequired,
    priceRange: PropTypes.objectOf({
      maxVariantPrice: PropTypes.object,
      minVariantPrice: PropTypes.object
    }).isRequired
  }).isRequired
};
