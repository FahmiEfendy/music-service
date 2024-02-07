import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectProfileState = (state) => state.profile || initialState;

export const selectUserDetail = createSelector(selectProfileState, (state) => state.userDetail);
