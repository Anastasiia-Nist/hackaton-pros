import { StateType } from '../store';

export const registerPopupSelector = (state: StateType) => {
  return state.popups.isRegisterPopupOpen;
};

export const loginPopupSelector = (state: StateType) => {
  return state.popups.isLoginPopupOpen;
};

export const filterPopupSelector = (state: StateType) => {
  return state.popups.isFilterOpened;
};
