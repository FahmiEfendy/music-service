import { produce } from 'immer';
import {
  GET_USER_DETAIL_FAILED,
  GET_USER_DETAIL_REQUEST,
  GET_USER_DETAIL_SUCCESS,
  PATCH_UPDATE_PROFILE_FAILED,
  PATCH_UPDATE_PROFILE_REQUEST,
  PATCH_UPDATE_PROFILE_SUCCESS,
} from './constans';

export const initialState = {
  userDetail: {
    data: [],
    isError: null,
  },
  updateProfile: {
    data: [],
    isError: null,
  },
};

export const storedKey = ['profile'];

const profileReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // GET User Detail
      case GET_USER_DETAIL_REQUEST:
        draft.userDetail.isError = null;
        draft.userDetail.data = [];
        break;

      case GET_USER_DETAIL_SUCCESS:
        draft.userDetail.isError = null;
        draft.userDetail.data = action.data;
        break;

      case GET_USER_DETAIL_FAILED:
        draft.userDetail.isError = action.error;
        draft.userDetail.data = [];
        break;

      // PATCH Update Profile
      case PATCH_UPDATE_PROFILE_REQUEST:
        draft.updateProfile.isError = null;
        draft.userDetail.data = [];
        break;

      case PATCH_UPDATE_PROFILE_SUCCESS:
        draft.updateProfile.isError = null;
        draft.userDetail.data = action.data;
        break;

      case PATCH_UPDATE_PROFILE_FAILED:
        draft.updateProfile.isError = action.error;
        draft.userDetail.data = [];
        break;

      default:
        break;
    }
  });

export default profileReducer;
