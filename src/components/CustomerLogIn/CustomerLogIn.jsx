import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './Styles';
import { CUSTOMER_ACCESS_TOKEN_CREATE } from '../CustomerSignUp/GraphQl';
import Spinner from '../Spinner';
import setCustomerToken from '../../helpers/setCustomerToken';

function CustomerLogIn({ history }) {
  const classes = useStyles();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [formErrors, setFormErrors] = useState([]);

  const [customerAccessTokenCreate, { loading, client }] = useMutation(
    CUSTOMER_ACCESS_TOKEN_CREATE,
    {
      onCompleted: ({
        customerAccessTokenCreate: { customerAccessToken, customerUserErrors }
      }) => {
        if (customerUserErrors.length > 0) {
          setFormErrors(customerUserErrors);
        } else {
          setCustomerToken(client, customerAccessToken);
          history.push('/');
        }
      }
    }
  );

  if (loading) return <Spinner />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => {
            e.preventDefault();
            customerAccessTokenCreate({
              variables: {
                input: {
                  email,
                  password
                }
              }
            });
          }}
        >
          {formErrors.length > 0 &&
            formErrors.map(err => (
              <p className={classes.error} key={err.message}>
                {`*${err.message}`}
              </p>
            ))}
          <TextField
            onChange={e => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/customer/sign_up" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

CustomerLogIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default withRouter(CustomerLogIn);
