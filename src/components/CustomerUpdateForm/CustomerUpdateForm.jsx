import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import CUSTOMER_UPDATE from './GraphQl';
import Spinner from '../Spinner';
import setCustomerToken from '../../helpers/setCustomerToken';

export default function CustomerUpdateForm({ customer, token }) {
  const [formErrors, setFormErrors] = useState([]);
  const [customerUpdate, { loading, client }] = useMutation(CUSTOMER_UPDATE, {
    onCompleted: ({ customerUpdate: { customerAccessToken, customerUserErrors } }) => {
      if (customerUserErrors.length > 0) {
        setFormErrors(customerUserErrors);
      } else {
        setCustomerToken(client, customerAccessToken);
      }
    }
  });
  const { firstName, lastName, email, phone } = customer;
  const [userData, setUserData] = useState({
    firstName,
    lastName,
    email,
    phone
  });

  const updateCustomerInfo = () => {
    customerUpdate({
      variables: {
        customerAccessToken: token,
        customer: userData
      }
    });
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  if (loading) return <Spinner />;

  return (
    <>
      <Typography>User update</Typography>
      {formErrors.map(err => (
        <Typography color="error" key={err.message}>
          {`*${err.message}`}
        </Typography>
      ))}
      <form onSubmit={() => updateCustomerInfo()}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              defaultValue={userData.firstName}
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              onChange={event => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              defaultValue={userData.lastName}
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              onChange={event => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              defaultValue={userData.phone}
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              onChange={event => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              defaultValue={userData.email}
              id="email"
              name="email"
              label="Email"
              fullWidth
              onChange={event => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              type="password"
              label="Password"
              fullWidth
              onChange={event => handleChange(event)}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="secondary" type="submit">
          Update
        </Button>
      </form>
    </>
  );
}

CustomerUpdateForm.propTypes = {
  customer: PropTypes.objectOf(Object).isRequired,
  token: PropTypes.string.isRequired
};
