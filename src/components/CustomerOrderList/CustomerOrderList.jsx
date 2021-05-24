import React from 'react';
import PropTypes from 'prop-types';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import {
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import useStyles from './Styles';

export default function CustomerOrderList({ orders, refetch, setStep, step }) {
  const classes = useStyles();
  const onRefetch = (event) => {
    setStep(event.target.value);
    refetch();
  };
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Show last:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={step}
          onChange={(event) => onRefetch(event)}
        >
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
      {orders &&
        orders.map(({ node }) => (
          <Paper key={node.id} className={classes.paperWrapper}>
            <Grid container>
              <Grid item xs={12} className={classes.orderName}>
                <Typography variant="h6" align="center">
                  {node.name}
                </Typography>
              </Grid>
              <Grid item lg={6} xs={12} className={classes.orderInfo}>
                <Typography variant="subtitle2">
                  <AlternateEmailIcon />
                  {node.email}
                </Typography>
                <Typography variant="subtitle2">
                  <CalendarTodayIcon />
                  {Date(node.processedAt)}
                </Typography>
                <List>
                  <Typography variant="h6">Items:</Typography>
                  {node.lineItems.edges.map(({ node }) => (
                    <ListItem key={node.title}>
                      <ListItemText
                        primary={`Title: ${node.title}`}
                        secondary={`Quantity: ${node.quantity}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item lg={6} xs={12}>
                <Paper className={classes.shippingInfo}>
                  <Typography variant="h6">Shipping info:</Typography>
                  <Typography variant="subtitle2">
                    First name: {node.shippingAddress.firstName}
                  </Typography>
                  <Typography variant="subtitle2">
                    Last name: {node.shippingAddress.lastName}
                  </Typography>
                  <Typography variant="subtitle2">Phone: {node.shippingAddress.phone}</Typography>
                  <Typography variant="subtitle2">
                    Country: {node.shippingAddress.country}
                  </Typography>
                  <Typography variant="subtitle2">City: {node.shippingAddress.city}</Typography>
                  <Typography variant="subtitle2">ZIP: {node.shippingAddress.zip}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        ))}
    </div>
  );
}

CustomerOrderList.propTypes = {
  orders: PropTypes.objectOf(Object).isRequired,
  refetch: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};
