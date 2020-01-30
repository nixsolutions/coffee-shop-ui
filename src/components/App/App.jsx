import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Header from '../Header';
import Shop from '../Shop';
import Product from '../Product';
import Home from '../Home';
import ErrorBoundary from '../ErrorBoundary';
import CustomerSignUp from '../CustomerSignUp';
import CustomerLogIn from '../CustomerLogIn';
import CustomerOrderCreate from '../CustomerOrderCreate';
import GuestOrderCreate from '../GuestOrderCreate';
import GuestOrder from '../GuestOrder';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Container maxWidth={false}>
          <Header />
          <Box mt={12}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/order/new/:cartId"
                component={GuestOrderCreate}
              />
              <Route
                exact
                path="/customer/order/new/:cartId"
                component={CustomerOrderCreate}
              />
              <Route exact path="/shop" component={Shop} />
              <Route exact path="/shop/:slug" component={Product} />
              <Route
                exact
                path="/customer/sign_up"
                component={CustomerSignUp}
              />
              <Route exact path="/customer/sign_in" component={CustomerLogIn} />
              <Route exact path="/order/:id" component={GuestOrder} />
              <Redirect to="/" />
            </Switch>
          </Box>
        </Container>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
