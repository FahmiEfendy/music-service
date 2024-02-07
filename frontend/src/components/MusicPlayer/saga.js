import { put, call, takeLatest } from 'redux-saga/effects';

import { getSongDetail } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { GET_SONG_DETAIL_REQUEST } from './constants';
import { getSongDetailSuccess, getSongDetailFailed } from './actions';

function* doGetSongDetail(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(getSongDetail, action.payload);

    yield put(getSongDetailSuccess(response.data));
  } catch (err) {
    yield put(getSongDetailFailed(err.message));
  }

  yield put(setLoading(false));
}

export default function* songSaga() {
  yield takeLatest(GET_SONG_DETAIL_REQUEST, doGetSongDetail);
}
