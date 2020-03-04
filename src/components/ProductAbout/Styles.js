import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  availableForSale: {
    color: '#00a046',
    backgroundColor: '#f4faf6'
  },
  notAvailableForSale: {
    color: '#f84147',
    backgroundColor: '#f4faf6'
  },
  main: {
    padding: '20px'
  },
  byButton: {
    marginLeft: '30%',
    marginRight: '30%',
    width: '40%',
    backgroundColor: '#4F3429',
    borderRadius: '20px',
    color: '#E2DBD5',
    '&:hover': {
      backgroundColor: '#4F3429',
      borderColor: '#925A41',
      boxShadow: 'none'
    }
  }
}));

export default useStyles;
