import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  greetingUnit: {
    display: 'block',
    textAlign: 'center',
    width: 'inherit',
  },
  search: {
    width: '60%',
    color: '#4F3429',
    textAlign: 'left',
    margin: '16px auto',
    position: 'relative',
    backgroundColor: '#fcf8e8',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  cardName: {
    border: 'none',
    color: '#7E5040',
    backgroundSize: 'cover',
    borderRadius: '0.8125rem',
    backgroundRepeat: 'no-repeat',
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  searchInput: {
    marginTop: '16px',
    marginLeft: '5px',
  },
  groupButton: {
    marginTop: '9px',
  },
  searcButton: {
    margin: '3px',
  },
}));

export default useStyles;
