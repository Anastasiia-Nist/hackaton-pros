import { StateType } from 'store/store';

export const currentSessionSelector = (state: StateType) =>
  state.currentSession;
