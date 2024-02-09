import { put, call, takeLatest } from 'redux-saga/effects';

import { postCreateSong } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { POST_CREATE_SONG_REQUEST } from './constants';
import { postCreateSongFailed, postCreateSongSuccess } from './action';

function* doPostCreateSong(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(postCreateSong, action.payload);
    action.callback && action.callback();

    yield put(postCreateSongSuccess(response.data));
  } catch (err) {
    yield put(postCreateSongFailed(err.message));
  }

  yield put(setLoading(false));
}

export default function* createSongSaga() {
  yield takeLatest(POST_CREATE_SONG_REQUEST, doPostCreateSong);
}
