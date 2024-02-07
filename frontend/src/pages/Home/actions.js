import { GET_USER_LIST_FAILED, GET_USER_LIST_REQUEST, GET_USER_LIST_SUCCESS } from './constants';

export const getUserListRequest = (payload) => ({
  type: GET_USER_LIST_REQUEST,
  payload,
});

export const getUserListSuccess = (data) => ({
  type: GET_USER_LIST_SUCCESS,
  data,
});

export const getUserListFailed = (error) => ({
  type: GET_USER_LIST_FAILED,
  error,
});
