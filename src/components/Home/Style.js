import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  greetingUnit: {
    display: 'block',
    textAlign: 'center',
    width: 'inherit',
  },
  slideImages: {
    height: '300px',
    opacity: '0.75',
  },
  search: {
    width: '50%',
    color: '#4F3429',
    textAlign: 'left',
    margin: '16px auto',
    position: 'relative',
    borderRadius: '16px',
    backgroundColor: fade('#4F3429', 0.15),
    '&:hover': {
      backgroundColor: fade('#4F3429', 0.25)
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  catList: {
    display: 'flex',
    margin: 'auto',
    listStyleType: 'none',
    justifyContent: 'space-around',
  },
  catName: {
    border: 'none',
    color: '#7E5040',
    fontSize: '1.5rem',
    backgroundSize: 'cover',
    borderRadius: '0.8125rem',
    backgroundRepeat: 'no-repeat',
  },
}));
  
export default useStyles;
