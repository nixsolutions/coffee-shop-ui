import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import store from 'store';
import { Typography, Grid, Tab, AppBar, Tabs, Box } from '@material-ui/core';
import GET_CUSTOMER from './GraphQl';
import Spinner from '../Spinner';
import CustomerUpdateForm from '../CustomerUpdateForm';
import CustomerShippingCreateForm from '../CustomerShippingCreateForm';
import CustomerShippingUpdateForm from '../CustomerShippingUpdateForm';
import useStyles from './Styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function CustomerProfile() {
  const { token } = store.get('customer');
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const { data: { customer } = {}, loading } = useQuery(GET_CUSTOMER, {
    variables: { customerAccessToken: token }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Typography align="center" variant="h2">
        Profile
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <CustomerUpdateForm customer={customer} token={token} />
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            Add or update sipping address
          </Typography>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={value} centered onChange={handleChange} aria-label="shipping tabs">
                <Tab label="Create sipping address" {...a11yProps(0)} />
                <Tab
                  label="Update sipping address"
                  disabled={!customer.addresses.edges.length > 0}
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <CustomerShippingCreateForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <CustomerShippingUpdateForm currentAddresses={customer.addresses} token={token} />
            </TabPanel>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
