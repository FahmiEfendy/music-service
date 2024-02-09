import { DELETE_SONG_FAILED, DELETE_SONG_REQUEST, DELETE_SONG_SUCCESS } from './constants';

export const deleteSongRequest = (payload, callback) => ({
  type: DELETE_SONG_REQUEST,
  payload,
  callback,
});

export const deleteSongSuccess = (data) => ({
  type: DELETE_SONG_SUCCESS,
  data,
});

export const deleteSongFailed = (error) => ({
  type: DELETE_SONG_FAILED,
  error,
});
