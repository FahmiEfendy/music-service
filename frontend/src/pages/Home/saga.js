import { put, call, takeLatest } from 'redux-saga/effects';

import { getUserList } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { GET_USER_LIST_REQUEST } from './constants';
import { getUserListFailed, getUserListSuccess } from './actions';

function* doGetUserList(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(getUserList, action.payload);

    yield put(getUserListSuccess(response.data));
  } catch (err) {
    yield put(getUserListFailed(err.message));
  }

  yield put(setLoading(false));
}

export default function* homeSaga() {
  yield takeLatest(GET_USER_LIST_REQUEST, doGetUserList);
}
