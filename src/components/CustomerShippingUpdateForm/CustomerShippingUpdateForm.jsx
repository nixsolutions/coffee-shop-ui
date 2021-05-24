import React, { useState } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import { useMutation } from '@apollo/react-hooks';
import {
  FormControl,
  InputLabel,
  NativeSelect,
  FormHelperText,
  Grid,
  Button,
  FilledInput,
  Typography,
} from '@material-ui/core';
import Spinner from '../Spinner';
import GET_CUSTOMER from '../CustomerProfile/GraphQl';
import CUSTOMER_ADDRESS_UPDATE from './GraphQl';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function CustomerShippingUpdateForm({ currentAddresses, token }) {
  const [currentAddress, setCurrentAddress] = useState(currentAddresses.edges[0].node);
  const [formErrors, setFormErrors] = useState([]);

  const [customerAddressUpdate, { loading }] = useMutation(CUSTOMER_ADDRESS_UPDATE, {
    onCompleted: (data) => {
      if (data.customerAddressUpdate.customerUserErrors.length > 0) {
        setFormErrors(data.customerAddressUpdate.customerUserErrors);
      }
    },
    refetchQueries: [
      {
        query: GET_CUSTOMER,
        variables: { customerAccessToken: token, first: 3 },
      },
    ],
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const formAddress = find(currentAddresses.edges, ({ node }) => node.id === value).node;

    setCurrentAddress({ ...currentAddress, ...formAddress });
  };

  const updateFormAddress = (event) => {
    const { value, name } = event.target;
    setCurrentAddress({ ...currentAddress, [name]: value });
  };

  const handleChangePhone = (event) => {
    setCurrentAddress({
      ...currentAddress,
      ['phone']: event,
    });
  };

  const handleSubmit = () => {
    const { id, firstName, lastName, phone, zip, province, city, country, address1 } =
      currentAddress;
    customerAddressUpdate({
      variables: {
        id,
        customerAccessToken: token,
        address: {
          firstName,
          lastName,
          phone,
          zip,
          province,
          city,
          country,
          address1,
        },
      },
    });
  };

  if (loading) return <Spinner />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <FormControl fullWidth>
        <InputLabel htmlFor="age-native-helper">Addresses</InputLabel>
        <NativeSelect
          onChange={(event) => handleChange(event)}
          inputProps={{
            name: 'adresses',
            id: 'adresses-native-helper',
          }}
        >
          {currentAddresses.edges.map(({ node }) => (
            <option value={node.id} key={node.id}>
              {`${node.address1} / ${node.city} / ${node.country}`}
            </option>
          ))}
        </NativeSelect>
        <FormHelperText>Some important helper text</FormHelperText>
      </FormControl>
      {formErrors.map((err) => (
        <Typography color="error" key={err.message}>
          {`*${err.message}`}
        </Typography>
      ))}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="firstNameUpdate">First Name</InputLabel>
            <FilledInput
              fullWidth
              id="firstNameUpdate"
              name="firstName"
              value={currentAddress.firstName}
              onChange={updateFormAddress}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="lastNameUpdate">Last Name</InputLabel>
            <FilledInput
              id="lastNameUpdate"
              name="lastName"
              value={currentAddress.lastName}
              onChange={updateFormAddress}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="zipUpdate">ZIP Code</InputLabel>
            <FilledInput
              id="zipUpdate"
              name="zip"
              value={currentAddress.zip}
              onChange={updateFormAddress}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="updateAdsress1">Address</InputLabel>
            <FilledInput
              id="updateAdsress1"
              name="address1"
              value={currentAddress.address1}
              onChange={updateFormAddress}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="updateCity">City</InputLabel>
            <FilledInput
              id="updateCity"
              name="city"
              value={currentAddress.city}
              onChange={updateFormAddress}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="updateProvince">State/Province/Region</InputLabel>
            <FilledInput
              id="updateProvince"
              name="province"
              value={currentAddress.province}
              onChange={updateFormAddress}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="updateCountry">Country</InputLabel>
            <FilledInput
              id="updateCountry"
              name="country"
              value={currentAddress.country}
              onChange={updateFormAddress}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <PhoneInput value={currentAddress.phone} onChange={(event) => handleChangePhone(event)} />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Update
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

CustomerShippingUpdateForm.propTypes = {
  currentAddresses: PropTypes.objectOf(Object).isRequired,
  token: PropTypes.string.isRequired,
};
