import { produce } from 'immer';

import { DELETE_SONG_REQUEST, DELETE_SONG_SUCCESS, DELETE_SONG_FAILED } from './constants';

const initialState = {
  deleteSong: {
    data: [],
    isError: null,
  },
};

export const storedKey = [''];

const songListReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DELETE_SONG_REQUEST:
        draft.deleteSong.isError = null;
        draft.deleteSong.data = [];
        break;

      case DELETE_SONG_SUCCESS:
        draft.deleteSong.isError = null;
        draft.deleteSong.data = action.data;
        break;

      case DELETE_SONG_FAILED:
        draft.deleteSong.isError = action.error;
        draft.deleteSong.data = [];
        break;

      default:
        break;
    }
  });

export default songListReducer;
