import React from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import GET_PRODUCT from './GraphQl';
import ImageSlider from '../ImageSlider';
import useStyles from './Styles';
import Spinner from '../Spinner';
import LocationProductMap from '../LocationProductMap';
import ProductAbout from '../ProductAbout';
import noPhotoAvailable from '../../media/noPhotoAvailable.png';

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
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h4" align="center">
          {node.title}
        </Typography>
        <ImageSlider
          images={
            node.images.edges.length !== 0
              ? node.images.edges
              : [{ node: { src: noPhotoAvailable } }]
          }
        />
        {node.descriptionHtml ? (
          <Paper className={classes.description}>
            <Typography variant="body2">
              {parse(node.descriptionHtml)}
            </Typography>
          </Paper>
        ) : null}
      </Grid>
      <Grid xs={6}>
        <ProductAbout node={node} />
      </Grid>
      <Grid item xs={12}>
        <LocationProductMap
          position={
            node.metafields.edges.length > 0
              ? node.metafields.edges[0].node.value
              : null
          }
        />
      </Grid>
    </Grid>
  );
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired
};
