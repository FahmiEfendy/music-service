import { put, call, takeLatest } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { getSongList, getUserList, getplaylistList } from '@domain/api';
import { GET_PLAYLIST_LIST_REQUEST, GET_SONG_LIST_REQUEST, GET_USER_LIST_REQUEST } from './constants';
import {
  getPlaylistListRequest,
  getPlaylistListSuccess,
  getSongListFailed,
  getSongListSuccess,
  getUserListFailed,
  getUserListSuccess,
} from './actions';

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

function* doGetPlaylistList(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(getplaylistList, action.payload);

    yield put(getPlaylistListSuccess(response.data));
  } catch (err) {
    yield put(getPlaylistListRequest(err.message));
  }

  yield put(setLoading(false));
}

function* doGetSongList(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(getSongList, action.payload);

    yield put(getSongListSuccess(response.data));
  } catch (err) {
    yield put(getSongListFailed(err.message));
  }

  yield put(setLoading(false));
}

export default function* homeSaga() {
  yield takeLatest(GET_USER_LIST_REQUEST, doGetUserList);
  yield takeLatest(GET_PLAYLIST_LIST_REQUEST, doGetPlaylistList);
  yield takeLatest(GET_SONG_LIST_REQUEST, doGetSongList);
}
