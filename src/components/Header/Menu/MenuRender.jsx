import React from 'react';
import store from 'store';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

function MenuRender({ anchorEl, isMenuOpen, handleMenuClose, history }) {
  const customerLogOut = () => {
    store.remove('customer');
    history.push('/');
  };
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {store.get('customer') === undefined ? (
        <div>
          <MenuItem
            onClick={handleMenuClose}
            component={Link}
            to="/customer/sign_in"
          >
            SignIn
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            component={Link}
            to="/customer/sign_up"
          >
            SignUp
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={customerLogOut}>LogOut</MenuItem>
        </div>
      )}
    </Menu>
  );
}

MenuRender.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  anchorEl: PropTypes.string.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  handleMenuClose: PropTypes.func.isRequired
};

export default withRouter(MenuRender);
