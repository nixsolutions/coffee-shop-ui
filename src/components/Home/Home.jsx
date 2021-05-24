import React, { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { Search as SearchIcon } from '@material-ui/icons/';
import {
  Grid,
  Typography,
  FormControl,
  InputAdornment,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
  Divider,
} from '@material-ui/core/';
import useStyles from './Styles';
import { GET_PRODUCTS_HOME, GET_SEARCH_RESULT } from './GraphQl';
import Spinner from '../Spinner';
import ProductRecomendation from './ProductRecomendation';
import SearchResult from '../SearchResult';

function Home() {
  const [result, setResult] = useState(null);
  const [query, setQuery] = useState(null);
  const [sortKey, setSortKey] = useState('TITLE');
  const { data, loading } = useQuery(GET_PRODUCTS_HOME);
  const [search, { data: { products } = {}, loading: searchLoading, called }] = useLazyQuery(
    GET_SEARCH_RESULT,
    {
      onCompleted: () => {
        setResult(products);
      },
    }
  );
  const classes = useStyles();

  const simpleSearch = () => {
    search({ variables: { query: `title=${query}`, sortKey } });
  };

  const searchWithOrder = () => {
    const reverseSortKey = sortKey.split(',');
    const isReverse = reverseSortKey[1] === 'true';
    search({
      variables: {
        query: `title=${query}`,
        sortKey: reverseSortKey[0],
        reverse: isReverse,
      },
    });
  };

  const searchProducts = () => {
    const isSimple = sortKey.split(',').length === 1;
    if (isSimple) {
      simpleSearch();
    } else {
      searchWithOrder();
    }
  };

  const onSearch = () => {
    if (sortKey !== '') {
      searchProducts();
    } else {
      setResult(null);
    }
  };
  return (
    <div className={classes.greetingUnit}>
      <div className={classes.search}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Sort by</InputLabel>
                <Select
                  labelId="select-label"
                  id="dselect"
                  onChange={(e) => setSortKey(e.target.value)}
                >
                  <MenuItem value={'TITLE'}>Title A-Z</MenuItem>
                  <MenuItem value={'TITLE,true'}>Title Z-A</MenuItem>
                  <MenuItem value={'PRICE'}>Price (lowest first)</MenuItem>
                  <MenuItem value={'PRICE,true'}>Price (highest first)</MenuItem>
                  <MenuItem value={'RELEVANCE'}>Relevance</MenuItem>
                  <MenuItem value={'BEST_SELLING'}>Best selling</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <Input
                  id="input-with-icon"
                  className={classes.searchInput}
                  onChange={(e) => setQuery(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <ButtonGroup fullWidth className={classes.groupButton}>
                <Button variant="contained" onClick={() => setResult(null)}>
                  Reset
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  <SearchIcon />
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </form>
      </div>
      <SearchResult products={result} searchLoading={searchLoading} called={called} />
      {loading ? (
        <Spinner />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography align="center" variant="h4">
              Recommendations
            </Typography>
            <Divider />
          </Grid>
          {data &&
            data.products &&
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
