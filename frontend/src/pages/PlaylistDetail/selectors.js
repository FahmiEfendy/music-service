import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectPlaylistDetailState = (state) => state.playlistDetail || initialState;

export const selectPlaylistDetail = createSelector(selectPlaylistDetailState, (state) => state.playlistDetail);
