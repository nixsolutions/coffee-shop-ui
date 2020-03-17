import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { AppBar, Toolbar, IconButton, Typography, Badge, Grid } from '@material-ui/core/';
import { AccountCircle, ShoppingCart, MoreVert as MoreIcon } from '@material-ui/icons/';
import useStyles from './Styles';
import SideBar from '../SideBar';
import Cart from '../Cart';
import client from '../../apollo/apolloClient';
import GET_CART_ITEM_COUNT from './GraphQl';
import MobileMenuRender from './MobileMenu';
import MenuRender from './Menu';
import Logo from '../../media/logo.png';

function Header() {
  const classes = useStyles();
  const { data } = useQuery(GET_CART_ITEM_COUNT);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const menuId = 'primary-search-account-menu';

  return (
    <div className={classes.grow}>
      <AppBar className={classes.header}>
        <Toolbar>
          <Typography component={Link} to="/" className={classes.title}>
            <img src={Logo} alt="" />
          </Typography>
          <Grid container spacing={1} className={classes.menuContainer}>
            <Grid item xs={5} className={classes.menuItem} component={Link} to="/">
              <Typography variant="h6" align="center">
                Home
              </Typography>
            </Grid>
            <Grid item xs={5} className={classes.menuItem} component={Link} to="/shop">
              <Typography variant="h6" align="center">
                Shop
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              color="inherit"
              onClick={() => client.writeData({ data: { isOpenCart: true } })}
            >
              <Badge badgeContent={data.bucketItemsCount} color="secondary">
                <ShoppingCart className={classes.iconHeader} />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle className={classes.iconHeader} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon className={classes.iconHeader} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <SideBar />
      <Cart />
      <MobileMenuRender
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        client={client}
        bucketItemsCount={data.bucketItemsCount}
        handleProfileMenuOpen={handleProfileMenuOpen}
      />
      <MenuRender anchorEl={anchorEl} isMenuOpen={isMenuOpen} handleMenuClose={handleMenuClose} />
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default withRouter(Header);
