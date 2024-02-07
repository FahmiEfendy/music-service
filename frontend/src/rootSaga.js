import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';

import registerSaga from '@pages/Register/saga';
import loginSaga from '@pages/Login/saga';
import profileSaga from '@pages/Profile/saga';
import homeSaga from '@pages/Home/saga';
import songSaga from '@components/MusicPlayer/saga';

export default function* rootSaga() {
  yield all([appSaga(), registerSaga(), loginSaga(), homeSaga(), profileSaga(), songSaga()]);
}
