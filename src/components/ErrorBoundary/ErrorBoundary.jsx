import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import styles from './Styles';
import './face.scss';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    const { classes } = this.props;
    const goToHome = () => {
      this.setState({
        hasError: false,
      });
    };
    if (hasError) {
      return (
        <div className={classes.wraper}>
          <div className="face">
            <div className="band">
              <div className="red"></div>
              <div className="white"></div>
              <div className="blue"></div>
            </div>
            <div className="eyes"></div>
            <div className="dimples"></div>
            <div className="mouth"></div>
          </div>
          <Typography variant="h2" className={classes.head}>
            OOOPS!
          </Typography>
          <Typography vapiant="h4" className={classes.message}>
            Sorry, something went wrong.
          </Typography>
          <Divider variant="inset" component="div" />
          <Button
            className={classes.goToHome}
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            fullWidth
            onClick={() => goToHome()}
          >
            Return home
          </Button>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.objectOf(Object).isRequired,
};

export default withStyles(styles)(ErrorBoundary);
