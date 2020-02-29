import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: '40px'
  },
  shippingWrapper: {
    padding: '30px'
  }
}));

export default useStyles;
