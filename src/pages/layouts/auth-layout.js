import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';

const AuthLayout = ({ children }) => {
  return <>
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/login-background.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat'
      }}
    >

      <Grid container spacing={0}>
        <Grid item md={8} lg={9} xl={8}>
          <Box
            sx={{
              height: '100vh',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={3} xl={4}>
          <Box sx={{
            height: '100vh',
            backgroundColor: '#f5ebe0'
          }}>
            <Box sx={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: {
                xs: '0px 28px',
                sm: '0px 150px',
                md: '0px 20px',
                lg: '0px 34px',
                xl: '0px 40px'
              }
            }}>
              { children }
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </>;
};

export default AuthLayout;