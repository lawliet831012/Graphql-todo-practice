import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {},
  pending: {
    color: theme.palette.primary.main
  },
  done: {
    color: theme.palette.error.main,
    textDecoration: 'line-through'
  }
}));
