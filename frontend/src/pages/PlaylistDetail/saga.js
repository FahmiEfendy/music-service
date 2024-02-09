import { put, call, takeLatest } from 'redux-saga/effects';

import { getPlaylistDetail } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { GET_PLAYLIST_DETAIL_REQUEST } from './constants';
import { getPlaylistDetailSuccess, getPlaylistDetailFailed } from './actions';

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

export default function* playlistDetailSaga() {
  yield takeLatest(GET_PLAYLIST_DETAIL_REQUEST, doGetPlaylistDetail);
}
