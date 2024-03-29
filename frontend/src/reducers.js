import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import registerReducer, { storedKey as storedRegisterState } from '@pages/Register/reducer';
import loginReducer, { storedKey as storedLoginState } from '@pages/Login/reducer';
import homeReducer, { storedKey as storedHomeState } from '@pages/Home/reducer';
import profileReducer, { storedKey as storedProfileState } from '@pages/Profile/reducer';
import createPlaylistReducer, { storedKey as storedCreatePlaylistState } from '@pages/CreatePlaylist/reducer';
import playlistDetailReducer, { storedKey as storedPlaylistDetailState } from '@pages/PlaylistDetail/reducer';
import songReducer, { storedKey as storedSongState } from '@components/MusicPlayer/reducer';
import songListReducer, { storedKey as storedSongListState } from '@pages/SongList/reducer';
import createSongReducer, { storedKey as storedCreateSongState } from '@pages/CreateSong/reducer';

import languageReducer from '@containers/Language/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },

  register: { reducer: registerReducer, whitelist: storedRegisterState },
  login: { reducer: loginReducer, whitelist: storedLoginState },
  home: { reducer: homeReducer, whitelist: storedHomeState },
  profile: { reducer: profileReducer, whitelist: storedProfileState },

  createPlaylist: { reducer: createPlaylistReducer, whitelist: storedCreatePlaylistState },
  playlistDetail: { reducer: playlistDetailReducer, whitelist: storedPlaylistDetailState },

  song: { reducer: songReducer, whitelist: storedSongState },
  songList: { reducer: songListReducer, whitelist: storedSongListState },
  createSong: { reducer: createSongReducer, whitelist: storedCreateSongState },
};

const temporaryReducers = {
  language: languageReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
