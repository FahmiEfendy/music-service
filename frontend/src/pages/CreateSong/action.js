import { POST_CREATE_SONG_FAILED, POST_CREATE_SONG_REQUEST, POST_CREATE_SONG_SUCCESS } from './constants';

export const postCreateSongRequest = (payload, callback) => ({
  type: POST_CREATE_SONG_REQUEST,
  payload,
  callback,
});

export const postCreateSongSuccess = (data) => ({
  type: POST_CREATE_SONG_SUCCESS,
  data,
});

export const postCreateSongFailed = (error) => ({
  type: POST_CREATE_SONG_FAILED,
  error,
});
