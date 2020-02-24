import React, { useState } from 'react';
import store from 'store';
import { Grid, Typography, Paper, Button, Divider } from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import GET_CUSTOMER from './GraphQl';
import Spinner from '../Spinner';
import { GET_CHECKOUT_ITEMS } from '../Cart/GraphQL';
import ItemsCheckout from '../ItemsCheckout';
import StepperCompletedCheckout from '../StepperCompletedCheckout';
import CHECKOUT_COMPLETE_FREE from '../GuestOrderCreate/GraphQl';
import useStyles from './Styles';

export default function CustomerOrderCreate({ match: { params }, history }) {
  const { cartId } = params;
  const classes = useStyles();
  const customerToken = store.get('customer').token;
  const checkoutId = store.get('checkoutId');
  const [errors, setErrors] = useState([]);
  const { data, loading } = useQuery(GET_CUSTOMER, {
    variables: {
      customerAccessToken: customerToken
    }
  });
  const { data: { node } = {}, loading: getItemsLoad } = useQuery(GET_CHECKOUT_ITEMS, {
    variables: {
      id: cartId
    }
  });

  const [checkoutCompleteFree, { loading: loadCheckoutComplete, client }] = useMutation(
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

  if (loading || getItemsLoad || loadCheckoutComplete) return <Spinner />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <ItemsCheckout data={{ node }} />
        <StepperCompletedCheckout data={{ node }} customerData={{ data }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.orderInfo}>
          {node.shippingLine !== null ? (
            <Typography variant="subtitle1">{`Shipping: ${node.shippingLine.title}`}</Typography>
          ) : null}
          {node.email !== null ? (
            <Typography variant="subtitle1">{`Customer email: ${node.email}`}</Typography>
          ) : null}
          {node.shippingAddress !== null ? (
            <Paper>
              <Typography variant="subtitle1">{`First name: ${node.shippingAddress.firstName}`}</Typography>
              <Typography variant="subtitle1">{`Last name: ${node.shippingAddress.lastName}`}</Typography>
              <Typography variant="subtitle1">{`Country: ${node.shippingAddress.country}`}</Typography>
              <Typography variant="subtitle1">{`Address: ${node.shippingAddress.address1}`}</Typography>
              <Typography variant="subtitle1">{`ZIP: ${node.shippingAddress.zip}`}</Typography>
            </Paper>
          ) : null}
          <Typography variant="subtitle1">{`Total price: ${node.totalPriceV2.amount}`}</Typography>
          <Typography variant="subtitle1">{`Total quantity: ${node.totalPriceV2.amount}`}</Typography>
          <Divider />
          <Button
            color="primary"
            disabled={node.shippingLine === null}
            fullWidth
            onClick={() => completeFree()}
          >
            <Typography variant="h5" align="center">
              Confirm and pay (free)
            </Typography>
          </Button>
          {errors.map(err => (
            <Typography color="error" key={err.message}>
              {`*${err.message}`}
            </Typography>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
}
