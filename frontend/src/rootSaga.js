import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';

import registerSaga from '@pages/Register/saga';
import loginSaga from '@pages/Login/saga';
import homeSaga from '@pages/Home/saga';
import profileSaga from '@pages/Profile/saga';
import createPlaylistSaga from '@pages/CreatePlaylist/saga';
import playlistDetailSaga from '@pages/PlaylistDetail/saga';
import songSaga from '@components/MusicPlayer/saga';
import songListSaga from '@pages/SongList/saga';
import createSongSaga from '@pages/CreateSong/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    registerSaga(),
    loginSaga(),
    homeSaga(),
    profileSaga(),
    createPlaylistSaga(),
    playlistDetailSaga(),
    songSaga(),
    songListSaga(),
    createSongSaga(),
  ]);
}
