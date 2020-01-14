import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import useStyles from './Styles';

export default function LocationProductMap({ position }) {
  const classes = useStyles();
  const coordinate = position && position.split(',');

  if (position === null) return null;

  return (
    <Map className={classes.map} center={coordinate} zoom={10}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={coordinate}>
        <Popup>Easily customizable.</Popup>
      </Marker>
    </Map>
  );
}

LocationProductMap.propTypes = {
  position: PropTypes.shape({
    split: PropTypes.func
  }).isRequired
};
