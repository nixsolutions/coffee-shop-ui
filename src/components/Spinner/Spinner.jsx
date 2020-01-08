import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './Styles';

function Spinner() {
  const classes = useStyles();

  return (
    <div className={classes.spinner}>
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
}
export default Spinner;
