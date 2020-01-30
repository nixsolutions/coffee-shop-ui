import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  orderInfo: {
    padding: '20px'
  },
  error: {
    color: 'red'
  }
});

export default useStyles;
