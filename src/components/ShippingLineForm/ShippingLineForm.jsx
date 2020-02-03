import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  Paper,
  FormControlLabel,
  Radio,
  Typography,
  Button
} from '@material-ui/core';
import store from 'store';
import Spinner from '../Spinner';
import { GET_CHECKOUT_SHIPPING_RATE, UPDATE_SHIPPING_LINE } from './GraphQl';
import { GET_CHECKOUT_ITEMS } from '../Cart/GraphQL';
import useStyles from './Styles';

export default function ShippingLineForm({ nextStep }) {
  const classes = useStyles();
  const checkoutId = store.get('checkoutId');
  const [shipping, setShipping] = useState('');

  const { data: { node } = {}, loading: queryLoading } = useQuery(
    GET_CHECKOUT_SHIPPING_RATE,
    {
      variables: {
        id: checkoutId
      }
    }
  );
  const [
    checkoutShippingLineUpdate,
    { loading: mutationLoading }
  ] = useMutation(UPDATE_SHIPPING_LINE, {
    refetchQueries: [
      {
        query: GET_CHECKOUT_ITEMS,
        variables: { id: checkoutId }
      }
    ],
    onCompleted: () => {
      nextStep();
    }
  });

  const updateShippingLine = () => {
    checkoutShippingLineUpdate({
      variables: {
        checkoutId,
        shippingRateHandle: shipping
      }
    });
  };

  if (queryLoading || mutationLoading) return <Spinner />;

  return (
    <Paper className={classes.shippingForm}>
      <Typography variant="h4" align="center">Available Shipping Rates</Typography>
      {node.availableShippingRates.shippingRates.map(variant => (
        <FormControlLabel
          key={variant.title}
          value={variant.handle}
          control={<Radio color="primary" />}
          label={variant.title}
          onChange={e => setShipping(e.target.value)}
        />
      ))}
      <Button
        color="primary"
        fullWidth
        disabled={shipping === ''}
        onClick={() => {
          updateShippingLine();
        }}
      >
        Complete
      </Button>
    </Paper>
  );
}

ShippingLineForm.propTypes = {
  nextStep: PropTypes.func.isRequired
};
