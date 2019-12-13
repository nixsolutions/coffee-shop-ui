import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  cardContainer: {
    padding: theme.spacing(2),
    paddingLeft: '30px'
  },
  card: {
    maxWidth: 400,
    height: 'auto'
  },
  media: {
    height: 400
  },
  slide: {
    width: '100%',
    height: '100%'
  }
}));

export default useStyles;
