import { produce } from 'immer';

import { GET_PLAYLIST_DETAIL_FAILED, GET_PLAYLIST_DETAIL_REQUEST, GET_PLAYLIST_DETAIL_SUCCESS } from './constants';

export const initialState = {
  playlistDetail: {
    data: [],
    isError: null,
  },
};

export const storedKey = ['playlistDetail'];

const playlistDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_PLAYLIST_DETAIL_REQUEST:
        draft.playlistDetail.isError = null;
        draft.playlistDetail.data = [];
        break;

      case GET_PLAYLIST_DETAIL_SUCCESS:
        draft.playlistDetail.isError = null;
        draft.playlistDetail.data = action.data;
        break;

      case GET_PLAYLIST_DETAIL_FAILED:
        draft.playlistDetail.isError = action.error;
        draft.playlistDetail.data = [];
        break;
    }
  });

export default playlistDetailReducer;
