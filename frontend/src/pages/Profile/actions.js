import {
  GET_USER_DETAIL_FAILED,
  GET_USER_DETAIL_REQUEST,
  GET_USER_DETAIL_SUCCESS,
  PATCH_UPDATE_PROFILE_FAILED,
  PATCH_UPDATE_PROFILE_REQUEST,
  PATCH_UPDATE_PROFILE_SUCCESS,
} from './constans';

// GET User Detail
export const getUserDetailRequest = () => ({
  type: GET_USER_DETAIL_REQUEST,
});

export const getUserDetailSuccess = (data) => ({
  type: GET_USER_DETAIL_SUCCESS,
  data,
});

export const getUserDetailFailed = (error) => ({
  type: GET_USER_DETAIL_FAILED,
  error,
});

// PATCH Update Profile
export const patchUpdateProfileRequest = (data) => ({
  type: PATCH_UPDATE_PROFILE_REQUEST,
  data,
});

export const patchUpdateProfileSuccess = () => ({
  type: PATCH_UPDATE_PROFILE_SUCCESS,
});

export const patchUpdateProfileFailed = () => ({
  type: PATCH_UPDATE_PROFILE_FAILED,
});
