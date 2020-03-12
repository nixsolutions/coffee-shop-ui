import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  map: {
    marginTop: '30px',
    height: '300px',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    border: '2px solid #4F3429',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  bigMap: {
    height: '600px',
    width: '100%'
  }
}));

export default useStyles;
