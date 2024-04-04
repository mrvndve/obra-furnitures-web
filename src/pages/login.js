import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import { createSelector } from 'reselect';
import { useForm } from 'react-hook-form';
import { loginAction } from '@actions';
import {
  emailOnlyRegex,
  ROLE_ID
} from '@utils';

import {
  Box,
  Grid,
  Typography,
  Alert
} from '@mui/material';
import {
  TextField,
  PasswordField,
  Button
} from '@components';

const stateSelectors = createSelector(
  state => state.auth,
  (auth) => ({
    loading: auth.loading,
    apiFieldErrors: auth.apiErrors,
    apiErrorMessage: auth.apiErrorMessage
  })
);

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useParams();

  const {
    loading,
    apiFieldErrors,
    apiErrorMessage
  } = useSelector(stateSelectors);

  let roleId;
  let loginTitle;

  switch(role) {
    case 'admin':
      roleId = ROLE_ID.ADMIN;
      loginTitle = 'Admin';
      break;
    case 'merchant':
      roleId = ROLE_ID.MERCHANT;
      loginTitle = 'Seller Centre';
      break;
    case 'buyer':
      roleId = ROLE_ID.BUYER;
      loginTitle = 'Welcome to Obra Furnitures!';
      break;
    default:
      roleId = null;
  }

  const {
    register,
    formState: { errors: fieldErrors },
    handleSubmit
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      role_id: roleId
    };

    dispatch(loginAction(payload));
  };

  useEffect(() => {
    if (!roleId) {
      navigate('/*');
    }
  }, [roleId]);

  return <>
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid sx={{ mb: role !== 'admin' ? 3 : '' }} item xs={12}>
            <Box align='center'>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontFamily: 'Playfair Display'
                }}
                variant='h4'
              >
                {loginTitle}
              </Typography>

              {role !== 'admin' && (
                <>
                  <br/>

                  <Typography variant='body2'>
                    {'Don\'t have an account? '}
                    <span
                      onClick={() => navigate(role === 'buyer' ? '/buyer/register' : '/merchant/register')}
                      style={{
                        textDecoration: 'underline',
                        cursor: 'pointer'
                      }}
                    >
                      Create Account
                    </span>
                  </Typography>
                </>
              )}
            </Box>
          </Grid>

          {apiErrorMessage && (
            <Grid item xs={12}>
              <Alert variant="filled" severity='error'>
                {apiErrorMessage}
              </Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              name='email'
              label='Email'
              {...register('email', {
                required: 'Email field is required.',
                pattern: {
                  value: emailOnlyRegex,
                  message: 'Incorrect email address format.'
                }
              })}
              error={fieldErrors.email || apiFieldErrors?.email}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12}>
            <PasswordField
              name='password'
              label='Password'
              {...register('password', { required: 'Password field is required.' })}
              error={fieldErrors.password || apiFieldErrors?.password}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              sx={{ width: '100%' }}
              type='submit'
              label='SIGN IN'
              disabled={loading}
            />
          </Grid>

          {role !== 'admin' && (
            <Grid align='right' item xs={12}>
              <Typography
                onClick={() => navigate(`/${role}/forgot-password`)}
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
                variant='body2'
              >
                Forgot Password?
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Box>
  </>;
};

export default LoginPage;