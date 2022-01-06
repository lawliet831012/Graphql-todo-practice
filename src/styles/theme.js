import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    common: {
      white: '#fff',
      black: '#000'
    },
    primary: {
      main: '#61dafb'
    },
    error: {
      main: '#ff0201'
    }
  }
});

export default theme;
