import { createSlice } from '@reduxjs/toolkit';

export type PopupsState = Record<string, boolean>;

const initialState: PopupsState = {
  isRegisterPopupOpen: false,
  isLoginPopupOpen: false,
};

const popupsSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    closeAllPopups(state: PopupsState) {
      for (const key in state) {
        state[key] = false;
      }
    },
    openRegisterPopup(state: PopupsState) {
      state.isRegisterPopupOpen = true;
    },
    openLoginPopup(state: PopupsState) {
      state.isLoginPopupOpen = true;
    },
  },
});

export const { closeAllPopups, openRegisterPopup, openLoginPopup } =
  popupsSlice.actions;

export default popupsSlice.reducer;
