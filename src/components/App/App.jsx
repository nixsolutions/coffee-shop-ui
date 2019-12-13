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
import useStyles from './Styles';

function App() {
  const classes = useStyles();
  return (
    <Router>
      <Container maxWidth={false} className={classes.body}>
        <Header />
        <Box mt={12}>
          <Switch>
            <Route exact path="/" render={() => <h1>Coffe Shop</h1>} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/shop/:slug" component={Product} />
            <Redirect to="/" />
          </Switch>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
