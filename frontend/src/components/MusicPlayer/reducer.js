import { produce } from 'immer';
import { GET_SONG_DETAIL_FAILED, GET_SONG_DETAIL_REQUEST, GET_SONG_DETAIL_SUCCESS } from './constants';

export const initialState = {
  songDetail: {
    data: [],
    isError: null,
  },
};

export const storedKey = ['song'];

const songReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_SONG_DETAIL_REQUEST:
        draft.songDetail.isError = null;
        draft.songDetail.data = [];
        break;

      case GET_SONG_DETAIL_SUCCESS:
        draft.songDetail.isError = null;
        draft.songDetail.data = action.data;
        break;

      case GET_SONG_DETAIL_FAILED:
        draft.songDetail.isError = action.error;
        draft.songDetail.data = [];
        break;

      default:
        break;
    }
  });

export default songReducer;
