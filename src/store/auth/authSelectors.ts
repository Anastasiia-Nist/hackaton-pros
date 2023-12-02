import { StateType } from 'store/store';

export const userSelector = (state: StateType) => state.auth.user;
export const tokenSelector = (state: StateType) => state.auth.token;
