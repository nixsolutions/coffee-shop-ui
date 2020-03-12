import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import useStyles from './Styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

export default function LocationProductMap({ position }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const coordinate = position && position.split(',');
  const handleOpen = () => {
    const isMobile = window.innerWidth <= 500;
    if (isMobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (position === null) return null;

  return (
    <>
      <Map
        onClick={handleOpen}
        className={classes.map}
        center={coordinate}
        zoom={10}
        doubleClickZoom={false}
        closePopupOnClick={false}
        dragging={false}
        zoomSnap={false}
        zoomDelta={false}
        trackResize={false}
        touchZoom={false}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coordinate}>
          <Popup></Popup>
        </Marker>
      </Map>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <Map className={classes.bigMap} center={coordinate} zoom={8}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={coordinate}>
              <Popup></Popup>
            </Marker>
          </Map>
        </div>
      </Modal>
    </>
  );
}

LocationProductMap.propTypes = {
  position: PropTypes.shape({
    split: PropTypes.func
  }).isRequired
};
