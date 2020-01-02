import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import GET_PRODUCT from './GraphQl';
import ImageSlider from '../ImageSlider';
import useStyles from './Styles';
import Spinner from '../Spinner';

export default function Product({ match: { params } }) {
  const classes = useStyles();
  const { slug } = params;
  const { data: { node } = {}, loading } = useQuery(GET_PRODUCT, {
    variables: {
      id: slug
    }
  });

  if (loading) return <Spinner />;

  return (
    <div>
      <Typography variant="h4" align="center">
        {node.title}
      </Typography>
      <ImageSlider images={node.images.edges} />
      <Paper className={classes.description}>
        <Typography variant="body2">{node.description}</Typography>
      </Paper>
    </div>
  );
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired
};
