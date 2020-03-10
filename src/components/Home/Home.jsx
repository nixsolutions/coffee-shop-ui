import React from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { Search as SearchIcon } from '@material-ui/icons/';
import { InputBase, Grid, Typography } from '@material-ui/core/';
import useStyles from './Styles';
import { GET_PRODUCTS_HOME, GET_SEARCH_RESULT } from './GraphQl';
import Spinner from '../Spinner';
import ProductRecomendation from './ProductRecomendation';
import SearchResult from '../SearchResult';

function Home() {
  const { data, loading } = useQuery(GET_PRODUCTS_HOME);
  const [search, { data: { products } = {}, loading: searchLoading, called }] = useLazyQuery(
    GET_SEARCH_RESULT
  );
  const classes = useStyles();
  const onSearch = value => {
    if (value !== '') {
      search({ variables: { query: value } });
    }
  };
  return (
    <div className={classes.greetingUnit}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={e => onSearch(e.target.value)}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <SearchResult products={products} searchLoading={searchLoading} called={called} />
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
