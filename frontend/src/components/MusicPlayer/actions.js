import { GET_SONG_DETAIL_FAILED, GET_SONG_DETAIL_REQUEST, GET_SONG_DETAIL_SUCCESS } from './constants';

export const getSongDetailRequest = (payload) => ({
  type: GET_SONG_DETAIL_REQUEST,
  payload,
});

export const getSongDetailSuccess = (data) => ({
  type: GET_SONG_DETAIL_SUCCESS,
  data,
});

export const getSongDetailFailed = (error) => ({
  type: GET_SONG_DETAIL_FAILED,
  error,
});
