import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoginState = (state) => state.login || initialState;

export const selectLogin = createSelector(selectLoginState, (state) => state.login);
