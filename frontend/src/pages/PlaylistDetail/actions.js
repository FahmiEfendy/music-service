import { GET_PLAYLIST_DETAIL_FAILED, GET_PLAYLIST_DETAIL_REQUEST, GET_PLAYLIST_DETAIL_SUCCESS } from './constants';

export const getPlaylistDetailRequest = (payload) => ({
  type: GET_PLAYLIST_DETAIL_REQUEST,
  payload,
});

export const getPlaylistDetailSuccess = (data) => ({
  type: GET_PLAYLIST_DETAIL_SUCCESS,
  data,
});

export const getPlaylistDetailFailed = (error) => ({
  type: GET_PLAYLIST_DETAIL_FAILED,
  error,
});
