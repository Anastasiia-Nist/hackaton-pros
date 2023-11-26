import { StateType } from './store';

export const registerPopupSelector = (state: StateType) => {
  return state.popups.isRegisterPopupOpen;
};
