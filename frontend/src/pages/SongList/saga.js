import { call, put, takeLatest } from 'redux-saga/effects';

import { deleteSong } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { DELETE_SONG_REQUEST } from './constants';
import { deleteSongFailed, deleteSongSuccess } from './actions';

function* doDeleteSong(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(deleteSong, action.payload);
    action.callback && action.callback();

    yield put(deleteSongSuccess(response.data));
  } catch (err) {
    yield put(deleteSongFailed(err.message));
  }

  yield put(setLoading(false));
}

export default function* songListSaga() {
  yield takeLatest(DELETE_SONG_REQUEST, doDeleteSong);
}
