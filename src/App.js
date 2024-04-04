import React from 'react';
import {
  createTheme,
  ThemeProvider
} from '@mui/material/styles';

import AppRoutes from './routes';

const App = () => {
  const theme = createTheme({ palette: { primary: { main: '#000000' } } });


  return <>
    <ThemeProvider theme={theme}>
      <AppRoutes/>
    </ThemeProvider>
  </>;
};

export default App;
