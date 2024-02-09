import { produce } from 'immer';
import { POST_CREATE_PLAYLIST_FAILED, POST_CREATE_PLAYLIST_REQUEST, POST_CREATE_PLAYLIST_SUCCESS } from './constants';

export const initialState = {
  createPlaylist: {
    data: [],
    isError: null,
  },
};

export const storedKey = [''];

const createPlaylistReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POST_CREATE_PLAYLIST_REQUEST:
        draft.createPlaylist.isError = null;
        draft.createPlaylist.data = [];
        break;

      case POST_CREATE_PLAYLIST_SUCCESS:
        draft.createPlaylist.isError = null;
        draft.createPlaylist.data = action.data;
        break;

      case POST_CREATE_PLAYLIST_FAILED:
        draft.createPlaylist.isError = action.error;
        draft.createPlaylist.data = [];
        break;

      default:
        break;
    }
  });

export default createPlaylistReducer;
