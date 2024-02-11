import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectHomeState = (state) => state.home || initialState;

export const selectUserList = createSelector(selectHomeState, (state) => state.userList);
export const selectPlaylistList = createSelector(selectHomeState, (state) => state.playlistList);
export const selectSongList = createSelector(selectHomeState, (state) => state.songList);
export const selectAddPlaylistSong = createSelector(selectHomeState, (state) => state.addPlaylistSong);
