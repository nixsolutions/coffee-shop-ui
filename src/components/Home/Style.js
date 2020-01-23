import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  slideImages: {
    width: '80%',
    height: '300px',
    opacity: '0.75',
    display: 'block',
    margin: 'auto',
  },
  catList: {
    display: 'flex',
    margin: 'auto',
    listStyleType: 'none',
    justifyContent: 'space-around',
  },
  catName: {
    color: 'black',
    fontSize: '1.5rem',
    height: '9rem',
    width: '15.5rem',
    backgroundSize: 'cover',
    borderRadius: '0.8125rem',
    backgroundRepeat:' no-repeat',
  },
  search: {
    color: '#4F3429',
    position: 'relative',
    borderRadius: '16px',
    backgroundColor: fade('#4F3429', 0.15),
    '&:hover': {
      backgroundColor: fade('#4F3429', 0.25)
    },
    margin: 'auto',
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
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
    color: '#4F3429',
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  }
}));
  
export default useStyles;
