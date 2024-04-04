/* eslint-disable max-len */
/* eslint-disable require-yield */
/* eslint-disable no-unused-vars */

import {
  all,
  put,
  takeEvery,
  select
} from 'redux-saga/effects';

import {
  appendRequest,
  appendFailed,
  appendSuccess
} from '@helpers';

import { ROLE_ID } from '@utils';

import { LOGIN } from '@action-types';

function* watchLoginSuccess() {
  yield takeEvery(appendSuccess(LOGIN), function* fn({ payload: { data: response } }) {
    const {
      user,
      access_token: accessToken,
      expires_in: expiresIn
    } = response;

    sessionStorage.clear();
    sessionStorage.setItem('token', accessToken);
    sessionStorage.setItem('expiresIn', expiresIn);
    sessionStorage.setItem('user', JSON.stringify(user));

    switch(user.role_id) {
      case (ROLE_ID.ADMIN):
        window.location.replace('/admin');
        break;
      case (ROLE_ID.MERCHANT):
        window.location.replace('/merchant');
        break;
      default:
        window.location.replace('/');
    }
  });
}

export default function* rootSaga() {
  yield all([
    watchLoginSuccess()
  ]);
}