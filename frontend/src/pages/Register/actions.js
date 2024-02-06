import { POST_REGISTER_FAILED, POST_REGISTER_REQUEST, POST_REGISTER_SUCCESS } from './constants';

export const postRegisterRequest = (payload) => ({
  type: POST_REGISTER_REQUEST,
  payload,
});

export const postRegisterSuccess = (data) => ({
  type: POST_REGISTER_SUCCESS,
  data,
});

export const postRegisterFailed = (error) => ({
  type: POST_REGISTER_FAILED,
  error,
});
