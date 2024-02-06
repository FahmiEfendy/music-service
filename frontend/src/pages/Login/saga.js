import { put, call, takeLatest } from 'redux-saga/effects';

import { postLogin } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { POST_LOGIN_REQUEST } from './constants';
import { postLoginSuccess, postLoginFailed } from './actions';

function* doPostLogin(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(postLogin, action.payload);

    yield put(postLoginSuccess(response.data));
  } catch (err) {
    yield put(postLoginFailed(err.message));
  }

  yield put(setLoading(false));
}

export default function* loginSaga() {
  yield takeLatest(POST_LOGIN_REQUEST, doPostLogin);
}
