import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: '#C0FFF6',
    height: 'auto',
    padding: '5px'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    color: '#4F3429',
    marginRight: theme.spacing(2)
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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  iconHeader: {
    color: '#4F3429'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  menuContainer: {
    color: '#4F3429',
    width: '80%',
    marginRight: '10%',
    marginLeft: '10%'
  },
  menuItem: {
    borderBottom: '2px solid',
    margin: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#4F3429'
  }
}));

export default useStyles;
