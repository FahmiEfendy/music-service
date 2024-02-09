import {
  DELETE_PLAYLIST_SONG_FAILED,
  DELETE_PLAYLIST_SONG_REQUEST,
  DELETE_PLAYLIST_SONG_SUCCESS,
  GET_PLAYLIST_DETAIL_FAILED,
  GET_PLAYLIST_DETAIL_REQUEST,
  GET_PLAYLIST_DETAIL_SUCCESS,
} from './constants';

// GET Playlist Detail
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

// DELETE Playlist Song
export const deletePlaylistSongRequest = (payload, callback) => ({
  type: DELETE_PLAYLIST_SONG_REQUEST,
  payload,
  callback,
});

export const deletePlaylistSongSuccess = (data) => ({
  type: DELETE_PLAYLIST_SONG_SUCCESS,
  data,
});

export const deletePlaylistSongFailed = (error) => ({
  type: DELETE_PLAYLIST_SONG_FAILED,
  error,
});
