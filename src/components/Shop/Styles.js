import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  cardContainer: {
    padding: '16px'
  },
  card: {
    maxWidth: 345,
    height: 400
  },
  media: {
    height: 400
  },
  slide: {
    width: '100%',
    height: '100%'
  },
  fabContainer: {
    marginTop: '30px',
    width: '100%',
    height: '35px'
  },
  scrollDown: {
    width: '10%',
    marginLeft: '45%',
    marginRight: '45%'
  }
}));

export default useStyles;
