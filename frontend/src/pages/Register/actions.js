import { POST_REGISTER_FAILED, POST_REGISTER_REQUEST, POST_REGISTER_SUCCESS } from './constants';

export const postRegisterRequest = (payload, callback) => ({
  type: POST_REGISTER_REQUEST,
  payload,
  callback,
});

export const postRegisterSuccess = (data) => ({
  type: POST_REGISTER_SUCCESS,
  data,
});

export const postRegisterFailed = (error) => ({
  type: POST_REGISTER_FAILED,
  error,
});
