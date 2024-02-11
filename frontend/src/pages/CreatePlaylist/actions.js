import { POST_CREATE_PLAYLIST_FAILED, POST_CREATE_PLAYLIST_REQUEST, POST_CREATE_PLAYLIST_SUCCESS } from './constants';

export const postCreatePlaylistRequest = (payload, callback) => ({
  type: POST_CREATE_PLAYLIST_REQUEST,
  payload,
  callback,
});

export const postCreatePlaylistSuccess = (data) => ({
  type: POST_CREATE_PLAYLIST_SUCCESS,
  data,
});

export const postCreatePlaylistFailed = (error) => ({
  type: POST_CREATE_PLAYLIST_FAILED,
  error,
});
