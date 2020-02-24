import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, TextField, Button, Typography } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import store from 'store';
import Spinner from '../Spinner';
import UPDATE_CHECKOUT_EMAIL from './GraphQl';
import { GET_CHECKOUT_ITEMS } from '../Cart/GraphQL';

export default function CheckoutEmailForm({ nextStep, checkoutData, customerEmail }) {
  const id = store.get('checkoutId');

  const [email, setEmail] = useState(checkoutData.node.email || customerEmail || '');
  const [formErrors, setFormErrors] = useState([]);
  const [checkoutEmailUpdateV2, { loading }] = useMutation(UPDATE_CHECKOUT_EMAIL, {
    refetchQueries: [
      {
        query: GET_CHECKOUT_ITEMS,
        variables: { id }
      }
    ],
    onCompleted: data => {
      if (data.checkoutEmailUpdateV2.checkoutUserErrors.length > 0) {
        setFormErrors(data.checkoutEmailUpdateV2.checkoutUserErrors);
      } else {
        nextStep();
      }
    }
  });
  const updateEmail = () => {
    checkoutEmailUpdateV2({
      variables: {
        checkoutId: id,
        email
      }
    });
  };

  if (loading) return <Spinner />;

  return (
    <Paper>
      <form
        onSubmit={e => {
          e.preventDefault();
          updateEmail();
        }}
      >
        <Typography align="center" variant="h5">
          Contact information
        </Typography>
        {formErrors.map(err => (
          <Typography color="error" key={err.message}>
            {`*${err.message}`}
          </Typography>
        ))}
        <TextField
          required
          defaultValue={email}
          id="email"
          name="email"
          label="Email"
          fullWidth
          autoComplete="email"
          onChange={e => setEmail(e.target.value)}
        />
        <Button fullWidth color="primary" variant="contained" type="submit">
          Set email
        </Button>
      </form>
    </Paper>
  );
}

CheckoutEmailForm.propTypes = {
  checkoutData: PropTypes.objectOf(Object).isRequired,
  nextStep: PropTypes.func.isRequired
};
