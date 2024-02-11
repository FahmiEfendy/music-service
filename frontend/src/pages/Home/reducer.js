import { produce } from 'immer';

import {
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_FAILED,
  GET_USER_LIST_SUCCESS,
  GET_PLAYLIST_LIST_REQUEST,
  GET_PLAYLIST_LIST_FAILED,
  GET_PLAYLIST_LIST_SUCCESS,
  GET_SONG_LIST_REQUEST,
  GET_SONG_LIST_SUCCESS,
  GET_SONG_LIST_FAILED,
  POST_ADD_PLAYLIST_SONG_REQUEST,
  POST_ADD_PLAYLIST_SONG_SUCCESS,
  POST_ADD_PLAYLIST_SONG_FAILED,
} from './constants';

export const initialState = {
  userList: {
    data: [],
    isError: null,
  },
  playlistList: {
    data: [],
    isError: null,
  },
  songList: {
    data: [],
    isError: null,
  },
  addPlaylistSong: {
    data: [],
    isError: null,
  },
};

export const storedKey = ['home'];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_USER_LIST_REQUEST:
        draft.userList.isError = null;
        draft.userList.data = [];
        break;

      case GET_USER_LIST_SUCCESS:
        draft.userList.isError = null;
        draft.userList.data = action.data;
        break;

      case GET_USER_LIST_FAILED:
        draft.userList.isError = action.error;
        draft.userList.data = [];
        break;

      case GET_PLAYLIST_LIST_REQUEST:
        draft.playlistList.isError = null;
        draft.playlistList.data = [];
        break;

      case GET_PLAYLIST_LIST_SUCCESS:
        draft.playlistList.isError = null;
        draft.playlistList.data = action.data;
        break;

      case GET_PLAYLIST_LIST_FAILED:
        draft.playlistList.isError = action.error;
        draft.playlistList.data = [];
        break;

      case GET_SONG_LIST_REQUEST:
        draft.songList.isError = null;
        draft.songList.data = [];
        break;

      case GET_SONG_LIST_SUCCESS:
        draft.songList.isError = null;
        draft.songList.data = action.data;
        break;

      case GET_SONG_LIST_FAILED:
        draft.songList.isError = action.error;
        draft.songList.data = [];
        break;

      case POST_ADD_PLAYLIST_SONG_REQUEST:
        draft.addPlaylistSong.isError = null;
        draft.addPlaylistSong.data = [];
        break;

      case POST_ADD_PLAYLIST_SONG_SUCCESS:
        draft.addPlaylistSong.isError = null;
        draft.addPlaylistSong.data = action.data;
        break;

      case POST_ADD_PLAYLIST_SONG_FAILED:
        draft.addPlaylistSong.isError = action.error;
        draft.addPlaylistSong.data = [];
        break;

      default:
        break;
    }
  });

export default homeReducer;
