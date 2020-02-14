import React from 'react';
import PropTypes from 'prop-types';
import { Slide } from 'react-slideshow-image';
import useStyles from './Styles';

export default function ImageSlider({ images }) {
  const classes = useStyles();
  const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide duration="5000" transitionDuration="500" infinite={false} indicators={false} arrows>
          {images.map(({ node }) => (
            <div className="each-slide">
              <div className={classes.imageWrap} style={{ backgroundImage: `url(${node.src})` }} />
            </div>
          ))}
        </Slide>
      </div>
    );
  };
  return <Slideshow />;
}

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired
};
