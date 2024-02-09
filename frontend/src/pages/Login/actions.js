import { POST_LOGIN_FAILED, POST_LOGIN_REQUEST, POST_LOGIN_RESET, POST_LOGIN_SUCCESS } from './constants';

export const postLoginRequest = (payload) => ({
  type: POST_LOGIN_REQUEST,
  payload,
});

export const postLoginSuccess = (data) => ({
  type: POST_LOGIN_SUCCESS,
  data,
});

export const postLoginFailed = (error) => ({
  type: POST_LOGIN_FAILED,
  error,
});

export const postLoginReset = () => ({
  type: POST_LOGIN_RESET,
});
