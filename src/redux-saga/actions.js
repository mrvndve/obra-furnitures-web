import {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD
} from '@action-types';
import { setActionTypes } from '@helpers';

export const registerAction = (payload) => ({
  types: setActionTypes(REGISTER),
  payload: {
    request: {
      method: 'POST',
      url: 'v1/auth/register',
      data: payload
    }
  }
});

export const loginAction = (payload) => ({
  types: setActionTypes(LOGIN),
  payload: {
    request: {
      method: 'POST',
      url: 'v1/auth/login',
      data: payload
    }
  }
});

export const forgotPasswordAction = (payload) => ({
  types: setActionTypes(FORGOT_PASSWORD),
  payload: {
    request: {
      method: 'POST',
      url: 'v1/auth/forgot-password',
      data: payload
    }
  }
});