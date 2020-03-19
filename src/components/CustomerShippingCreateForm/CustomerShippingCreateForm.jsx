import React, { useState } from 'react';
import store from 'store';
import { useMutation } from '@apollo/react-hooks';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import CUSTOMER_ADDRESS_CREATE from './GraphQl';
import Spinner from '../Spinner';
import useStyles from './Styles';
import GET_CUSTOMER from '../CustomerProfile/GraphQl';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function CustomerShippingCreateForm() {
  const { token } = store.get('customer');
  const classes = useStyles();
  const [formErrors, setFormErrors] = useState([]);
  const [shippingData, setShippingData] = useState({});

  const textFieldsParams = [
    {
      name: 'firstName',
      label: 'First name',
      gridSm: 6
    },
    {
      name: 'lastName',
      label: 'Last name',
      gridSm: 6
    },
    {
      name: 'address1',
      label: 'Address line',
      gridSm: false
    },
    { name: 'city', label: 'City', gridSm: 6 },
    {
      name: 'province',
      label: 'State/Province/Region',
      gridSm: 6
    },
    {
      name: 'zip',
      label: 'Zip / Postal code',
      gridSm: 6
    },
    { name: 'country', label: 'Country', gridSm: 6 }
  ];
  const [customerAddressCreate, { loading }] = useMutation(CUSTOMER_ADDRESS_CREATE, {
    onCompleted: data => {
      if (data.customerAddressCreate.customerUserErrors.length > 0) {
        setFormErrors(data.customerAddressCreate.customerUserErrors);
      }
    },
    refetchQueries: [
      {
        query: GET_CUSTOMER,
        variables: { customerAccessToken: token, first: 3 }
      }
    ]
  });
  const handleChange = event => {
    const { value, name } = event.target;
    setShippingData({
      ...shippingData,
      [name]: value
    });
  };

  const handleChangePhone = event => {
    setShippingData({
      ...shippingData,
      ['phone']: event
    });
  };

  const createShippingCustomer = () => {
    customerAddressCreate({
      variables: {
        customerAccessToken: token,
        address: shippingData
      }
    });
  };

  if (loading) return <Spinner />;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        createShippingCustomer();
      }}
    >
      {formErrors.map(err => (
        <Typography color="error" key={err.message}>
          {`*${err.message}`}
        </Typography>
      ))}
      <Grid container spacing={3} className={classes.formContainer}>
        {textFieldsParams.map(field => (
          <Grid item xs={12} sm={field.gridSm} key={field.name}>
            <TextField
              required
              defaultValue={field.name.value}
              id={`${field.name}Create`}
              name={field.name}
              label={field.label}
              fullWidth
              onChange={event => handleChange(event)}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <PhoneInput onChange={event => handleChangePhone(event)} />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Add address
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
