import {
  GET_PLAYLIST_LIST_FAILED,
  GET_PLAYLIST_LIST_REQUEST,
  GET_PLAYLIST_LIST_SUCCESS,
  GET_SONG_LIST_FAILED,
  GET_SONG_LIST_REQUEST,
  GET_SONG_LIST_SUCCESS,
  GET_USER_LIST_FAILED,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  POST_ADD_PLAYLIST_SONG_FAILED,
  POST_ADD_PLAYLIST_SONG_REQUEST,
  POST_ADD_PLAYLIST_SONG_SUCCESS,
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

// GET Song List
export const getSongListRequest = (payload) => ({
  type: GET_SONG_LIST_REQUEST,
  payload,
});

export const getSongListSuccess = (data) => ({
  type: GET_SONG_LIST_SUCCESS,
  data,
});

export const getSongListFailed = (error) => ({
  type: GET_SONG_LIST_FAILED,
  error,
});

export const postAddSongToPlaylistRequest = (payload) => ({
  type: POST_ADD_PLAYLIST_SONG_REQUEST,
  payload,
});

export const postAddSongToPlaylistSuccess = (data) => ({
  type: POST_ADD_PLAYLIST_SONG_SUCCESS,
  data,
});

export const postAddSongToPlaylistFailed = (error) => ({
  type: POST_ADD_PLAYLIST_SONG_FAILED,
  error,
});
