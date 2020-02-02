import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Search as SearchIcon } from '@material-ui/icons/';
import { InputBase, Grid, Typography } from '@material-ui/core/';
import useStyles from './Styles';
import GET_PRODUCTS_HOME from './GraphQl';
import Spinner from '../Spinner';
import slide1 from '../../media/slide1.jpg';
import ProductRecomendation from './ProductRecomendation';

function Home() {
  const { data, loading } = useQuery(GET_PRODUCTS_HOME);
  const classes = useStyles();

  return (
    <div className={classes.greetingUnit}>
      <img className={classes.slideImages} src={slide1} alt="" />
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography align="center" variant="h4">
              Recommendations
            </Typography>
          </Grid>
          {data.products &&
            data.products.edges.map(({ node }) => (
              <Grid item sm={6} xs={12} md={3} key={node.id}>
                <ProductRecomendation product={node} key={node.id} />
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
}

export default Home;
