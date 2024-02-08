import { POST_CREATE_SONG_FAILED, POST_CREATE_SONG_REQUEST, POST_CREATE_SONG_SUCCESS } from './constants';

export const postCreateSongRequest = (payload) => ({
  type: POST_CREATE_SONG_REQUEST,
  payload,
});

export const postCreateSongSuccess = (data) => ({
  type: POST_CREATE_SONG_SUCCESS,
  data,
});

export const postCreateSongFailed = (error) => ({
  type: POST_CREATE_SONG_FAILED,
  error,
});
