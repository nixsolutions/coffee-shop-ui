import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: '#C0FFF6',
    height: '90px',
    padding: '10px'
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
  }
}));

export default useStyles;
