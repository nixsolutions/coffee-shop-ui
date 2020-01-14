import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  availableForSale: {
    color: '#00a046',
    backgroundColor: '#f4faf6'
  },
  notAvailableForSale: {
    color: '#f84147',
    backgroundColor: '#f4faf6'
  }
}));

export default useStyles;
