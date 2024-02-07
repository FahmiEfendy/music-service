import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectSongState = (state) => state.song || initialState;

export const selectSongDetail = createSelector(selectSongState, (state) => state.songDetail);
