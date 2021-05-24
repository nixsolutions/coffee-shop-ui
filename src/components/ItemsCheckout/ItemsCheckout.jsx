import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Badge,
  CardContent,
  Hidden,
} from '@material-ui/core';
import useStyles from './Styles';
import noPhotoAvailable from '../../media/noPhotoAvailable.png';

export default function ItemsCheckout({ data }) {
  const classes = useStyles();
  return (
    <Paper>
      <Typography align="center" variant="h4">
        Review item
      </Typography>
      {data.node.lineItems.edges &&
        data.node.lineItems.edges.map(({ node }) => (
          <CardActionArea key={node.title}>
            <Card className={classes.card}>
              <Hidden xsDown>
                {node.variant.product.images.edges.length !== 0 ? (
                  <Badge badgeContent={node.quantity} color="primary">
                    <CardMedia
                      className={classes.cardMedia}
                      image={node.variant.product.images.edges[0].node.originalSrc}
                      title={node.title}
                    />
                  </Badge>
                ) : (
                  <Badge badgeContent={node.quantity} color="primary">
                    <CardMedia
                      className={classes.cardMedia}
                      image={noPhotoAvailable}
                      title={node.title}
                    />
                  </Badge>
                )}
              </Hidden>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    {node.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {`Quantity: ${node.quantity}`}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {`Price: ${node.variant.priceV2.amount * node.quantity}`}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </CardActionArea>
        ))}
    </Paper>
  );
}

ItemsCheckout.propTypes = {
  data: PropTypes.objectOf(Object).isRequired,
};
