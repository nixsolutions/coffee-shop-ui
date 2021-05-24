import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paperWrapper: {
    backgroundColor: theme.palette.background.paper,
    marginTop: '40px',
  },
  shippingInfo: {
    padding: theme.spacing(2),
  },
  orderInfo: {
    padding: theme.spacing(2),
  },
  orderName: {
    backgroundColor: '#9de3d0',
  },
}));

export default useStyles;
