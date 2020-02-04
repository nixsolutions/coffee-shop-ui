import React, { useState } from 'react';
import PropTypes from 'prop-types';
import store from 'store';
import { useMutation } from '@apollo/react-hooks';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import CHECKOUT_SHIPPPING_ADRESS_UPDATE from './GraphQl';
import { GET_CHECKOUT_ITEMS } from '../Cart/GraphQL';
import Spinner from '../Spinner';
import useStyles from './Styles';

export default function ShippingForm({ nextStep, checkoutData }) {
  const classes = useStyles();
  const checkoutId = store.get('checkoutId');
  const [formErrors, setFormErrors] = useState([]);
  const { node } = checkoutData;
  const [addressData, setAddressData] = useState(
    node.shippingAddress || {
      firstName: '',
      lastName: '',
      address1: '',
      city: '',
      country: '',
      phone: '',
      province: '',
      zip: ''
    }
  );

  const textFieldsParams = [
    {
      name: 'firstName',
      label: 'First name',
      value: addressData.firstName,
      gridSm: 6
    },
    {
      name: 'lastName',
      label: 'Last name',
      value: addressData.lastName,
      gridSm: 6
    },
    { name: 'phone', label: 'Phone', value: addressData.phone, gridSm: false },
    {
      name: 'address1',
      label: 'Address line',
      value: addressData.address1,
      gridSm: false
    },
    { name: 'city', label: 'City', value: addressData.city, gridSm: 6 },
    {
      name: 'province',
      label: 'State/Province/Region',
      value: addressData.province,
      gridSm: 6
    },
    {
      name: 'zip',
      label: 'Zip / Postal code',
      value: addressData.zip,
      gridSm: 6
    },
    { name: 'country', label: 'Country', value: addressData.country, gridSm: 6 }
  ];
  const [checkoutShippingAddressUpdateV2, { loading }] = useMutation(
    CHECKOUT_SHIPPPING_ADRESS_UPDATE,
    {
      onCompleted: data => {
        if (
          data.checkoutShippingAddressUpdateV2.checkoutUserErrors.length > 0
        ) {
          setFormErrors(
            data.checkoutShippingAddressUpdateV2.checkoutUserErrors
          );
        } else {
          nextStep();
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
  const handleChange = event => {
    const { value, name } = event.target;
    setAddressData({
      ...addressData,
      [name]: value
    });
  };

  const updateShippingCheckout = () => {
    const {
      address1,
      city,
      country,
      firstName,
      lastName,
      phone,
      province,
      zip
    } = addressData;
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
      {formErrors.map(err => (
        <Typography color="error" key={err.message}>
          {`*${err.message}`}
        </Typography>
      ))}
      <Grid container spacing={3} className={classes.formContainer}>
        {textFieldsParams.map(field => (
          <Grid item xs={12} sm={field.gridSm}>
            <TextField
              required
              defaultValue={field.name.value}
              id={field.name}
              name={field.name}
              label={field.label}
              fullWidth
              onChange={event => handleChange(event)}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Done
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

ShippingForm.propTypes = {
  checkoutData: PropTypes.objectOf(Object).isRequired,
  nextStep: PropTypes.func.isRequired
};
