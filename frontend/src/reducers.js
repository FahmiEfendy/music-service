import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import registerReducer, { storedKey as storedRegisterState } from '@pages/Register/reducer';
import loginReducer, { storedKey as storedLoginState } from '@pages/Login/reducer';
import homeReducer, { storedKey as storedHomeState } from '@pages/Home/reducer';
import profileReducer, { storedKey as storedProfileState } from '@pages/Profile/reducer';
import songReducer, { storedKey as storedSongState } from '@components/MusicPlayer/reducer';

import languageReducer from '@containers/Language/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },

  register: { reducer: registerReducer, whitelist: storedRegisterState },
  login: { reducer: loginReducer, whitelist: storedLoginState },
  home: { reducer: homeReducer, whitelist: storedHomeState },
  profile: { reducer: profileReducer, whitelist: storedProfileState },

  song: { reducer: songReducer, whitelist: storedSongState },
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
