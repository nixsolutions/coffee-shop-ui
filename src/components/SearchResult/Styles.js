import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cardName: {
    border: 'none',
    color: '#7E5040',
    backgroundSize: 'cover',
    borderRadius: '0.8125rem',
    backgroundRepeat: 'no-repeat'
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
}));

export default useStyles;
