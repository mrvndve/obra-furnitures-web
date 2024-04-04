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
import { forgotPasswordAction } from '@actions';
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
  Button
} from '@components';

const stateSelectors = createSelector(
  state => state.auth,
  (auth) => ({
    loading: auth.loading,
    apiFieldErrors: auth.apiErrors,
    apiSuccessMessage: auth.apiSuccessMessage,
    apiErrorMessage: auth.apiErrorMessage
  })
);

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useParams();

  const {
    loading,
    apiFieldErrors,
    apiSuccessMessage,
    apiErrorMessage
  } = useSelector(stateSelectors);

  let roleId;
  switch(role) {
    case 'merchant':
      roleId = ROLE_ID.MERCHANT;
      break;
    case 'buyer':
      roleId = ROLE_ID.BUYER;
      break;
    default:
      roleId = null;
  }

  const {
    register,
    formState: { errors: fieldErrors },
    handleSubmit,
    reset
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      role_id: roleId
    };

    dispatch(forgotPasswordAction(payload)).then(() => {
      reset();
    });
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
          <Grid sx={{ mb: 3 }} item xs={12}>
            <Box align='center'>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontFamily: 'Playfair Display'
                }}
                variant='h4'
              >
                Forgot Password
              </Typography>

              <br/>

              <Typography variant='body2'>
                {'Enter your email and we will send you a link to reset your password.'}
              </Typography>
            </Box>
          </Grid>

          {apiSuccessMessage && (
            <Grid item xs={12}>
              <Alert variant="filled" severity='success'>
                {apiSuccessMessage}
              </Alert>
            </Grid>
          )}

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
            <Button
              sx={{ width: '100%' }}
              type='submit'
              label='SUBMIT'
              disabled={loading}
            />
          </Grid>

          <Grid align='right' item xs={12}>
            <Typography
              onClick={() => navigate(`/${role}/login`)}
              sx={{
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
              variant='body2'
            >
                Back to Login
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Box>
  </>;
};

export default ForgotPasswordPage;