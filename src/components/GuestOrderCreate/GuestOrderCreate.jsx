import React, { useState } from 'react';
import store from 'store';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Paper, Typography, Button, Divider } from '@material-ui/core';
import { GET_CHECKOUT_ITEMS } from '../Cart/GraphQL';
import Spinner from '../Spinner';
import useStyles from './Styles';
import ItemsCheckout from '../ItemsCheckout';
import CHECKOUT_COMPLETE_FREE from './GraphQl';
import StepperCompletedCheckout from '../StepperCompletedCheckout';

function GuestOrderCreate({ history }) {
  const [errors, setErrors] = useState([]);
  const classes = useStyles();
  const checkoutId = store.get('checkoutId');

  const { data, loading, client } = useQuery(GET_CHECKOUT_ITEMS, {
    variables: {
      id: checkoutId
    }
  });

  const [checkoutCompleteFree, { loading: loadCheckoutComplete }] = useMutation(
    CHECKOUT_COMPLETE_FREE,
    {
      onCompleted: ({ checkoutCompleteFree: { checkoutUserErrors, checkout } }) => {
        const hasError = checkoutUserErrors.length > 0;
        if (hasError) {
          setErrors(checkoutUserErrors);
        } else {
          store.remove('checkoutId');
          store.remove('cartItems');
          client.writeData({ data: { bucketItemsCount: 0, checkoutId: null } });
          history.push(`/order/${checkout.id}`);
        }
      },
      refetchQueries: [
        {
          query: GET_CHECKOUT_ITEMS,
          variables: { id: checkoutId }
        }
      ]
    }
  );

  const completeFree = () => {
    checkoutCompleteFree({
      variables: {
        checkoutId
      }
    });
  };

  if (loading || loadCheckoutComplete) return <Spinner />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <ItemsCheckout data={data} />
        <StepperCompletedCheckout data={data} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.orderInfo}>
          {data.node.shippingLine !== null ? (
            <Typography variant="subtitle1">{`Shipping: ${data.node.shippingLine.title}`}</Typography>
          ) : null}
          {data.node.email !== null ? (
            <Typography variant="subtitle1">{`Customer email: ${data.node.email}`}</Typography>
          ) : null}
          {data.node.shippingAddress !== null ? (
            <Paper>
              <Typography variant="subtitle1">{`First name: ${data.node.shippingAddress.firstName}`}</Typography>
              <Typography variant="subtitle1">{`Last name: ${data.node.shippingAddress.lastName}`}</Typography>
              <Typography variant="subtitle1">{`Country: ${data.node.shippingAddress.country}`}</Typography>
              <Typography variant="subtitle1">{`Address: ${data.node.shippingAddress.address1}`}</Typography>
              <Typography variant="subtitle1">{`ZIP: ${data.node.shippingAddress.zip}`}</Typography>
            </Paper>
          ) : null}
          <Typography variant="subtitle1">{`Total price: ${data.node.totalPriceV2.amount}`}</Typography>
          <Typography variant="subtitle1">{`Total quantity: ${data.node.totalPriceV2.amount}`}</Typography>
          <Divider />
          <Button
            color="primary"
            disabled={data.node.shippingLine === null}
            fullWidth
            onClick={() => completeFree()}
          >
            <Typography variant="h5" align="center">
              Confirm and pay
            </Typography>
          </Button>
          {errors.length > 0 &&
            errors.map(err => (
              <Typography className={classes.error} key={err.message}>
                {`*${err.message}`}
              </Typography>
            ))}
        </Paper>
      </Grid>
    </Grid>
  );
}

GuestOrderCreate.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default withRouter(GuestOrderCreate);
