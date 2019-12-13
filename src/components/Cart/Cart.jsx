import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import CART_OPEN_QUERY from './GraphQL';
import useStyles from './Styles';

export default function Cart() {
  const classes = useStyles();
  const toggleDrawer = (client, open) => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    client.writeData({ data: { isOpenCart: open } });
  };

  const sideList = client => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(client, false)}
      onKeyDown={toggleDrawer(client, false)}
    >
      <List>
        <Typography variant="h5" align="center">
          Cart
        </Typography>
        <ListItem button component={Link} to="/shop">
          <ListItemText primary="Items cart" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const { data, client } = useQuery(CART_OPEN_QUERY);
  return (
    <SwipeableDrawer
      open={data.isOpenCart}
      onClose={toggleDrawer(client, false)}
      onOpen={toggleDrawer(client, true)}
      anchor="right"
    >
      {sideList(client)}
    </SwipeableDrawer>
  );
}
