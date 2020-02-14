import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LocalCafe from '@material-ui/icons/LocalCafe';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import SIDE_BAR_QUERY from './GraphQL';
import useStyles from './Styles';

export default function SideBar() {
  const classes = useStyles();
  const toggleDrawer = (client, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    client.writeData({ data: { isOpenSideBar: open } });
  };

  const sideList = client => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(client, false)}
      onKeyDown={toggleDrawer(client, false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <LocalCafe />
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/shop">
          <LocalCafe />
          <ListItemText primary="Shop" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const { data, client } = useQuery(SIDE_BAR_QUERY);
  return (
    <SwipeableDrawer
      open={data.isOpenSideBar}
      onClose={toggleDrawer(client, false)}
      onOpen={toggleDrawer(client, true)}
    >
      {sideList(client)}
    </SwipeableDrawer>
  );
}

export { SIDE_BAR_QUERY };
