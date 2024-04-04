import { combineReducers } from 'redux';
import {
  appendRequest,
  appendSuccess,
  appendFailed
} from '@helpers';
import {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD
} from '@action-types';

const authState = {
  loading: false,
  apiSuccessMessage: null,
  apiErrors: null,
  apiErrorMessage: null
};

const auth = (state = authState, action) => {
  switch(action.type) {
    case appendRequest(REGISTER):
      return {
        ...state,
        loading: true
      };
    case appendSuccess(REGISTER):
      return {
        ...state,
        loading: false
      };
    case appendFailed(REGISTER):
      return {
        ...state,
        loading: false,
        apiErrors: action.error.response.data?.errors,
        apiErrorMessage: action.error.response.data?.message
      };
    case appendRequest(LOGIN):
      return {
        ...state,
        loading: true
      };
    case appendSuccess(LOGIN):
      return {
        ...state,
        loading: false
      };
    case appendFailed(LOGIN):
      return {
        ...state,
        loading: false,
        apiErrors: action.error.response.data?.errors,
        apiErrorMessage: action.error.response.data?.message
      };
    case appendRequest(FORGOT_PASSWORD):
      return {
        ...state,
        loading: true
      };
    case appendSuccess(FORGOT_PASSWORD):
      return {
        ...state,
        apiSuccessMessage: action.payload.data.message,
        loading: false
      };
    case appendFailed(FORGOT_PASSWORD):
      return {
        ...state,
        loading: false,
        apiErrors: action.error.response.data?.errors,
        apiErrorMessage: action.error.response.data?.message
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ auth });

export default rootReducer;