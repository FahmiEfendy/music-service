import { put, call, takeLatest } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { deletePlaylistSong, getPlaylistDetail } from '@domain/api';
import { DELETE_PLAYLIST_SONG_REQUEST, GET_PLAYLIST_DETAIL_REQUEST } from './constants';
import {
  getPlaylistDetailSuccess,
  getPlaylistDetailFailed,
  deletePlaylistSongFailed,
  deletePlaylistSongSuccess,
} from './actions';

function* doGetPlaylistDetail(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(getPlaylistDetail, action.payload);

    yield put(getPlaylistDetailSuccess(response.data));
  } catch (err) {
    yield put(getPlaylistDetailFailed(err.message));
  }

  yield put(setLoading(false));
}

function* doDeletePlaylistSong(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(deletePlaylistSong, action.payload);
    action.callback && action.callback();

    yield put(deletePlaylistSongSuccess(response.data));
  } catch (err) {
    yield put(deletePlaylistSongFailed(err.message));
  }

  yield put(setLoading(false));
}

export default function* playlistDetailSaga() {
  yield takeLatest(GET_PLAYLIST_DETAIL_REQUEST, doGetPlaylistDetail);
  yield takeLatest(DELETE_PLAYLIST_SONG_REQUEST, doDeletePlaylistSong);
}
