import { produce } from 'immer';

import { POST_REGISTER_REQUEST, POST_REGISTER_SUCCESS, POST_REGISTER_FAILED } from './constants';

export const initialState = {
  register: {
    data: [],
    isError: null,
  },
};

export const storedKey = [''];

const registerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POST_REGISTER_REQUEST:
        draft.register.isError = null;
        draft.register.data = [];
        break;

      case POST_REGISTER_SUCCESS:
        draft.register.isError = null;
        draft.register.data = action.data;
        break;

      case POST_REGISTER_FAILED:
        draft.register.isError = action.error;
        draft.register.data = [];
        break;

      default:
        break;
    }
  });

export default registerReducer;
