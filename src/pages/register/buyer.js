/* eslint-disable no-unused-vars */
import React from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emailOnlyRegex } from '@utils';
import { createSelector } from 'reselect';
import { useForm } from 'react-hook-form';
import { registerAction } from '@actions';

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

const RegisterBuyer = ({ roleId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    apiFieldErrors,
    apiErrorMessage
  } = useSelector(stateSelectors);

  const {
    register,
    formState: { errors: fieldErrors },
    handleSubmit
  } = useForm();

  const onSubmit = data => {
    const payload = {
      ...data,
      roleId
    };

    dispatch(registerAction(payload));
  };

  return <>
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
              Register New Account
            </Typography>

            <br/>

            <Typography variant='body2'>
              Create your new account to start shopping!
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <TextField
            name='user_name'
            label='Username'
            {...register('user_name', { required: 'Username field is required.' })}
            error={fieldErrors.username || apiFieldErrors?.username}
            disabled={loading}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
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

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <TextField
            name='first_name'
            label='First Name'
            {...register('first_name', { required: 'First name field is required.' })}
            error={fieldErrors.user_name || apiFieldErrors?.user_name}
            disabled={loading}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <TextField
            name='middle_name'
            label='Middle Name'
            {...register('middle_name')}
            error={fieldErrors.middle_name || apiFieldErrors?.middle_name}
            disabled={loading}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <TextField
            name='last_name'
            label='Last Name'
            {...register('last_name', { required: 'First name field is required.' })}
            error={fieldErrors.last_name || apiFieldErrors?.last_name}
            disabled={loading}
          />
        </Grid>
      </Grid>
    </form>
  </>;
};

export default RegisterBuyer;