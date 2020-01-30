import React, { useState } from 'react';
import store from 'store';
import { useMutation } from '@apollo/react-hooks';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import CHECKOUT_SHIPPPING_ADRESS_UPDATE from './GraphQl';
import Spinner from '../Spinner';
import useStyles from './Styles';

export default function ShippingForm() {
  const classes = useStyles();
  const checkoutId = store.get('checkoutId');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('');
  const [zip, setZip] = useState('');
  const [checkoutShippingAddressUpdateV2, { loading }] = useMutation(
    CHECKOUT_SHIPPPING_ADRESS_UPDATE
  );

  const updateShippingCheckout = () => {
    checkoutShippingAddressUpdateV2({
      variables: {
        checkoutId,
        shippingAddress: {
          address1,
          city,
          country,
          firstName,
          lastName,
          phone,
          province,
          zip
        }
      }
    });
  };

  if (loading) return <Spinner />;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        updateShippingCheckout();
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Shipping address
      </Typography>
      <Grid container spacing={3} className={classes.formContainer}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            onChange={e => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            onChange={e => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="phone"
            onChange={e => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            onChange={e => setAddress1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            onChange={e => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            onChange={e => setProvince(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            onChange={e => setZip(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            onChange={e => setCountry(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Done
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
