import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Typography, Paper, Button } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import GET_ORDER from './GraphQl';
import Spinner from '../Spinner';
import ItemsCheckout from '../ItemsCheckout';
import useStyles from './Styles';

export default function GuestOrder({ match: { params } }) {
  const [lineItems, setLineItems] = useState({});
  const classes = useStyles();
  const { id } = params;
  const { data: { node } = {}, loading, refetch } = useQuery(GET_ORDER, {
    variables: {
      id
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      setLineItems(node.order.lineItems);
    }
  });

  if (loading) return <Spinner />;
  if (!node.order) {
    refetch();
  }

  return (
    <div>
      {!node.order ? (
        <Button onClick={() => refetch()}>Get order</Button>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <Paper>
              <Typography align="center" variant="h4">
                {`Order ${node.order.name}`}
              </Typography>
              <Paper className={classes.customerInformation}>
                <Typography variant="h6" align="center">
                  Customer information
                </Typography>
                <Typography variant="subtitle1">{`Full name: ${node.order.shippingAddress.name}`}</Typography>
                <Typography variant="subtitle1">{`Country: ${node.order.shippingAddress.country}`}</Typography>
                <Typography variant="subtitle1">{`Address: ${node.order.shippingAddress.address1}`}</Typography>
                <Typography variant="subtitle1">{`ZIP: ${node.order.shippingAddress.zip}`}</Typography>
                <Typography variant="subtitle1">{`Shipping method: ${node.shippingLine.title}`}</Typography>
              </Paper>
            </Paper>
            <ItemsCheckout data={{ node: { lineItems } }} />
            <Button color="primary" component={Link} to="/shop" variant="contained" fullWidth>
              Go to shop
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
GuestOrder.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired
};
