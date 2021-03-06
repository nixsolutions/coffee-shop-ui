import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

export default function MobileMenuRender({
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
  client,
  handleProfileMenuOpen,
  bucketItemsCount,
}) {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => client.writeData({ data: { isOpenCart: true } })}>
        <IconButton color="inherit">
          <Badge badgeContent={bucketItemsCount} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
}

MobileMenuRender.propTypes = {
  mobileMoreAnchorEl: PropTypes.objectOf.isRequired,
  isMobileMenuOpen: PropTypes.bool.isRequired,
  handleMobileMenuClose: PropTypes.func.isRequired,
  handleProfileMenuOpen: PropTypes.func.isRequired,
  client: PropTypes.objectOf.isRequired,
  bucketItemsCount: PropTypes.number.isRequired,
};
