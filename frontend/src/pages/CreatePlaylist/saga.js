import { put, call, takeLatest } from 'redux-saga/effects';

import { postCreatePlaylist } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { POST_CREATE_PLAYLIST_REQUEST } from './constants';
import { postCreatePlaylistSuccess, postCreatePlaylistFailed } from './actions';

function* doPostCreatePlaylist(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(postCreatePlaylist, action.payload);
    action.callback && action.callback();

    yield put(postCreatePlaylistSuccess(response.data));
  } catch (err) {
    yield put(postCreatePlaylistFailed(err.message));
  }

  yield put(setLoading(false));
}

export default function* createPlaylistSaga() {
  yield takeLatest(POST_CREATE_PLAYLIST_REQUEST, doPostCreatePlaylist);
}
