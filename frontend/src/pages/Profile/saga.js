import { put, call, takeLatest } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { getUserDetail, patchUpdateProfile } from '@domain/api';
import { GET_USER_DETAIL_REQUEST, PATCH_UPDATE_PROFILE_REQUEST } from './constans';
import {
  getUserDetailFailed,
  getUserDetailSuccess,
  patchUpdateProfileFailed,
  patchUpdateProfileSuccess,
} from './actions';

function* doGetUserDetail() {
  yield put(setLoading(true));

  try {
    const response = yield call(getUserDetail);

    yield put(getUserDetailSuccess(response.data));
  } catch (err) {
    yield put(getUserDetailFailed(err.message));
  }

  yield put(setLoading(false));
}

function* doPatchUpdateProfile(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(patchUpdateProfile, action.data);
    action.callback && action.callback();

    yield put(patchUpdateProfileSuccess(response.data));
  } catch (err) {
    yield put(patchUpdateProfileFailed(err.message));
  }

  yield put(setLoading(false));
}

export default function* profileSaga() {
  yield takeLatest(GET_USER_DETAIL_REQUEST, doGetUserDetail);
  yield takeLatest(PATCH_UPDATE_PROFILE_REQUEST, doPatchUpdateProfile);
}
