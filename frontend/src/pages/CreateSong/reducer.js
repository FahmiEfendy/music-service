import { produce } from 'immer';

import { POST_CREATE_SONG_FAILED, POST_CREATE_SONG_REQUEST, POST_CREATE_SONG_SUCCESS } from './constants';

export const initialState = {
  createSong: {
    data: [],
    isError: null,
  },
};

export const storedKey = [''];

const createSongReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POST_CREATE_SONG_REQUEST:
        draft.createSong.isError = null;
        draft.createSong.data = [];
        break;

      case POST_CREATE_SONG_SUCCESS:
        draft.createSong.isError = null;
        draft.createSong.data = [];
        break;

      case POST_CREATE_SONG_FAILED:
        draft.createSong.isError = action.error;
        draft.createSong.data = null;
        break;

      default:
        break;
    }
  });

export default createSongReducer;
