import React from 'react';
import store from 'store';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import { CART_OPEN_QUERY, GET_PRODUCTS_BY_ID, CART_ITEM } from './GraphQL';
import useStyles from './Styles';

export default function Cart() {
  const classes = useStyles();
  const { data: { cartItems } = 0 } = useQuery(CART_ITEM);
  const productIds = store.get('ids');

  const toggleDrawer = (client, open) => event => {
    if (event && event.currentTarget.className === 'makeStyles-list-160') {
      return;
    }
    client.writeData({ data: { isOpenCart: open } });
  };

  const removeAllItem = client => {
    store.remove('ids');
    client.writeData({ data: { cartItems: [] } });
  };

  const sideList = (client, data) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(client, false)}
    >
      {productIds === undefined ? (
        <p>Clear</p>
      ) : (
        <>
          <List>
            <Typography variant="h5" align="center">
              Cart
            </Typography>
            {data &&
              data.nodes.map(node => (
                <ListItem dense button>
                  <ListItemAvatar>
                    <Avatar
                      alt={node.title}
                      src={node.images.edges[0].node.src}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={node.title} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
          <Divider />
          <Button
            fullWidth
            color="secondary"
            onClick={() => removeAllItem(client)}
          >
            Clear cart
          </Button>
        </>
      )}
    </div>
  );

  const { data: { isOpenCart } = false, client } = useQuery(CART_OPEN_QUERY);
  const { data, loading } = useQuery(GET_PRODUCTS_BY_ID, {
    variables: { ids: cartItems }
  });

  return (
    <SwipeableDrawer
      open={isOpenCart}
      onClose={toggleDrawer(client, false)}
      onOpen={toggleDrawer(client, true)}
      anchor="right"
    >
      {loading ? <p>Loading...</p> : sideList(client, data)}
    </SwipeableDrawer>
  );
}
