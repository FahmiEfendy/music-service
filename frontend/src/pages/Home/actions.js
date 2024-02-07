import {
  GET_PLAYLIST_LIST_FAILED,
  GET_PLAYLIST_LIST_REQUEST,
  GET_PLAYLIST_LIST_SUCCESS,
  GET_USER_LIST_FAILED,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
} from './constants';

// GET User List
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

// GET Playlist List
export const getPlaylistListRequest = (payload) => ({
  type: GET_PLAYLIST_LIST_REQUEST,
  payload,
});

export const getPlaylistListSuccess = (data) => ({
  type: GET_PLAYLIST_LIST_SUCCESS,
  data,
});

export const getPlaylistListFailed = (error) => ({
  type: GET_PLAYLIST_LIST_FAILED,
  error,
});
