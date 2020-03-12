import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import GET_PRODUCT from './GraphQl';
import ImageSlider from '../ImageSlider';
import Spinner from '../Spinner';
import ProductAbout from '../ProductAbout';
import noPhotoAvailable from '../../media/noPhotoAvailable.png';

export default function Product({ match: { params } }) {
  const { slug } = params;
  const { data: { node } = {}, loading } = useQuery(GET_PRODUCT, {
    variables: {
      id: slug
    }
  });

  if (loading) return <Spinner />;
  return (
    <Grid container>
      <Grid item lg={7} xs={12}>
        <ImageSlider
          images={
            node.images.edges.length !== 0
              ? node.images.edges
              : [{ node: { id: '1', src: noPhotoAvailable } }]
          }
        />
      </Grid>
      <Grid lg={5} xs={12}>
        <ProductAbout node={node} />
      </Grid>
    </Grid>
  );
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired
};
