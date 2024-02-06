import { takeLatest, call, put } from 'redux-saga/effects';

import { postRegister } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { POST_REGISTER_REQUEST } from './constants';
import { postRegisterFailed, postRegisterSuccess } from './actions';

function* doPostRegister(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(postRegister, action.payload);

    yield put(postRegisterSuccess(response.data));
  } catch (err) {
    yield put(postRegisterFailed(err.message));
  }
  yield put(setLoading(false));
}

export default function* registerSaga() {
  yield takeLatest(POST_REGISTER_REQUEST, doPostRegister);
}
