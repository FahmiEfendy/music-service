import { produce } from 'immer';

import { GET_USER_LIST_REQUEST, GET_USER_LIST_FAILED, GET_USER_LIST_SUCCESS } from './constants';

export const initialState = {
  userList: {
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
        draft.userList.isError = null;
        draft.userList.data = [];
        break;

      default:
        break;
    }
  });

export default homeReducer;
