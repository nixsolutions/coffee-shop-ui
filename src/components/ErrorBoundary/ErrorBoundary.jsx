import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import styles from './Styles';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    const { classes } = this.props;
    if (hasError) {
      return (
        <div className={classes.wraper}>
          <ErrorOutlineIcon className={classes.errorIcon} />
          <Typography variant="h2" className={classes.head}>
            OOOPS!
          </Typography>
          <Typography vapiant="h4" className={classes.message}>
            Sorry, something went wrong.
          </Typography>
          <Divider variant="inset" component="div" />
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.objectOf(Object).isRequired
};

export default withStyles(styles)(ErrorBoundary);
