import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
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
import { CUSTOMER_CREATE, CUSTOMER_ACCESS_TOKEN_CREATE } from './GraphQl';
import Spinner from '../Spinner';
import setCustomerToken from '../../helpers/setCustomerToken';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function CustomerSignUp({ history }) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const [customerAccessTokenCreate, { loading: loadCreateToken, client }] = useMutation(
    CUSTOMER_ACCESS_TOKEN_CREATE,
    {
      onCompleted: ({ customerAccessTokenCreate: { customerAccessToken, customerUserErrors } }) => {
        if (customerUserErrors.length > 0) {
          setFormErrors(customerUserErrors);
        } else {
          setCustomerToken(client, customerAccessToken);
          history.push('/');
        }
      }
    }
  );
  const [createCustomer, { loading }] = useMutation(CUSTOMER_CREATE, {
    onCompleted: ({ customerCreate: { customer, customerUserErrors } }) => {
      if (customerUserErrors.length > 0) {
        setFormErrors(customerUserErrors);
      } else {
        customerAccessTokenCreate({
          variables: {
            input: {
              email: customer.email,
              password
            }
          }
        });
      }
    }
  });

  if (loading || loadCreateToken) return <Spinner />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => {
            e.preventDefault();
            createCustomer({
              variables: {
                input: {
                  email,
                  phone,
                  password,
                  firstName,
                  lastName,
                  acceptsMarketing
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => setFirstName(e.target.value)}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => setLastName(e.target.value)}
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setEmail(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <PhoneInput onChange={e => setPhone(e)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="primary" onChange={e => setAcceptsMarketing(e.target.checked)} />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/customer/sign_in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

CustomerSignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default withRouter(CustomerSignUp);
