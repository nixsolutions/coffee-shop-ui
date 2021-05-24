import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import CUSTOMER_UPDATE from './GraphQl';
import Spinner from '../Spinner';
import setCustomerToken from '../../helpers/setCustomerToken';
import useStyles from './Styles';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function CustomerUpdateForm({ customer, token }) {
  const classes = useStyles();
  const [formErrors, setFormErrors] = useState([]);
  const [customerUpdate, { loading, client }] = useMutation(CUSTOMER_UPDATE, {
    onCompleted: ({ customerUpdate: { customerAccessToken, customerUserErrors } }) => {
      if (customerUserErrors.length > 0) {
        setFormErrors(customerUserErrors);
      } else {
        setCustomerToken(client, customerAccessToken);
      }
    },
  });
  const { firstName, lastName, email, phone } = customer;
  const [userData, setUserData] = useState({
    firstName,
    lastName,
    email,
    phone,
  });

  const updateCustomerInfo = () => {
    customerUpdate({
      variables: {
        customerAccessToken: token,
        customer: userData,
      },
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleChangePhone = (event) => {
    setUserData({
      ...userData,
      ['phone']: event,
    });
  };
  if (loading) return <Spinner />;

  return (
    <div className={classes.formWrapper}>
      {formErrors.map((err) => (
        <Typography color="error" key={err.message}>
          {`*${err.message}`}
        </Typography>
      ))}
      <form onSubmit={() => updateCustomerInfo()}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              variant="filled"
              defaultValue={userData.firstName}
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              onChange={(event) => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="filled"
              defaultValue={userData.lastName}
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              onChange={(event) => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <PhoneInput value={userData.phone} onChange={(event) => handleChangePhone(event)} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              required
              defaultValue={userData.email}
              id="email"
              name="email"
              label="Email"
              fullWidth
              onChange={(event) => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="filled"
              id="password"
              name="password"
              type="password"
              label="Password"
              fullWidth
              onChange={(event) => handleChange(event)}
            />
          </Grid>
        </Grid>
        <Button
          className={classes.updateButton}
          variant="contained"
          color="secondary"
          type="submit"
        >
          Update
        </Button>
      </form>
    </div>
  );
}

CustomerUpdateForm.propTypes = {
  customer: PropTypes.objectOf(Object).isRequired,
  token: PropTypes.string.isRequired,
};
